import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import './RandomPokemon.css';

interface RPokemon {
  name: string;
  url: string;
}

export default function RandomPokemon() {
  const [pokemon, setPokemon] = useState<Array<RPokemon>>([]);

  const getPokemon = async () => {
    try {
      const response = await axios.get(
        'https://pokeapi.co/api/v2/pokemon?limit=25"'
      );
      setPokemon(response.data.results);
      console.log('response', response.data.results);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getPokemon();
  }, []);

  console.log('tis is mine pokemon', pokemon);

  return (
    <>
      <div className="test">
        {!pokemon ? (
          <h2>Loading</h2>
        ) : (
          <div>
            <h2>
              {pokemon.map((p) => (
                <h2>{p.name}</h2>
              ))}
            </h2>
          </div>
        )}
      </div>
    </>
  );
}
