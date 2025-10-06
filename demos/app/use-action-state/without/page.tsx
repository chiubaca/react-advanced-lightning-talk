// @ts-nocheck
"use client";

import { useState } from "react";

export default function Page() {
  const [state, setState] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const message = formData.get("message");

    // Update state with new message
    setState((previousState) => [...previousState, message]);

    // Reset form
    event.currentTarget.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="message" placeholder="Hello!" />
      <button type="submit">Send</button>
      {state.map((msg, index) => (
        <div key={index}>{msg}</div>
      ))}
    </form>
  );
}
