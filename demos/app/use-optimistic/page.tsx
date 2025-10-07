"use client";

import { useOptimistic, useActionState } from "react";
import { api, type Message } from "@/api";

async function action(previousState: Message[], formData: FormData) {
  const message = formData.get("message") as string;
  const submittedMessage = await api.submitMessage(message);

  return [...previousState, submittedMessage];
}

export default function Page() {
  const [messages, formAction, isPending] = useActionState(action, []);

  const [optimisticState, addOptimistic] = useOptimistic(
    messages,
    (currentState, optimisticValue: Message) => {
      return [...currentState, optimisticValue];
    }
  );

  function handleSubmit(formData: FormData) {
    const message = formData.get("message") as string;
    addOptimistic({ id: Date().toString(), message, status: "pending" });
    formAction(formData);
  }

  return (
    <div>
      <div className="chat chat-start flex flex-col gap-2 mb-4">
        {optimisticState.map((msg) => (
          <div key={msg.id} className="chat-bubble flex gap-1">
            <div>{msg.message}</div>
            <div>{msg.status === "pending" ? "☑️" : "✅"}</div>
          </div>
        ))}
      </div>
      <form action={handleSubmit} className="flex gap-1">
        <input
          className="input"
          type="text"
          name="message"
          placeholder="Type a message..."
        />

        <button className="btn" type="submit" disabled={isPending}>
          Send
        </button>
      </form>
    </div>
  );
}
