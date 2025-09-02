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
import { Droppable, Draggable } from "@hello-pangea/dnd";

const getColumnBgColor = (columnTitle: string) => {
  switch (columnTitle.toLowerCase()) {
    case "stuck":
      return "bg-red-100 border-red-300";
    case "not started":
      return "bg-gray-100 border-gray-300";
    case "working on it":
      return "bg-yellow-100 border-yellow-300";
    case "done":
      return "bg-green-100 border-green-300";
    case "test":
      return "bg-blue-100 border-blue-300";
    default:
      return "bg-white border-border";
  }
};

type ColumnProps = {
  column: ColumnType;
  cards: CardType[];
  onAddCard: (newCard: CardType) => void;
  onDeleteCard: (cardIdToDelete: string) => void;
};

const Column = ({ column, cards, onAddCard, onDeleteCard }: ColumnProps) => {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const cardsInCol = cards.filter((card) => card.columnId === column.id);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setShowForm(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAddCard({
      id: Date.now().toString(),
      title: title.trim(),
      description: description.trim(),
      columnId: column.id,
    });
    resetForm();
  };

  return (
    <ShadCard
      className={`w-80 min-h-[24rem] flex flex-col ${getColumnBgColor(
        column.title
      )}`}
    >
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-semibold uppercase tracking-wide text-gray-800">
          {column.title}
        </CardTitle>
        <span className="text-xs text-gray-600">{cardsInCol.length}</span>
      </CardHeader>

      <Droppable droppableId={column.id}>
        {(provided) => (
          <CardContent
            className="space-y-3 flex-1"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {cardsInCol.map((card, index) => (
              <Draggable key={card.id} draggableId={card.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <Card card={card} onDeleteCard={onDeleteCard} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </CardContent>
        )}
      </Droppable>

      <div className="p-3 border-t">
        {!showForm ? (
          <Button
            type="button"
            size="sm"
            variant="ghost"
            className="w-full justify-start text-muted-foreground hover:text-foreground"
            onClick={() => setShowForm(true)}
          >
            + Add Card
          </Button>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-2">
            <Input
              placeholder="Card title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
              className="text-black"
            />
            <Textarea
              placeholder="Description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="text-black"
            />
            <div className="flex items-center gap-2">
              <Button type="submit" size="sm">
                Add
              </Button>
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={resetForm}
              >
                Cancel
              </Button>
            </div>
          </form>
        )}
      </div>
    </ShadCard>
  );
};

export default Column;
