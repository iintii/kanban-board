"use client";
import { useSubscription } from "@apollo/client";
import { useRouter, useParams } from "next/navigation";
import { SUBSCRIBE_BOARDS } from "@/lib/queries";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuthenticationStatus } from "@nhost/nextjs";

export default function BoardSelector() {
  const { isAuthenticated } = useAuthenticationStatus();
  const router = useRouter();
  const params = useParams();
  const currentBoardId = params?.boardId as string;

  const { data, loading } = useSubscription(SUBSCRIBE_BOARDS, {
    skip: !isAuthenticated, // Only fetch when user is logged in
  });

  const boards = data?.boards || [];

  // Don't render if not authenticated or still loading
  if (!isAuthenticated || loading) return null;

  const handleBoardChange = (boardId: string) => {
    if (boardId === "boards-list") {
      router.push("/boards");
    } else {
      router.push(`/boards/${boardId}`);
    }
  };

  return (
    <Select
      value={currentBoardId || "boards-list"}
      onValueChange={handleBoardChange}
    >
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Select a board" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="boards-list">📋 All Boards</SelectItem>
        {boards.map((board: any) => (
          <SelectItem key={board.id} value={board.id}>
            {board.title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
