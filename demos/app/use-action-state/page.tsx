"use client";

import { api, type Message } from "@/api";
import { useActionState } from "react";

async function action(previousState: Message[], formData: FormData) {
  const message = formData.get("message") as string;
  const submittedMessage = await api.submitMessage(message);
  return [...previousState, submittedMessage];
}

export default function Page() {
  const [state, formAction, isPending] = useActionState(action, []);

  return (
    <div>
      <form action={formAction} className="flex ">
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
      {state.map((msg) => (
        <div key={msg.id}>{msg.message}</div>
      ))}
    </div>
  );
}
