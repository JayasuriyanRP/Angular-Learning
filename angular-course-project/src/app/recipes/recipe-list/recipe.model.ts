import { Ingredient } from '../../shared/Ingredient.model';
export class Recipe {
  public name: string;
  public description: string;
  public imagePath: string;
  public ingredients: Ingredient[];
  public createdDate: Date;

  /**
   *
   */
  constructor(
    name: string,
    desc: string,
    image: string,
    ingredients: Ingredient[],
    createdDate?: Date
  ) {
    this.imagePath = image;
    this.name = name;
    this.description = desc;
    this.ingredients = ingredients;
    this.createdDate = new Date();
  }
}
