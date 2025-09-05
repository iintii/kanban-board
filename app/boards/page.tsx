"use client";
import { useSubscription, useMutation } from "@apollo/client";
import {
  SUBSCRIBE_BOARDS,
  INSERT_BOARD,
  INSERT_COLUMN,
  DELETE_BOARD,
} from "@/lib/queries";
import Link from "next/link";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AuthWrapper from "@/components/AuthWrapper";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { Board } from "@/types/Card";

const BoardsPage = () => {
  const { data, loading, error } = useSubscription(SUBSCRIBE_BOARDS);
  const [insertBoard] = useMutation(INSERT_BOARD);
  const [insertColumn] = useMutation(INSERT_COLUMN);
  const [deleteBoard] = useMutation(DELETE_BOARD);
  const router = useRouter();
  const boards = data?.boards || [];

  const createBoard = async () => {
    const title = prompt("Board name:");
    if (!title) return;

    const newBoardId = `board-${Date.now()}`;

    try {
      await insertBoard({
        variables: { id: newBoardId, title: title.trim() },
      });

      const defaultColumns = [
        { title: "Stuck", position: 0 },
        { title: "Not Started", position: 1 },
        { title: "Working On It", position: 2 },
        { title: "Done", position: 3 },
        { title: "Test", position: 4 },
      ];

      for (const col of defaultColumns) {
        const colId = `col-${col.title
          .toLowerCase()
          .replace(/\s+/g, "-")}-${Date.now()}`;
        await insertColumn({
          variables: {
            id: colId,
            title: col.title,
            position: col.position,
            board_id: newBoardId,
          },
        });
      }

      router.push(`/boards/${newBoardId}`);
    } catch (error: unknown) {
      console.error("Error creating board:", error);
    }
  };

  const handleDeleteBoard = async (
    boardId: string,
    boardTitle: string,
    e: React.MouseEvent
  ) => {
    e.preventDefault(); // Prevent Link navigation
    e.stopPropagation();

    const confirmDelete = confirm(
      `Are you sure you want to delete "${boardTitle}"? This action cannot be undone.`
    );
    if (!confirmDelete) return;

    try {
      await deleteBoard({
        variables: { id: boardId },
      });
    } catch (error) {
      console.error("Error deleting board:", error);
      alert("Failed to delete board. Please try again.");
    }
  };

  if (loading) return <div className="p-6">Loading boards...</div>;
  if (error) return <div className="p-6">Error loading boards</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Boards</h1>
        <Button onClick={createBoard}>+ Create Board</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {boards.map((board: Board) => (
          <div key={board.id} className="relative group">
            <Link href={`/boards/${board.id}`}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span>{board.title}</span>
                  </CardTitle>
                </CardHeader>
              </Card>
            </Link>
            <Button
              variant="destructive"
              size="sm"
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={(e) => handleDeleteBoard(board.id, board.title, e)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function BoardsPageWithAuth() {
  return (
    <AuthWrapper>
      <BoardsPage />
    </AuthWrapper>
  );
}
