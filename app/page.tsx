"use client";
import React, { useState, useEffect } from "react";
import Column from "@/components/Column";
import { Card as CardType } from "@/types/Card";
import { useMutation, useSubscription } from "@apollo/client";
import {
  SUBSCRIBE_COLUMNS_BY_BOARD,
  SUBSCRIBE_CARDS_BY_BOARD,
  SUBSCRIBE_BOARD, // Add this import
  INSERT_CARD,
  DELETE_CARD,
  UPDATE_CARD,
} from "@/lib/queries";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { useRouter } from "next/navigation";

interface HomePageProps {
  boardId?: string;
}

const HomePage = ({ boardId }: HomePageProps) => {
  // Add board subscription to get the board title
  const { data: boardData } = useSubscription(SUBSCRIBE_BOARD, {
    variables: { boardId },
    skip: !boardId,
  });

  const { data: columnsData, loading: columnsLoading } = useSubscription(
    SUBSCRIBE_COLUMNS_BY_BOARD,
    { variables: { boardId } }
  );

  const { data: cardsData, loading: cardsLoading } = useSubscription(
    SUBSCRIBE_CARDS_BY_BOARD,
    { variables: { boardId } }
  );

  const [localCards, setLocalCards] = useState<CardType[]>([]);

  useEffect(() => {
    if (cardsData?.cards) {
      setLocalCards(cardsData.cards);
    }
  }, [cardsData]);

  const [insertCard] = useMutation(INSERT_CARD);
  const [deleteCard] = useMutation(DELETE_CARD);
  const [updateCard] = useMutation(UPDATE_CARD);

  if (columnsLoading || cardsLoading) {
    return <div className="p-6">Loading...</div>;
  }

  const columns = columnsData?.columns || [];

  // Get board title from subscription
  const boardTitle = boardData?.boards_by_pk?.title || "Board";

  const handleAddCard = async (newCard: CardType) => {
    // Calculate position for new card (add to end of column with gap)
    const cardsInColumn = localCards.filter(
      (card) => card.columnId === newCard.columnId
    );
    const maxPosition =
      cardsInColumn.length > 0
        ? Math.max(...cardsInColumn.map((c) => c.position))
        : 0;
    const position = maxPosition + 10.0;

    const cardWithPosition = { ...newCard, position };
    setLocalCards((prev) => [...prev, cardWithPosition]);

    await insertCard({
      variables: {
        id: newCard.id,
        title: newCard.title,
        description: newCard.description,
        column_id: newCard.columnId,
        board_id: boardId,
        position: position,
      },
    });
  };

  const handleDeleteCard = async (cardIdToDelete: string) => {
    setLocalCards((prev) => prev.filter((c) => c.id !== cardIdToDelete));
    await deleteCard({ variables: { id: cardIdToDelete } });
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, draggableId } = result;
    if (!destination) return;

    setLocalCards((prev) => {
      const card = prev.find((c) => c.id === draggableId);
      if (!card) return prev;

      const destCards = prev
        .filter(
          (c) => c.columnId === destination.droppableId && c.id !== draggableId
        )
        .sort((a, b) => a.position - b.position);

      // Find neighbors
      const before = destCards[destination.index - 1];
      const after = destCards[destination.index];

      let newPos;
      if (!before && !after) {
        newPos = 10.0; // only card in column
      } else if (!before) {
        newPos = after.position / 2;
      } else if (!after) {
        newPos = before.position + 10.0;
      } else {
        newPos = (before.position + after.position) / 2;
      }

      const updatedCard = {
        ...card,
        columnId: destination.droppableId,
        position: newPos,
      };

      // Persist only dragged card - THIS SAVES TO DATABASE
      updateCard({
        variables: {
          id: updatedCard.id,
          column_id: updatedCard.columnId,
          position: updatedCard.position,
        },
      });

      return prev.map((c) => (c.id === card.id ? updatedCard : c));
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="p-6">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold tracking-tight">
            {boardTitle} {/* Use dynamic board title */}
          </h1>
          <div className="text-sm text-neutral-500">Simple, clean Kanban</div>
        </header>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {columns.map((col: { id: string; title: string }) => (
            <Column
              key={col.id}
              column={col}
              onAddCard={handleAddCard}
              onDeleteCard={handleDeleteCard}
              cards={localCards}
            />
          ))}
        </div>
      </div>
    </DragDropContext>
  );
};

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    router.push("/boards");
  }, [router]);

  return (
    <div className="p-6">
      <div>Redirecting to boards...</div>
    </div>
  );
}

export { HomePage };
