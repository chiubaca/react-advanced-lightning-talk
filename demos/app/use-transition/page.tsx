"use client";
import { useState, useTransition } from "react";

import { api } from "@/api";

export default function Page() {
  const [apiData, setApiData] = useState("");
  const [isPending, startTransition] = useTransition();

  const clickHandler = async () => {
    startTransition(async () => {
      const data = await api.getSlowDataFromApi();
      setApiData(data);
    });
  };

  return (
    <>
      <h1>home page</h1>
      <button onClick={clickHandler}> This will take a while...</button>

      {isPending ? "ispending.." : apiData}
    </>
  );
}
