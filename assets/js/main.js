const pokemon_list_id = document.getElementById('pokemonList');  // Obtém o elemento com o ID 'pokemonList'
const limit = 300;  // Limite de quantos Pokémon serão carregados inicialmente
let offset = 0;  // Deslocamento que rastreia quantos Pokémon já foram carregados

const max_records = 200;  // Número máximo de registros carregados de cada vez
const max_width = 55;  // Largura máxima usada para mostrar as habilidades dos Pokémon

// Função para carregar mais Pokémon
function load_more_pokemons(offset, limit) {
    function convert_pokemon_to_html(pokemon) {
        return `<li class="pokemon ${pokemon.type}">
					<div class"main">
						<span class="name">${pokemon.name}</span>
						<span class="number">#${pokemon.id}</span>
					</div>
					<ol class="types">
						${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
					</ol>
					<img src="${pokemon.photo}" alt="">
					<div class="data">
						<div class="views">
							<span class="view-info ${pokemon.type}">Info</span>
							<span>Evolution</span>
							<span>Moves</span>
						</div>
						<div class="info">
							<p class="about">
								${pokemon.about}
							</p>
							<div>
								<div class="container">
									<span>HP</span>
									<span class="value">${pokemon.hp}</span>
									<span style="width: calc((${pokemon.hp} / 100) * ${max_width}%);" class="skills HP ${pokemon.type}"></span>
								</div>
								 <div class="container">
									<span>ATK</span>
									<span class="value">${pokemon.atk}</span>
									<span style="width: calc((${pokemon.atk} / 100) * ${max_width}%); "class="skills ATK ${pokemon.type}"></span>
								</div>
								  <div class="container">
									<span>DEF</span>
									<span class="value">${pokemon.def}</span>
									<span style="width: calc((${pokemon.def} / 100) * ${max_width}%);" class="skills DEF ${pokemon.type}"></span>
								</div>
								   <div class="container">
									<span>SATK</span>
									<span class="value">${pokemon.satk}</span>
									<span style="width: calc((${pokemon.satk} / 100) * ${max_width}%);"  class="skills SATK ${pokemon.type}"></span>
								</div>
									<div class="container">
									<span>SDEF</span>
									<span class="value">${pokemon.sdef}</span>
									<span style="width: calc((${pokemon.sdef} / 100) * ${max_width}%);" class="skills SDEF ${pokemon.type}"></span>
								</div>
								<div class="container">
									<span>SPD</span>
									<span class="value">${pokemon.spd}</span>
									<span style="width: calc((${pokemon.spd} / 100) * ${max_width}%);"  class="skills SPD ${pokemon.type}"></span>
								</div>
							</div>
						</div>
						<div class="weakness">
							Fraco contra
							<ol class="types">
								${pokemon.weakness.map((weak) => `<li class=${weak}>${weak}</li>`).join('')}
							</ol>
						</div>
					</div>
				</li>`;
    }

    // Simula uma chamada para uma API de Pokémon para obter dados
    poke_api.get_pokemons(offset, limit).then((pokemons = []) => {
        // Adiciona os Pokémon à lista já existente
        pokemon_list_id.innerHTML += pokemons.map(convert_pokemon_to_html).join('');
    });
}


const loadNextButton = document.getElementById('loadNextButton');
let currentOffset = offset;

function loadNextPokemon() {
    if (currentOffset < limit) {
        load_more_pokemons(currentOffset, 1);
        currentOffset += 1;
    } else {
        alert('Todos os Pokémon já foram carregados!');
        loadNextButton.disabled = true; // Desabilitar o botão após carregar todos os Pokémon
    }
}

loadNextButton.addEventListener('click', loadNextPokemon);