"use client";

import { useEffect, useState } from "react";
import { api } from "@/api";
import { Loader } from "../../components/loader";

export default function Page() {
  return (
    <div>
      <h1 className="text-xl text-center">Best dogs</h1>
      <DogPics />

      <h1 className=" text-xl text-center">Top cats</h1>
      <CatPics />
    </div>
  );
}

function DogPics() {
  const [data, setData] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDogs = async () => {
      try {
        const dogs = await api.getDogsFromApi();
        setData(dogs);
      } catch (error) {
        console.error("Failed to fetch dogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDogs();
  }, []);

  if (loading) {
    return <Loader />;
  }

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
  const [data, setData] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCats = async () => {
      try {
        const cats = await api.getCatsFromApi();
        setData(cats);
      } catch (error) {
        console.error("Failed to fetch cats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCats();
  }, []);

  if (loading) {
    return <Loader />;
  }

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
