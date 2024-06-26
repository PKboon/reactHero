import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Hero } from "../types/hero";
import { useParams } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL;

export default function HeroDetail() {
  const fetched = useRef(false);
  const params = useParams();
  const [hero, setHero] = useState<Hero | null>(null);

  useEffect(() => {
    if (!fetched.current) {
      fetch(`${apiUrl}/heroes/${params.id}`)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setHero(data);
        });
      fetched.current = true;
    }
  }, [params.id]);

  if (!hero) return null;

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setHero({ ...hero, name: event.target.value });
  };

  return (
    <>
      <h2 className="text-2xl">Details</h2>
      <div>
        <span className="font-bold">ID: </span> {hero.id}
      </div>
      <div className="space-x-2">
        <span className="font-bold">Name: </span>
        <span className="uppercase">{hero.name}</span>
      </div>
      <div className="flex flex-col gap-2 mt-3 border-t">
        <label>Hero name</label>
        <input
          type="text"
          placeholder="name"
          className="border border-gray-300 rounded-lg p-2 w-1/4"
          value={hero.name}
          onChange={handleNameChange}
        />
      </div>
    </>
  );
}
