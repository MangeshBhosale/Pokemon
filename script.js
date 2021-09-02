const poke = document.getElementById('poke');

const fetchPokemon = () => {
    const promises = [];
    for (let i = 1; i <= 50; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(url).then((res) => res.json()));
    }
    Promise.all(promises).then((results) => {
        const pokemon = results.map((data) => ({
            name: data.name,
                    weight: data.weight,
                    ability:data.abilities
                    .map((abilities)=>
                  //  console.log(abilities.ability.name);
                    abilities.ability.name
                ).join(', '),
                move:data.moves
                .map((moves)=>
              //  console.log(abilities.ability.name);
                moves.move.name
            ).join(', '),
            image:data.sprites['front_default']
        }));
        displayPokemon(pokemon);
    });
};

const displayPokemon = (pokemon) => {
    console.log(pokemon);
    const pokemonHTMLString = pokemon
        .map(
            (pokeman) => `
        <li class="card">
            <img class="card-image" src="${pokeman.image}"/>
            <h2 class="card-title"> ${pokeman.name}</h2>
            <p class="card-subtitle">Weight: ${pokeman.weight}</p>
            <p class="card-subtitle">Ability: ${pokeman.ability}</p>
            <p class="card-subtitle">Moves: ${pokeman.move}</p>
            
        </li>
    `
        )
        .join('');
    poke.innerHTML = pokemonHTMLString;
};

fetchPokemon();





