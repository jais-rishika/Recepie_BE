import mongoose, { Schema } from "mongoose";

const RecipeSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      default: "",
    },
    servings: {
      type: Number,
    },
    readyInMinutes: {
      type: Number,
    },
    cookingMinutes: {
      type: Number,
    },
    preparationMinutes: {
      type: Number,
    },
    instructions: {
      type: String,
      default: "",
    },
    summary: {
      type: String,
      default: "",
    },

    // Ingredients from API or user input
    ingredients: [
      {
        name: String,
        amount: String,
        unit: String,
        meta: [String],
      },
    ],

    // If comments are disabled by the owner
    commentsDisabled: {
      type: Boolean,
      default: false,
    },

    // Owner of the recipe (null for imported API)
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    // Source info: user or spoonacular
    source: {
      type: String,
      enum: ["user", "spoonacular"],
      required: true,
    },

    // Spoonacular ID if imported
    spoonacularId: {
      type: Number,
      unique: true,
      sparse: true,
    },

    // External links (only for spoonacular)
    sourceUrl: String,
    spoonacularSourceUrl: String,

    // Dish metadata (optional)
    dishTypes: [String],
    cuisines: [String],
    diets: [String],
    healthScore: Number,
    pricePerServing: Number,
    veryHealthy: Boolean,
    vegan: Boolean,
    vegetarian: Boolean,

    // Analytics fields (optional for growth)
    views: {
      type: Number,
      default: 0,
    },
    saves: {
      type: Number,
      default: 0,
    },
    isRecipeOfTheDay: { 
        type: Boolean, 
        default: false 
    }
  },
  {
    timestamps: true,
  },
);

export const Recipe = mongoose.model("Recipe", RecipeSchema);
