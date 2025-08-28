"use client";
import {
  Card as ShadCard,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Column as ColumnType, Card as CardType } from "@/types/Card";
import Card from "./Card";
import React, { useState } from "react";

//------Type Definition------
type ColumnProps = {
  column: ColumnType;
  cards: CardType[];
  onAddCard: (newCard: CardType) => void;
  onDeleteCard: (cardIdToDelete: string) => void;
};

//------Main------
const Column = ({ column, cards, onAddCard, onDeleteCard }: ColumnProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  //......Filter cards belonging to this column......
  const cardsInCol = cards.filter((card) => card.columnId === column.id);

  //......Handle form submit......
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) return; // prevent empty

    const newCard: CardType = {
      id: Date.now().toString(),
      title: title.trim(),
      description: description.trim(),
      columnId: column.id,
    };

    onAddCard(newCard);
    setTitle("");
    setDescription("");
  };

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
          <Card key={card.id} card={card} onDeleteCard={onDeleteCard} />
        ))}
      </CardContent>

      {/* Add Form */}
      <form onSubmit={handleSubmit} className="p-3 border-t space-y-2">
        <Input
          placeholder="Card title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <Button type="submit" size="sm" variant="outline" className="w-full">
          + Add Card
        </Button>
      </form>
    </ShadCard>
  );
};

export default Column;
