export type Card = {
  id: string;
  title: string;
  description: string;
  columnId: string; //which column the card belongs to
};

export type Column = {
  id: string;
  title: string;
  //we dont need to define card type [we could use that approach cards:card[]]. each card will be pointing to the appropriate column. This is simpler
};
