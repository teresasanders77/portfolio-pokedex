var pokemonList = [
{
		name: 'Venusaur',
		height: 2,
		types: ['grass','poison'],
	},
{
		name: 'Zapdos',
		height: 2,
		types: ['electric','flying'],
	},
{
		name: 'Escavalier',
		height: 1,
		types: ['steel','bug'],
	},
];
for ( var i = 0; i < pokemonList.length; i++) {
  document.write('<p>' + pokemonList[i].name  + ' \(height: ' + pokemonList[i].height + '\)' + '<p>')
}
