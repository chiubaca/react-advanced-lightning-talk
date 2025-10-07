"use client";

import { api, type Message } from "@/api";
import { useActionState } from "react";

async function action(previousState: Message[], formData: FormData) {
  const message = formData.get("message") as string;

  const data = await api.submitMessage(message);

  return [...previousState, data];
}

export default function Page() {
  const [state, formAction, isPending] = useActionState(action, []);

  return (
    <form action={formAction}>
      <input type="text" name="message" placeholder="Hello!" />

      <button type="submit" disabled={isPending}>
        {isPending ? "submitting..." : "submit"}
      </button>

      {state.map((msg) => (
        <div key={msg.id}>{msg.message}</div>
      ))}
    </form>
  );
}
