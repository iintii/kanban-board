import React from "react";
import { Card as CardType } from "@/types/Card";

type CardProps = {
  card: CardType;
};

const Card = ({ card }: CardProps) => {
  return (
    <div className="bg-white border border-neutral-200 rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow">
      <h3 className="font-medium text-neutral-900">{card.title}</h3>
      <p className="text-sm text-neutral-600 mt-2 leading-relaxed">
        {card.description}
      </p>
    </div>
  );
};

export default Card;
