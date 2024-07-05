import { useEffect, useRef, useState } from "react";
import { Hero } from "../types/hero";
import { Link } from "react-router-dom";
import { useMessages } from "../context/MessageContext";

const apiUrl = import.meta.env.VITE_API_URL;

export default function HeroesList() {
  // so that it doesn't fetch twice with the strict mode
  const fetched = useRef(false);

  const [heroes, setHeroes] = useState<Hero[]>([]);
  const { addMessage } = useMessages();

  useEffect(() => {
    if (!fetched.current) {
      fetch(`${apiUrl}/heroes`)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setHeroes(data);
          addMessage("Heroes loaded");
        });
      fetched.current = true;
    }
  }, [addMessage]); // execute once

  const deleteHero = async (hero: Hero) => {
    try {
      const res = await fetch(`${apiUrl}/heroes/${hero.id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error(`Request failed: ${res.statusText}`);

      setHeroes((prevHeroes) => prevHeroes.filter((h) => h.id !== hero.id));
      addMessage(`Hero ${hero.name} deleted`);
    } catch (err) {
      console.log(err);
      addMessage("Failed to delete hero");
    }
  };

  return (
    <>
      <div className="flex gap-3">
        <h2 className="text-2xl">My heroes</h2>
        <Link to="/heroes/create" className="btn">
          Create new
        </Link>
      </div>
      <ul className="flex flex-col gap-2 my-3">
        {heroes.map((hero) => (
          <Link
            to={`/heroes/${hero.id}`}
            key={hero.id}
            className="flex cursor-pointer"
          >
            <span className="bg-slate-700 text-white rounded-l p-2">
              {hero.id}
            </span>
            <div className="p-2 bg-slate-300 rounded-r w-full flex justify-between">
              <span>{hero.name}</span>
              <span
                className="bg-white px-1 curesor-pointer rounded"
                onClick={(e) => {
                  e.preventDefault();
                  deleteHero(hero);
                }}
              >
                X
              </span>
            </div>
          </Link>
        ))}
      </ul>
    </>
  );
}
