"use client";
import React, { useState } from "react";
import Column from "@/components/Column";
import { mockCards, mockCols } from "@/public/data";
import { Card as CardType } from "@/types/Card";

const HomePage = () => {
  //cards state holds cards array of type CardType initialized using mockCards
  const [cards, setCards] = useState<CardType[]>(mockCards);

  //Adds new card to state
  const handleAddCard = (newCard: CardType) => {
    setCards([...cards, newCard]); // Add new card to existing cards
  };

  return (
    <div className="p-6">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">MyKanban</h1>
        <div className="text-sm text-neutral-500">Simple, clean Kanban</div>
      </header>

      <div className="flex gap-4 overflow-x-auto pb-2">
        {mockCols.map((col) => (
          <Column
            key={col.id}
            column={col}
            onAddCard={handleAddCard}
            cards={cards}
          /> //each col
        ))}
      </div>
    </div>
  );
};

export default HomePage;
