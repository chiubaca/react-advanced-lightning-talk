"use client";

import { api } from "@/api";
import { useActionState } from "react";

async function action(previousState: string[], formData: FormData) {
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

      {state.map((msg, index) => (
        <div key={index}>{msg}</div>
      ))}
    </form>
  );
}
