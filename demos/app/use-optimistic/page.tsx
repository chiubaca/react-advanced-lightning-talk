"use client";

import { useOptimistic, useState, useRef, startTransition } from "react";
import { api } from "@/api";

type Message = {
  text: string;
  sending: boolean;
  key?: number;
};

export default function Page() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isError, setIsError] = useState(false);

  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    messages,
    (currentMessages: Message[], newMessage: string) => [
      ...currentMessages,
      {
        text: newMessage,
        sending: true,
      },
    ]
  );

  async function formAction(formData: FormData) {
    try {
      const message = formData.get("message") as string;
      addOptimisticMessage(message);
      const submittedMessage = await api.submitMessage(message);
      setMessages([
        ...messages,
        { text: submittedMessage, sending: false, key: Date.now() },
      ]);
    } catch (error) {
      setIsError(true);
    }
  }

  return (
    <div>
      <form className="flex" action={formAction}>
        <input
          className="input"
          type="text"
          name="message"
          placeholder="Add a message"
        />
        <button className="btn" type="submit">
          Send
        </button>
      </form>
      {optimisticMessages.map((message, index) => (
        <div key={index}>
          {message.text}
          {!!message.sending && <small> (Sending...)</small>}
        </div>
      ))}
      {isError && <Toast />}
    </div>
  );
}

const Toast = () => {
  return (
    <div className="toast toast-bottom toast-end">
      <div className="alert alert-error">
        <span>failed to send</span>
      </div>
    </div>
  );
};
