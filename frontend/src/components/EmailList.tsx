"use client";

import { useEffect, useState } from "react";
import axios from "axios";

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

  useEffect(() => {
    const fetchEmails = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}`);
        setEmails(response.data.data);
      } catch (err: any) {
        setError("Failed to fetch sent emails");
      } finally {
        setLoading(false);
      }
    };

    fetchEmails();
  }, []);

  return (
    <div className="space-y-4 max-w-4xl mx-auto mt-8">
      <h2 className="text-xl font-semibold">Sent Emails</h2>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      <div className="space-y-4">
        {emails.map((email) => (
          <div key={email.id} className="border p-4 rounded-md shadow-sm">
            <h3 className="font-semibold">{email.subject}</h3>
            <p className="text-sm text-gray-500">To: {email.to}</p>
            <p className="mt-2">{email.body}</p>
            <p className="text-xs text-gray-400">
              Sent At: {new Date(email.sentAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
