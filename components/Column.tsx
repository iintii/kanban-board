"use client";

import {
  Card as ShadCard,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Column as ColumnType, Card as CardType } from "@/types/Card";
import Card from "./Card";

type ColumnProps = {
  column: ColumnType;
  cards: CardType[];
  onAddCard: (newCard: CardType) => void;
};

const Column = ({ column, cards, onAddCard }: ColumnProps) => {
  const cardsInCol = cards.filter((card) => card.columnId === column.id);

  return (
    <ShadCard className="w-80 min-h-[24rem] flex flex-col">
      {/* Column header */}
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-semibold uppercase tracking-wide">
          {column.title}
        </CardTitle>
        <span className="text-xs text-muted-foreground">
          {cardsInCol.length}
        </span>
      </CardHeader>

      {/* Card list */}
      <CardContent className="space-y-3 flex-1">
        {cardsInCol.map((card) => (
          <Card key={card.id} card={card} />
        ))}
      </CardContent>

      {/* Action button */}
      <div className="p-3 border-t">
        <Button
          size="sm"
          variant="outline"
          className="w-full"
          onClick={() =>
            onAddCard({
              id: Date.now().toString(),
              title: "New Task",
              columnId: column.id,
              description: "New Desc",
            })
          }
        >
          + Add Card
        </Button>
      </div>
    </ShadCard>
  );
};

export default Column;
