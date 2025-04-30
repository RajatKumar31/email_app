"use client";

import { useEffect, useState, useCallback } from "react";
import axios, { AxiosError } from "axios";
import { RefreshCcw, Loader } from "lucide-react";

interface Email {
  id: string;
  to: string;
  subject: string;
  body: string;
  sentAt: string;
}

export default function SentEmailList() {
  const [emails, setEmails] = useState<Email[]>([]);
  const [loading, setLoading] = useState(false);
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

  const start = (page - 1) * limit + 1;
  const end = Math.min(page * limit, totalEmails);

  return (
    <div className="space-y-4 max-w-4xl mx-auto mt-8">
      <div>
        <div className="flex items-center">
          <h2 className="text-xl font-semibold">Sent Emails</h2>
          <button
            onClick={fetchEmails}
            className="flex items-center gap-1 text-sm text-gray-600 px-3 py-1 rounded cursor-pointer"
          >
            <span>
              <RefreshCcw />
            </span>
          </button>
        </div>
        {/* Pagination */}
        <div className="flex justify-end mb-4">
          <div className="flex items-center gap-4">
            <button
              disabled={page === 1}
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50 text-sm cursor-pointer"
            >
              Previous
            </button>
            <p className="text-sm text-gray-600">
              {start}–{end} of {totalEmails}
            </p>
            <button
              disabled={end >= totalEmails}
              onClick={() => setPage((prev) => prev + 1)}
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50 text-sm cursor-pointer"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Loading Spinner */}
      {loading && (
        <div className="flex justify-center items-center py-10">
          <Loader className="w-6 h-6 animate-spin text-gray-500" />
        </div>
      )}
      {/* Error Message */}
      {!loading && error && <p className="text-red-600">{error}</p>}
      {!loading && !error && (
        <div className="space-y-4">
          {emails.map((email) => (
            <div key={email.id} className="border p-2 rounded-md shadow-sm">
              <h3 className="font-semibold">{email.subject}</h3>
              <p className="text-sm text-gray-500">To: {email.to}</p>
              <p className="mt-1 text-ellipsis overflow-hidden whitespace-normal">
                {email.body}
              </p>
              <p className="text-xs text-gray-400">
                Sent At: {new Date(email.sentAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
