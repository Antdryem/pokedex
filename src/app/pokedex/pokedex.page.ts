import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.page.html',
  styleUrls: ['./pokedex.page.scss'],
})
export class PokedexPage implements OnInit {
  public pokedex: any = [];
  constructor() { }

  colors: any = {
    fire: 'red',
    grass: 'green',
    electric: 'yellow',
    water: 'blue',
    ground: 'brown',
    rock: 'burlywood',
    fairy: 'pink',
    poison: 'purple',
    bug: 'darkcyan',
    dragon: 'indigo',
    psychic: 'lightcoral',
    flying: 'lightgray',
    fighting: 'mediumpurple',
    normal: 'gray',
    ice: 'lightblue',
    ghost: 'darkslategray',
    dark: 'black',
    steel: 'darkgray'
  }

  ngOnInit() {
    this.getPokemon();
  }

  getPokemon = async () => {
    let dataPokemon = await fetch("https://pokeapi.co/api/v2/pokemon?limit=494&offset=0");
    let dataPokedex = await dataPokemon.json();
    //console.log(dataPokedex);
    this.printPokemon(dataPokedex);

  }

  printPokemon = async (dataPokedex: { count: number, results: [] }) => {
    dataPokedex["results"].forEach(async (element: { url: string }, id) => {
      //console.log(element);
      let pokemonAttr = await fetch(element.url);
      let attrPokedex = await pokemonAttr.json();
      console.log(attrPokedex);

      this.pokedex.push({
        id: attrPokedex["id"],
        type: attrPokedex["types"][0]["type"]["name"],
        name: ((string) => {
          return string.charAt(0).toUpperCase() + string.slice(1);
        })(attrPokedex["name"])
      });
      console.log(this.pokedex);

    });

  }


  laFuntion(a:any, b:any) {
    if ( a.id < b.id ){
      return -1;
    }
    if ( a.id > b.id ){
      return 1;
    }
    return 0;
  }

}
