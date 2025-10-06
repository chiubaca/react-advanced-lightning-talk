"use client";

import { api } from "@/api";
import { useState } from "react";

export default function Page() {
  const [state, setState] = useState<string[]>([]);
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsPending(true);

    const formData = new FormData(event.currentTarget);
    const message = formData.get("message") as string;

    try {
      const data = await api.submitMessage(message);
      setState((prev) => [...prev, data]);
      event.currentTarget.reset();
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="message" placeholder="Hello!" />

      <button type="submit" disabled={isPending}>
        {isPending ? "submitting..." : "submit"}
      </button>

      {state.map((msg, index) => (
        <div key={index}>{msg}</div>
      ))}
    </form>
  );
}
