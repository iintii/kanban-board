import React from "react";
import { Card as CardType } from "@/types/Card";

type CardProps = {
  card: CardType;
  onDeleteCard: (cardId: string) => void;
};

const Card = ({ card, onDeleteCard }: CardProps) => {
  return (
    <div className="bg-card border border-border rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow group relative">
      {/* Delete button - positioned in top right corner */}
      <button
        onClick={() => onDeleteCard(card.id)}
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-100 hover:text-red-600 rounded p-1"
        title="Delete card"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 6h18" />
          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
          <path d="M8 6V4c0-1 1-2 2-2h4c0-1 1-2 2-2v2" />
          <line x1="10" x2="10" y1="11" y2="17" />
          <line x1="14" x2="14" y1="11" y2="17" />
        </svg>
      </button>

      {/* Card content */}
      <h3 className="font-medium text-card-foreground">{card.title}</h3>
      <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
        {card.description}
      </p>
    </div>
  );
};

export default Card;
