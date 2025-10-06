"use client";

import { useActionState } from "react";

async function action(previousState: string[], formData: FormData) {
  const message = formData.get("message") as string;

  return [...previousState, message];
}

export default function Page() {
  const [state, formAction] = useActionState(action, []);

  return (
    <div>
      <form action={formAction} className="flex ">
        <input
          className="input"
          type="text"
          name="message"
          placeholder="Hello!"
        />

        <button className="btn" type="submit">
          Send
        </button>
      </form>
      {state.map((msg, index) => (
        <div key={index}>{msg}</div>
      ))}
    </div>
  );
}
