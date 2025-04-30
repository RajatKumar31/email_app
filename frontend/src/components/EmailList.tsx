"use client";

import { RefreshCcw, Loader } from "lucide-react";
import { Email } from "../app/page";

export default function SentEmailList({
  emails,
  loading,
  error,
  totalEmails,
  page,
  setPageAction,
  fetchEmailsAction,
}: {
  emails: Email[];
  loading: boolean;
  error: string | null;
  totalEmails: number;
  page: number;
  setPageAction: React.Dispatch<React.SetStateAction<number>>;
  fetchEmailsAction: () => void;
}) {
  const start = (page - 1) * 4 + 1; // limit is 4
  const end = Math.min(page * 4, totalEmails);

  return (
    <div className="space-y-4 max-w-4xl mx-auto mt-8">
      <div>
        <div className="flex items-center">
          <h2 className="text-xl font-semibold">Sent Emails</h2>
          <button
            onClick={fetchEmailsAction}
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
              onClick={() => setPageAction((prev) => Math.max(prev - 1, 1))}
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50 text-sm cursor-pointer"
            >
              Previous
            </button>
            <p className="text-sm text-gray-600">
              {start}–{end} of {totalEmails}
            </p>
            <button
              disabled={end >= totalEmails}
              onClick={() => setPageAction((prev) => prev + 1)}
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
        <>
          {emails.length === 0 ? (
            <p className="text-center text-gray-500">No emails found.</p>
          ) : (
            <div className="space-y-4">
              {emails.map((email) => (
                <div
                  key={email.id}
                  className="relative border p-2 rounded-md shadow-sm"
                >
                  <div className="absolute top-2 right-2 text-xs text-gray px-2 py-1 rounded-md bg-gray-300">
                    {email.status}
                  </div>
                  <h3 className="font-semibold">{email.subject}</h3>
                  <p className="text-sm text-gray-500">To: {email.to}</p>
                  <p className="mt-1 text-ellipsis overflow-hidden whitespace-normal">
                    {email.body}
                  </p>
                  {email.status === "sent" && email.sentAt && (
                    <p className="text-xs text-gray-400">
                      Sent At: {new Date(email.sentAt).toLocaleString()}
                    </p>
                  )}
                  {email.status === "scheduled" && email.scheduledAt && (
                    <p className="text-xs text-gray-400">
                      Scheduled At:{" "}
                      {new Date(email.scheduledAt).toLocaleString()}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
