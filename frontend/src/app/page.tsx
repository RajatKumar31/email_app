"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Sidebar from "../components/Sidebar";
import EmailForm from "../components/EmailForm";
import EmailList from "../components/EmailList";
import { fetchEmails } from "../services/fetchEmails";

export interface Email {
  id: string;
  to: string;
  subject: string;
  body: string;
  sentAt: string;
  scheduledAt: string;
  status: string;
}

export default function HomePage() {
  const [showComposer, setShowComposer] = useState(false);
  const [page, setPage] = useState(1);
  const limit = 4;

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["emails", page],
    queryFn: () => fetchEmails(page, limit),
  });

  const emails = data?.data || [];
  const totalEmails = data?.totalItems || 0;

  return (
    <main className="flex h-screen">
      <Sidebar onComposeAction={() => setShowComposer(true)} />
      <div className="flex-1 overflow-y-auto bg-gray-50">
        <EmailList
          emails={emails}
          loading={isLoading}
          error={error ? error.message : null}
          totalEmails={totalEmails}
          page={page}
          setPageAction={setPage}
          fetchEmailsAction={refetch}
        />
      </div>
      {showComposer && (
        <div className="fixed bottom-4 right-4 shadow-xl z-50">
          <EmailForm onClose={() => setShowComposer(false)} page={page} />
        </div>
      )}
    </main>
  );
}
