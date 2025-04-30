"use client";

import { useEffect, useState, useCallback } from "react";
import axios, { AxiosError } from "axios";
import Sidebar from "../components/Sidebar";
import EmailForm from "../components/EmailForm";
import EmailList from "../components/EmailList";

export interface Email {
  id: string;
  to: string;
  subject: string;
  body: string;
  sentAt: string;
  status: string;
}

export default function HomePage() {
  const [showComposer, setShowComposer] = useState(false);
  const [emails, setEmails] = useState<Email[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const limit = 4;
  const [totalEmails, setTotalEmails] = useState(0);

  const fetchEmails = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}?page=${page}&limit=${limit}`,
      );
      setEmails(response.data.data);
      setTotalEmails(response.data.totalItems);
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        setError(err?.response?.data?.message || "Failed to fetch sent emails");
      }
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchEmails();
  }, [fetchEmails]);
  return (
    <main className="flex h-screen">
      <Sidebar onComposeAction={() => setShowComposer(true)} />
      <div className="flex-1 overflow-y-auto bg-gray-50">
        <EmailList
          emails={emails}
          loading={loading}
          error={error}
          totalEmails={totalEmails}
          page={page}
          setPageAction={setPage}
          fetchEmailsAction={fetchEmails}
        />
      </div>
      {showComposer && (
        <div className="fixed bottom-4 right-4 shadow-xl z-50">
          <EmailForm
            onClose={() => setShowComposer(false)}
            onEmailSent={fetchEmails}
          />
        </div>
      )}
    </main>
  );
}
