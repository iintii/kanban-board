import { Card, Column } from "@/types/Card";

export const mockCols: Column[] = [
  {
    id: "col-1",
    title: "To Do",
  },
  {
    id: "col-2",
    title: "In Progress",
  },
  {
    id: "col-3",
    title: "Done",
  },
];

export const mockCards: Card[] = [
  {
    id: "card-1",
    title: "Fix login bug",
    description: "Users can't login with email",
    columnId: "col-1", // Changed from columnid
  },
  {
    id: "card-2",
    title: "Add dark mode",
    description: "Implement dark/light theme toggle",
    columnId: "col-1", // Changed from columnid
  },
  {
    id: "card-3",
    title: "Write tests",
    description: "Add unit tests for auth module",
    columnId: "col-2", // Changed from columnid
  },
];
