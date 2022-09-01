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
  const [pokemon, setPokemon] = useState<RPokemon>(); //saving data in state pokemon

  const getRandomPokemon = async () => {
    try {
      const maxCount = await axios.get(
        'https://pokeapi.co/api/v2/pokemon?limit=1&offset=0'
      ); //fetching the max counter of objects returned by the endpoint
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?limit=1&offset=${Math.floor(
          Math.random() * (maxCount.data.count - 1)
        )}`
      ); //fethching the random pokemon
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
  //Using Transperent URL for showing img with src === null

  const transperentUrl =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';

  // onError = {e => e.target.style.display = 'none'} - Using this to prevent errors 404

  return (
    <>
      {!pokemon ? (
        <h2>Loading</h2>
      ) : (
        <div className="pokemon-card">
          <div className="btn_container">
            <button onClick={() => handleClick()} className="pokemon_btn">
              <h3 className="text_btn">Get Random Pokemon</h3>
            </button>
          </div>
          <div className="pokemon-card_header">
            <p className="pokemon_id">{pokemon.id}</p>
            <h2 className="pokemon_name">{pokemon.name.toUpperCase()}</h2>
          </div>
          <div className="img_box">
            <div className="sprites_img">
              <img
                src={pokemon.sprites.back_default || transperentUrl}
                onError={(e) =>
                  ((e.target as HTMLImageElement).style.display = 'none')
                }
                alt=""
              />
              <img
                src={pokemon.sprites.back_female || transperentUrl}
                onError={(e) =>
                  ((e.target as HTMLImageElement).style.display = 'none')
                }
                alt=""
              />
              <img
                src={pokemon.sprites.back_shiny || transperentUrl}
                onError={(e) =>
                  ((e.target as HTMLImageElement).style.display = 'none')
                }
                alt=""
              />
              <img
                src={pokemon.sprites.back_shiny_female || transperentUrl}
                onError={(e) =>
                  ((e.target as HTMLImageElement).style.display = 'none')
                }
                alt=""
              />
              <img
                src={pokemon.sprites.front_default || transperentUrl}
                onError={(e) =>
                  ((e.target as HTMLImageElement).style.display = 'none')
                }
                alt=""
              />
              <img
                src={pokemon.sprites.front_female || transperentUrl}
                onError={(e) =>
                  ((e.target as HTMLImageElement).style.display = 'none')
                }
                alt=""
              />
              <img
                src={pokemon.sprites.front_shiny || transperentUrl}
                onError={(e) =>
                  ((e.target as HTMLImageElement).style.display = 'none')
                }
                alt=""
              />
              <img
                src={pokemon.sprites.front_shiny_female || transperentUrl}
                onError={(e) =>
                  ((e.target as HTMLImageElement).style.display = 'none')
                }
                alt=""
              />
            </div>
            <div className="sprites_img">
              <img
                src={
                  pokemon.sprites.other.dream_world.front_default ||
                  transperentUrl
                }
                onError={(e) =>
                  ((e.target as HTMLImageElement).style.display = 'none')
                }
                alt=""
              />
              <img
                src={
                  pokemon.sprites.other.dream_world.front_female ||
                  transperentUrl
                }
                onError={(e) =>
                  ((e.target as HTMLImageElement).style.display = 'none')
                }
                alt=""
              />
              <img
                src={pokemon.sprites.other.home.front_default || transperentUrl}
                onError={(e) =>
                  ((e.target as HTMLImageElement).style.display = 'none')
                }
                alt=""
              />
              <img
                src={pokemon.sprites.other.home.front_female || transperentUrl}
                onError={(e) =>
                  ((e.target as HTMLImageElement).style.display = 'none')
                }
                alt=""
              />
              <img
                src={pokemon.sprites.other.home.front_shiny || transperentUrl}
                onError={(e) =>
                  ((e.target as HTMLImageElement).style.display = 'none')
                }
                alt=""
              />
              <img
                src={
                  pokemon.sprites.other.home.front_shiny_female ||
                  transperentUrl
                }
                onError={(e) =>
                  ((e.target as HTMLImageElement).style.display = 'none')
                }
                alt=""
              />
              <img
                src={
                  pokemon.sprites.other['official-artwork'].front_default ||
                  transperentUrl
                }
                onError={(e) =>
                  ((e.target as HTMLImageElement).style.display = 'none')
                }
                alt=""
              />
            </div>
            <div className="sprites_img">
              <img
                src={
                  pokemon.sprites.versions['generation-vi'][
                    'omegaruby-alphasapphire'
                  ].front_default || transperentUrl
                }
                onError={(e) =>
                  ((e.target as HTMLImageElement).style.display = 'none')
                }
                alt=""
              />
              <img
                src={
                  pokemon.sprites.versions['generation-vi'][
                    'omegaruby-alphasapphire'
                  ].front_female || transperentUrl
                }
                onError={(e) =>
                  ((e.target as HTMLImageElement).style.display = 'none')
                }
                alt=""
              />
              <img
                src={
                  pokemon.sprites.versions['generation-vi'][
                    'omegaruby-alphasapphire'
                  ].front_shiny || transperentUrl
                }
                onError={(e) =>
                  ((e.target as HTMLImageElement).style.display = 'none')
                }
                alt=""
              />
              <img
                src={
                  pokemon.sprites.versions['generation-vi'][
                    'omegaruby-alphasapphire'
                  ].front_shiny || transperentUrl
                }
                onError={(e) =>
                  ((e.target as HTMLImageElement).style.display = 'none')
                }
                alt=""
              />
              <img
                src={
                  pokemon.sprites.versions['generation-vi'][
                    'omegaruby-alphasapphire'
                  ].front_shiny_female || transperentUrl
                }
                onError={(e) =>
                  ((e.target as HTMLImageElement).style.display = 'none')
                }
                alt=""
              />
            </div>
            <div className="sprites_img">
              <img
                src={
                  pokemon.sprites.versions['generation-vii'].icons
                    .front_default || transperentUrl
                }
                onError={(e) =>
                  ((e.target as HTMLImageElement).style.display = 'none')
                }
                alt=""
              />
              <img
                src={
                  pokemon.sprites.versions['generation-vii'].icons
                    .front_female || transperentUrl
                }
                onError={(e) =>
                  ((e.target as HTMLImageElement).style.display = 'none')
                }
                alt=""
              />
            </div>
            <div className="sprites_img">
              <img
                src={
                  pokemon.sprites.versions['generation-viii'].icons
                    .front_default || transperentUrl
                }
                onError={(e) =>
                  ((e.target as HTMLImageElement).style.display = 'none')
                }
                alt=""
              />
              <img
                src={
                  pokemon.sprites.versions['generation-viii'].icons
                    .front_female || transperentUrl
                }
                onError={(e) =>
                  ((e.target as HTMLImageElement).style.display = 'none')
                }
                alt=""
              />{' '}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

