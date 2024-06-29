"use client";

import { HTMLContent } from "@/types/types";

export default function DangerouslyHTML({ content }: { content: any }) {
  return (
    <div
      className="text-base line-clamp-2 leading-relaxed text-gray-700 overflow-hidden w-full"
      dangerouslySetInnerHTML={{ __html: content } as HTMLContent}
    />
  );
}
