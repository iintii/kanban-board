"use client";
import { useParams } from "next/navigation";
import AuthWrapper from "@/components/AuthWrapper";
import { HomePage } from "@/app/page";

export default function BoardPage() {
  const params = useParams();
  const boardId = params.boardId as string;

  return (
    <AuthWrapper>
      <HomePage boardId={boardId} />
    </AuthWrapper>
  );
}
