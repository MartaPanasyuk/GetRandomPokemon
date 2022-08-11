import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import './RandomPokemon.css';

interface RPokemon {
  name: string;
  id: number;
  sprites: Sprites;
}

interface Sprites {
  back_default: string | null;
  back_female: null | string;
  back_shiny: string | null;
  back_shiny_female: null | string;
  front_default: string | null;
  front_female: null | string;
  front_shiny: string | null;
  front_shiny_female: null | string;
  other: Other;
  versions: Versions;
}

interface Other {
  dream_world: Dream_world;
  home: Home;
  'official-artwork': Official;
}

interface Dream_world {
  front_default: string | null;
  front_female: null | string;
}

interface Home {
  front_default: string | null;
  front_female: null | string;
  front_shiny: string | null;
  front_shiny_female: null | string;
}

interface Official {
  front_default: string | null;
}

interface Versions {
  'generation-vi': Version_vi;
  'generation-vii': Version_vii;
  'generation-viii': Version_viii;
}

//Version_vi
interface Version_vi {
  'omegaruby-alphasapphire': Some_Data;
  'x-y': Some_Info;
}

interface Some_Data {
  front_default: null | string;
  front_female: null | string;
  front_shiny: null | string;
  front_shiny_female: null | string;
}

interface Some_Info {
  front_default: null | string;
  front_female: null | string;
  front_shiny: null | string;
  front_shiny_female: null | string;
}

//Version_vii
interface Version_vii {
  icons: Info;
  'ultra-sun-ultra-moon': Other_Info;
}

interface Info {
  front_default: null | string;
  front_female: null | string;
}

interface Other_Info {
  back_default: null | string;
  front_female: null | string;
  front_shiny: null | string;
  front_shiny_female: null | string;
}

//Version_viii
interface Version_viii {
  icons: Some_Icons;
}

interface Some_Icons {
  front_default: null | string;
  front_female: null | string;
}

export default function RandomPokemon() {
  const [pokemon, setPokemon] = useState<RPokemon>();

  const getRandomPokemon = async () => {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?limit=1&offset=${Math.floor(
          Math.random() * (1154 - 1)
        )}`
      );
      const resPokemon = response.data.results[0].url;

      const finalPoke = await axios.get(resPokemon);
      const raw = finalPoke.data;

      const final = {} as RPokemon;
      final.name = raw.name;
      final.id = raw.id;
      final.sprites = raw.sprites;

      //console.log('filtered result', final);

      setPokemon(final);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getRandomPokemon();
  }, []);

  const handleClick = () => {
    getRandomPokemon();
  };

  return (
    <>
      <div className="test">
        {!pokemon ? (
          <h2>Loading</h2>
        ) : (
          <div>
            <div>
              <button onClick={() => handleClick()} className="pokemon_btn">
                <h3 className="text_btn">Get Random Pokemon</h3>
              </button>
            </div>
            <div className="pokemon-card">
              <p className="pokemon_id">#{pokemon.id}</p>
              <h2 className="pokemon_name">{pokemon.name.toUpperCase()}</h2>
            </div>
            <div className="parent">
              <div className="div1"> </div>
              <div className="div2"> </div>
              <div className="div3"> </div>
              <div className="div4"> </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
