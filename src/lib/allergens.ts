// Local + allergen helpers shared across meal cards

export const LOCAL_INGREDIENTS = [
  "collard greens",
  "tomatoes",
  "tomato",
  "carrots",
  "carrot",
  "parsley",
  "basil",
  "thyme",
  "beetroot",
  "beet",
  "sweet potatoes",
  "sweet potato",
  "broccoli",
  "ginger",
  "cayenne pepper",
  "cayenne",
];

export const isLocalIngredient = (name: string): boolean => {
  const n = name.toLowerCase();
  return LOCAL_INGREDIENTS.some((l) => n.includes(l));
};

export const recipeHasLocal = (ingredients: { name: string }[]): boolean =>
  ingredients.some((i) => isLocalIngredient(i.name));

export type Allergen =
  | "Gluten"
  | "Dairy"
  | "Eggs"
  | "Fish"
  | "Shellfish"
  | "Tree Nuts"
  | "Peanuts"
  | "Soy"
  | "Sesame";

const ALLERGEN_KEYWORDS: Record<Allergen, string[]> = {
  Gluten: ["bread", "wheat", "oat", "oats", "pasta", "barley", "rye", "flour", "tortilla", "bun", "cracker"],
  Dairy: ["milk", "yogurt", "cheese", "butter", "cream", "whey"],
  Eggs: ["egg"],
  Fish: ["salmon", "tuna", "sardine", "cod", "trout", "fish", "anchovy"],
  Shellfish: ["shrimp", "crab", "lobster", "prawn", "shellfish", "scallop"],
  "Tree Nuts": ["walnut", "almond", "pecan", "cashew", "pistachio", "hazelnut", "macadamia"],
  Peanuts: ["peanut"],
  Soy: ["soy", "tofu", "edamame", "tempeh"],
  Sesame: ["sesame", "tahini"],
};

export const detectAllergens = (
  ingredients: { name: string }[]
): Allergen[] => {
  const text = ingredients.map((i) => i.name.toLowerCase()).join(" | ");
  const found: Allergen[] = [];
  (Object.keys(ALLERGEN_KEYWORDS) as Allergen[]).forEach((a) => {
    if (ALLERGEN_KEYWORDS[a].some((kw) => text.includes(kw))) found.push(a);
  });
  return found;
};

export const ALL_ALLERGENS: Allergen[] = [
  "Gluten",
  "Dairy",
  "Eggs",
  "Fish",
  "Shellfish",
  "Tree Nuts",
  "Peanuts",
  "Soy",
  "Sesame",
];
