"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DateTimePicker } from "@/components/ui/datetimepicker";
import axios, { AxiosError } from "axios";
import { X, Maximize2, Minimize2, ChevronDown } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface EmailFormProps {
  onClose?: () => void;
}

export default function EmailForm({ onClose }: EmailFormProps) {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [scheduledAt, setScheduledAt] = useState<Date | null>(null);
  const [isMaximized, setIsMaximized] = useState(false);
  const [showSchedulePicker, setShowSchedulePicker] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    setError(null);

    const emailData = {
      to,
      subject,
      body,
      scheduledAt: scheduledAt ? scheduledAt.toISOString() : null,
    };

    try {
      if (scheduledAt) {
        // Send email via schedule API
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/schedule`,
          emailData,
        );
        setSuccess("Email scheduled successfully!");
      } else {
        // Send email immediately
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/send`, emailData);
        setSuccess("Email sent successfully!");
      }

      setTo("");
      setSubject("");
      setBody("");
      setScheduledAt(null);
      onClose?.();
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        setError(
          err?.response?.data?.message || "Failed to send or schedule email",
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`${
        isMaximized
          ? "fixed inset-0 z-50"
          : "fixed bottom-4 right-4 w-full max-w-xl"
      } bg-white shadow-xl rounded-md overflow-hidden border border-gray-200`}
    >
      {/* Header Bar */}
      <div className="flex justify-between items-center px-4 py-2 border-b bg-gray-100">
        <h2 className="font-semibold text-lg">New Message</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setIsMaximized(!isMaximized)}
            className="cursor-pointer"
          >
            {isMaximized ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
          </button>
          <button
            onClick={onClose}
            className="hover:text-red-500 cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4 p-4">
        <Input
          placeholder="To (email address)"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          required
          disabled={loading}
        />
        <Input
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
          disabled={loading}
        />
        <Textarea
          placeholder="Body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={6}
          required
          className={`overflow-y-auto resize-none ${
            isMaximized ? "h-80" : "h-40"
          }`}
          disabled={loading}
        />

        {showSchedulePicker && (
          <DateTimePicker value={scheduledAt} onChangeAction={setScheduledAt} />
        )}

        <div className="flex items-center justify-between">
          <div className="flex gap-1">
            <Button type="submit" disabled={loading} className="cursor-pointer">
              {scheduledAt ? "Schedule Email" : "Send Email"}
            </Button>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="cursor-pointer">
                  <ChevronDown size={16} />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-40 p-2">
                <button
                  onClick={() => setShowSchedulePicker((prev) => !prev)}
                  className="w-full text-left hover:bg-gray-100 px-2 py-1 rounded text-sm cursor-pointer"
                >
                  Schedule Send
                </button>
              </PopoverContent>
            </Popover>
          </div>

          <div>
            {success && <p className="text-green-600 text-sm">{success}</p>}
            {error && <p className="text-red-600 text-sm">{error}</p>}
          </div>
        </div>
      </form>
    </div>
  );
}
