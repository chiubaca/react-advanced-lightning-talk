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
      <form action={handleSubmit} className="flex ">
        <input
          className="input"
          type="text"
          name="message"
          placeholder="Hello!"
        />

        <button className="btn" type="submit" disabled={isPending}>
          {isPending ? "Sending..." : "Send"}
        </button>
      </form>
      {optimisticState.map((msg) => (
        <div key={msg.id}>
          {msg.message}
          {msg.status === "sent" ? "✅" : "☑️"}
        </div>
      ))}
    </div>
  );
}
