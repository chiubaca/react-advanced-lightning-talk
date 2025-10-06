"use client";
import { useState, useTransition } from "react";

import { api } from "@/api";

export default function Page() {
  const [apiData, setApiData] = useState("");
  const [isPending, setIsPending] = useState(false);

  const clickHandler = async () => {
    setIsPending(true);
    const data = await api.getSlowDataFromApi();
    setApiData(data);
    setIsPending(false);
  };

  return (
    <div className="flex flex-col gap-4">
      <button className="btn" onClick={clickHandler}>
        This will take a while...
      </button>

      {isPending ? "loading data...🌀" : apiData}
    </div>
  );
}
