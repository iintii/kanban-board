import React from "react";
import { Column as ColumnType } from "@/types/Card";
import { mockCards } from "@/public/data";
import Card from "./Card";

type ColumnProps = {
  column: ColumnType;
};

const Column = ({ column }: ColumnProps) => {
  //filter cards for this column, match columnids inside cards to ids of cols.
  const cardInCol = mockCards.filter((card) => card.columnId === column.id);
  return (
    <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-4 w-80 min-h-[24rem]">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold tracking-wide text-neutral-700 uppercase">
          {column.title}
        </h2>
        <span className="text-xs text-neutral-500">{cardInCol.length}</span>
      </div>

      <div className="space-y-3">
        {cardInCol.map((card) => (
          <Card key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
};

export default Column;
