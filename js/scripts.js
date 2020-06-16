var pokemonList = [
{
		name: 'Venusaur',
		height: 2,
		types: ['grass','poison'],
	},
{
		name: 'Volcarona',
		height: 1.6,
		types: ['fire','bug'],
	},
{
		name: 'Escavalier',
		height: 1,
		types: ['steel','bug'],
	},
];
for ( var i = 0; i < pokemonList.length; i++) {
  document.write('<p>' + pokemonList[i].name  + ' \(height: ' + pokemonList[i].height + '\)')
	if (pokemonList[i].height >= 2) {
		document.write('- Wow, that\'s big!' + '<p>' )
	}
}
