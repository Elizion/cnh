import { Injectable } from '@angular/core';

import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  private recipes: Recipe[] = [
    {
      id: 'r1',
      title: 'Galaxia',
      imageUrl:
        'https://apod.nasa.gov/apod/image/1911/M101_nasaMultiW.jpg',
      ingredients: ['French Fries', 'Pork Meat', 'Salad']
    },
    {
      id: 'r2',
      title: 'Astronauta',
      imageUrl:
        'https://apod.nasa.gov/apod/image/1911/BeanConrad_Apollo12_950.jpg',
      ingredients: ['Spaghetti', 'Meat', 'Tomatoes']
    },  
    {
      id: 'r3',
      title: 'Luna',
      imageUrl:
        'https://apod.nasa.gov/apod/image/1911/PetaviusLangrenus_Poupeau_3000.jpg',
      ingredients: ['Spaghetti', 'Meat', 'Tomatoes']
    }
  ];

  constructor() {}

  getAllRecipes() {
    return [...this.recipes];
  }

  getRecipe(recipeId: string) {
    return {
      ...this.recipes.find(recipe => {
        return recipe.id === recipeId;
      })
    };
  }

}
