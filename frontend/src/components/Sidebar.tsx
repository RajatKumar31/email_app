"use client";
import { Pencil } from "lucide-react";

interface SidebarProps {
  onComposeAction: () => void;
}

export default function Sidebar({ onComposeAction }: SidebarProps) {
  return (
    <aside className="w-54 bg-white border-r h-full p-4 shadow-sm">
      <button
        onClick={onComposeAction}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded w-full flex items-center justify-center gap-2"
      >
        <Pencil size={16} />
        Compose
      </button>
    </aside>
  );
}
