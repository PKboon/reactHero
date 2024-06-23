import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Hero } from "../types/hero";
import HeroDetail from "./HeroDetail";

export default function HeroesList() {
  // so that it doesn't fetch twice with the strict mode
  const fetched = useRef(false);

  const [heroes, setHeroes] = useState<Hero[]>([]);

  const [selectedHeroId, setSelectedHeroId] = useState<number | null>(null);
  const selectedHero = heroes.find((hero) => hero.id === selectedHeroId);

  useEffect(() => {
    if (!fetched.current) {
      fetch("http://localhost:3000/heroes")
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setHeroes(data);
        });
      fetched.current = true;
    }
  }, []); // execute once

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const updatedName = event.target.value;

    setHeroes((prevHeroes) =>
      prevHeroes.map((hero) => {
        if (hero.id === selectedHeroId) {
          return { ...hero, name: updatedName };
        }
        return hero;
      })
    );
  };

  const handleSelectHeroId = (id: number) => {
    setSelectedHeroId(id);
  };

  return (
    <>
      <h2 className="text-2xl">My heroes</h2>
      <ul className="flex flex-col gap-2 my-3">
        {heroes.map((hero) => (
          <li
            key={hero.id}
            className="flex cursor-pointer"
            onClick={() => handleSelectHeroId(hero.id)}
          >
            <span className="bg-slate-700 text-white rounded-l p-2">
              {hero.id}
            </span>
            <span className="p-2 bg-slate-300 rounded-r w-full">
              {hero.name}
            </span>
          </li>
        ))}
      </ul>

      <HeroDetail hero={selectedHero} onNameChange={handleNameChange} />
    </>
  );
}
