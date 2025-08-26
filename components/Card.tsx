import React from "react";
import { Card as CardType } from "@/types/Card";

type CardProps = {
  card: CardType;
};

const Card = ({ card }: CardProps) => {
  return (
    <div className="bg-card border border-border rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow">
      <h3 className="font-medium text-card-foreground">{card.title}</h3>
      <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
        {card.description}
      </p>
    </div>
  );
};

export default Card;
