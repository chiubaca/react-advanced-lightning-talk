"use client";

import { use, Suspense } from "react";
import { api } from "@/api";
import { Loader } from "../components/loader";

export default function Page() {
  return (
    <div>
      <h1 className="text-xl text-center">Best dogs</h1>

      <Suspense fallback={<Loader />}>
        <DodPics />
      </Suspense>

      <h1 className=" text-xl text-center">Top cats</h1>
      <Suspense fallback={<Loader />}>
        <CatPics />
      </Suspense>
    </div>
  );
}

function DodPics() {
  const data = use(api.getDogsFromApi());

  return (
    <div>
      <div className="flex">
        {data.map((item, index) => (
          <img key={index} src={item} className="w-32 h-32 m-2" />
        ))}
      </div>
    </div>
  );
}

function CatPics() {
  const data = use(api.getCatsFromApi());

  return (
    <div>
      <div className="flex">
        {data.map((item, index) => (
          <img key={index} src={item} className="w-32 h-32 m-2 " />
        ))}
      </div>
    </div>
  );
}
