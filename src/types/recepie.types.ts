export interface CreateRecipeInput {
  title: string;
  image?: Express.Multer.File; // raw multer file
  servings?: number;
  readyInMinutes?: number;
  cookingMinutes?: number;
  preparationMinutes?: number;
  instructions?: string;
  summary?: string;
  draft: boolean;
  ingredients?: {
    name: string;
    amount: string;
    unit: string;
    meta: string[];
  }[];
  source?: "user" | "spoonacular";
  dishTypes?: string[];
  cuisines?: string[];
  diets?: string[];
  healthScore?: number;
  pricePerServing?: number;
  veryHealthy?: boolean;
  vegan?: boolean;
  vegetarian?: boolean;
  spoonacularId?: number;
  sourceUrl?: string;
  spoonacularSourceUrl?: string;
}
