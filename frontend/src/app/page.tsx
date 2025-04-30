"use client";

import { useState } from "react";
import Sidebar from "../components/Sidebar";
import EmailForm from "../components/EmailForm";
import EmailList from "../components/EmailList";

export default function HomePage() {
  const [showComposer, setShowComposer] = useState(false);

  return (
    <main className="flex h-screen">
      <Sidebar onComposeAction={() => setShowComposer(true)} />
      <div className="flex-1 overflow-y-auto bg-gray-50">
        <EmailList />
      </div>
      {showComposer && (
        <div className="fixed bottom-4 right-4 shadow-xl z-50">
          <EmailForm onClose={() => setShowComposer(false)} />
        </div>
      )}
    </main>
  );
}
