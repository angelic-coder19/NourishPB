import mealSalmon from "@/assets/meal-salmon.jpg";
import mealChickpea from "@/assets/meal-chickpea.jpg";
import mealOatmeal from "@/assets/meal-oatmeal.jpg";
import mealLentil from "@/assets/meal-lentil.jpg";
import herbGarlic from "@/assets/herb-garlic.jpg";
import herbTurmeric from "@/assets/herb-turmeric.jpg";
import herbCinnamon from "@/assets/herb-cinnamon.jpg";
import fruitBlueberries from "@/assets/fruit-blueberries.jpg";
import fruitAvocado from "@/assets/fruit-avocado.jpg";
import fruitPomegranate from "@/assets/fruit-pomegranate.jpg";
import ffGrilledChicken from "@/assets/ff-grilled-chicken.jpg";
import ffTurkeySub from "@/assets/ff-turkey-sub.jpg";
import ffWrap from "@/assets/ff-wrap.jpg";
import ffEggWrap from "@/assets/ff-egg-wrap.jpg";
import ffBeanBowl from "@/assets/ff-bean-bowl.jpg";
import ffAppleSlices from "@/assets/ff-apple-slices.jpg";
import ffParfait from "@/assets/ff-parfait.jpg";

export type Ingredient = {
  name: string;
  effect: string;
  price?: number; // local price in USD
};

export type Meal = {
  id: string;
  name: string;
  image: string;
  ingredients: Ingredient[];
  instructions: string[];
  cost: number;
  calories: number;
  tags?: string[];
};

export const meals: Meal[] = [
  {
    id: "salmon",
    name: "Lemon-Herb Grilled Salmon",
    image: mealSalmon,
    cost: 9.8,
    calories: 520,
    tags: ["dinner", "omega-3"],
    ingredients: [
      { name: "Wild salmon fillet (6 oz)", effect: "Omega-3 fatty acids lower triglycerides and blood pressure", price: 6.49 },
      { name: "Asparagus", effect: "Folate supports healthy homocysteine levels", price: 1.99 },
      { name: "Quinoa (½ cup)", effect: "Whole grain fiber lowers LDL cholesterol", price: 0.85 },
      { name: "Lemon + olive oil", effect: "Monounsaturated fats reduce inflammation", price: 0.5 },
    ],
    instructions: [
      "Pat the salmon dry, season with salt, pepper, and lemon zest.",
      "Heat a grill pan with 1 tsp olive oil over medium-high heat.",
      "Grill salmon 4 minutes per side until just flaky.",
      "Steam asparagus 4 minutes; toss with lemon juice and olive oil.",
      "Cook quinoa per package, fluff and serve alongside.",
    ],
  },
  {
    id: "chickpea",
    name: "Mediterranean Chickpea Bowl",
    image: mealChickpea,
    cost: 4.6,
    calories: 480,
    tags: ["lunch", "fiber"],
    ingredients: [
      { name: "Chickpeas (1 can)", effect: "Soluble fiber lowers cholesterol absorption", price: 1.19 },
      { name: "Kale", effect: "Vitamin K and antioxidants protect arteries", price: 1.49 },
      { name: "Avocado", effect: "Monounsaturated fats raise HDL cholesterol", price: 1.0 },
      { name: "Cherry tomatoes", effect: "Lycopene reduces oxidative stress", price: 0.9 },
    ],
    instructions: [
      "Drain and rinse chickpeas; toast 5 minutes in 1 tsp olive oil.",
      "Massage chopped kale with lemon juice and a pinch of salt.",
      "Layer kale, chickpeas, halved tomatoes, and sliced avocado.",
      "Drizzle with extra virgin olive oil and cracked pepper.",
    ],
  },
  {
    id: "oatmeal",
    name: "Berry Walnut Overnight Oats",
    image: mealOatmeal,
    cost: 2.4,
    calories: 360,
    tags: ["breakfast", "fiber"],
    ingredients: [
      { name: "Rolled oats (½ cup)", effect: "Beta-glucan fiber actively lowers LDL", price: 0.35 },
      { name: "Blueberries", effect: "Anthocyanins improve arterial function", price: 1.25 },
      { name: "Walnuts", effect: "Plant omega-3s reduce inflammation", price: 0.6 },
      { name: "Chia seeds", effect: "ALA omega-3s support heart rhythm", price: 0.2 },
    ],
    instructions: [
      "Combine oats, chia, and unsweetened milk in a jar.",
      "Refrigerate overnight (or at least 4 hours).",
      "Top with blueberries, walnuts, and a drizzle of honey.",
    ],
  },
  {
    id: "lentil",
    name: "Garden Lentil Soup",
    image: mealLentil,
    cost: 3.2,
    calories: 410,
    tags: ["dinner", "lunch"],
    ingredients: [
      { name: "Green lentils", effect: "Plant protein + fiber lowers blood pressure", price: 0.75 },
      { name: "Carrots", effect: "Beta-carotene protects blood vessels", price: 0.45 },
      { name: "Spinach", effect: "Nitrates relax arteries and lower BP", price: 1.2 },
      { name: "Garlic", effect: "Allicin improves cholesterol balance", price: 0.3 },
    ],
    instructions: [
      "Sauté diced onion, carrot, and garlic in olive oil 6 minutes.",
      "Add rinsed lentils, low-sodium broth, and herbs; simmer 25 min.",
      "Stir in spinach until wilted; finish with lemon juice.",
      "Serve with a slice of whole grain bread.",
    ],
  },
];

export type Card2 = {
  id: string;
  name: string;
  image: string;
  whatItDoes: string[];
  howToTake: string[];
};

export const herbs: Card2[] = [
  {
    id: "garlic",
    name: "Garlic",
    image: herbGarlic,
    whatItDoes: [
      "Allicin lowers total and LDL cholesterol",
      "Mildly reduces blood pressure",
      "Improves circulation by relaxing blood vessels",
    ],
    howToTake: [
      "Crush 1–2 raw cloves and let sit 10 min before cooking",
      "Add to dressings, soups, or sautéed greens daily",
      "Aged garlic capsules (600–1200mg) if raw is too strong",
    ],
  },
  {
    id: "turmeric",
    name: "Turmeric",
    image: herbTurmeric,
    whatItDoes: [
      "Curcumin reduces arterial inflammation",
      "Helps prevent plaque buildup in arteries",
      "Improves endothelial (blood vessel lining) function",
    ],
    howToTake: [
      "½–1 tsp in soups, rice, eggs, or smoothies",
      "Always pair with black pepper to boost absorption",
      "Golden milk: turmeric + warm milk + pepper at night",
    ],
  },
  {
    id: "cinnamon",
    name: "Cinnamon",
    image: herbCinnamon,
    whatItDoes: [
      "Helps regulate blood sugar (a heart disease risk)",
      "May lower LDL cholesterol and triglycerides",
      "Antioxidants reduce vascular inflammation",
    ],
    howToTake: [
      "Sprinkle ¼–½ tsp on oatmeal, yogurt, or coffee daily",
      "Use Ceylon (true) cinnamon — gentler on the liver",
      "Stir into baked sweet potato or apple slices",
    ],
  },
];

export const fruits: Card2[] = [
  {
    id: "blueberries",
    name: "Blueberries",
    image: fruitBlueberries,
    whatItDoes: [
      "Anthocyanins improve arterial flexibility",
      "Lower blood pressure in regular eaters",
      "Reduce LDL oxidation",
    ],
    howToTake: [
      "1 cup fresh or frozen, 4–5 days per week",
      "Top oatmeal, yogurt, or salads",
      "Frozen wild blueberries are budget-friendly and potent",
    ],
  },
  {
    id: "avocado",
    name: "Avocado",
    image: fruitAvocado,
    whatItDoes: [
      "Monounsaturated fats raise HDL (good) cholesterol",
      "Potassium helps lower blood pressure",
      "Fiber slows sugar absorption",
    ],
    howToTake: [
      "½ avocado per day on toast, salads, or eggs",
      "Replace mayo or butter with mashed avocado",
      "Blend into smoothies for creaminess",
    ],
  },
  {
    id: "pomegranate",
    name: "Pomegranate",
    image: fruitPomegranate,
    whatItDoes: [
      "Punicalagins reduce arterial plaque",
      "Lower systolic blood pressure",
      "Improve blood flow to the heart",
    ],
    howToTake: [
      "½ cup arils on yogurt or salads",
      "4–8 oz 100% pomegranate juice daily",
      "Add to grain bowls for a sweet-tart pop",
    ],
  },
];

export type Store = {
  name: string;
  url: string;
  logo: string;
  tip: string;
  category?: "Supermarket" | "Local Farm" | "UAPB" | "Food Bank";
};

export const stores: Store[] = [
  {
    name: "Walmart Supercenter",
    url: "https://www.walmart.com",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Walmart_spark_%282025%29.svg/1280px-Walmart_spark_%282025%29.svg.png",
    tip: "Best for full ingredient selection & pickup/delivery",
    category: "Supermarket",
  },
  {
    name: "Super 1 Foods",
    url: "https://www.instacart.com/store/super-1-foods/storefront",
    logo: "https://play-lh.googleusercontent.com/YYyjR89xq7G2nqY95VTCJAvaNowo7dLADj9RBotMcrEYnyXGTV4DngQrngSYQV2y4Q",
    tip: "Best for fresh produce & Southern staples",
    category: "Supermarket",
  },
  {
    name: "FoodSmart",
    url: "https://www.foodsmart.com",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPUan69as9EbVcdnilcpSeiA5ErvaIx5_Lag&s",
    tip: "Best for budget-friendly healthy options",
    category: "Supermarket",
  },
  {
    name: "Walgreens",
    url: "https://www.walgreens.com",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqBfQX1bNXXVK-2w_xOvC0QNpxdoDYxGfBYQ&s",
    tip: "Best for vitamins, supplements & heart-health items",
    category: "Supermarket",
  },
];

export type FastFoodItem = {
  id: string;
  restaurant: string;
  logo: string;
  meal: string;
  image: string;
  ingredients: { name: string; effect: string }[];
  hearts: 1 | 2 | 3 | 4 | 5;
};

export const fastFoodItems: FastFoodItem[] = [
  {
    id: "ff1",
    restaurant: "Subway",
    logo: "https://logos-world.net/wp-content/uploads/2023/01/Subway-Logo.png",
    meal: "6-inch Grilled Chicken on 9-Grain Wheat",
    image: ffTurkeySub,
    hearts: 5,
    ingredients: [
      { name: "9-Grain wheat bread", effect: "Fiber lowers LDL cholesterol" },
      { name: "Grilled chicken", effect: "Lean protein without saturated fat" },
      { name: "Fresh avocado", effect: "Monounsaturated fats raise HDL" },
      { name: "Spinach + tomato", effect: "Nitrates and lycopene support arteries" },
      { name: "Skip creamy sauces", effect: "Avoids added saturated fat & sodium" },
    ],
  },
  {
    id: "ff2",
    restaurant: "Chick-fil-A",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Chick-fil-A_Logo.svg/1280px-Chick-fil-A_Logo.svg.png",
    meal: "Grilled Nuggets + Fruit Cup (or Grilled Cool Wrap)",
    image: ffWrap,
    hearts: 4,
    ingredients: [
      { name: "Grilled chicken", effect: "Lean protein, no frying oils that raise LDL" },
      { name: "Fresh fruit cup", effect: "Antioxidants and fiber reduce inflammation" },
      { name: "Mixed greens", effect: "Antioxidants reduce inflammation" },
    ],
  },
  {
    id: "ff3",
    restaurant: "Arby's",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUx9d3Ru-34SzUDRinOQ93jeM384X2auU3aQ&s",
    meal: "Roast Turkey Sandwich (no creamy sauce, skip curly fries)",
    image: ffTurkeySub,
    hearts: 4,
    ingredients: [
      { name: "Roast turkey", effect: "Lean protein, low saturated fat" },
      { name: "No creamy sauce", effect: "Avoids extra saturated fat & calories" },
      { name: "Skip curly fries", effect: "Reduces trans fat & sodium intake" },
    ],
  },
  {
    id: "ff4",
    restaurant: "McDonald's",
    logo: "https://logos-world.net/wp-content/uploads/2020/06/McDonalds-Logo-1982.png",
    meal: "Oatmeal (no toppings pack) + Side Salad with low-fat dressing",
    image: ffParfait,
    hearts: 3,
    ingredients: [
      { name: "Plain oatmeal", effect: "Beta-glucan fiber actively lowers LDL" },
      { name: "Skip toppings pack", effect: "Avoids added sugar that raises triglycerides" },
      { name: "Side salad", effect: "Greens deliver folate and potassium" },
      { name: "Low-fat dressing", effect: "Cuts saturated fat from the meal" },
    ],
  },
  {
    id: "ff5",
    restaurant: "Taco Bell",
    logo: "https://upload.wikimedia.org/wikipedia/en/b/b7/Taco_Bell_2023.svg",
    meal: "Black Beans & Rice + Fresco-style Chicken Soft Taco",
    image: ffBeanBowl,
    hearts: 3,
    ingredients: [
      { name: "Black beans", effect: "Plant protein and fiber lower BP" },
      { name: "Rice", effect: "Carbs for energy without fryer oils" },
      { name: "Fresco-style", effect: "Swaps cheese/sauce for pico — less saturated fat" },
      { name: "Grilled chicken", effect: "Lean protein, no frying oils" },
    ],
  },
];

export const unhealthyIngredients: Record<string, string> = {
  bacon: "High in saturated fat and sodium — raises LDL cholesterol and blood pressure.",
  sausage: "High in saturated fat and processed nitrates linked to heart disease.",
  butter: "Saturated fat raises LDL cholesterol.",
  margarine: "May contain trans fats that damage arteries.",
  lard: "Very high in saturated fat.",
  "white bread": "Refined carb spikes blood sugar; little fiber for the heart.",
  "white rice": "Refined grain — choose brown rice or quinoa for fiber.",
  soda: "Added sugar drives obesity, diabetes, and heart disease.",
  "deli meat": "High sodium and nitrates raise blood pressure.",
  cheese: "Often high in saturated fat — use small amounts of low-fat versions.",
  "ground beef": "High saturated fat — choose 93%+ lean or swap for turkey.",
  hotdog: "Processed meat strongly linked to cardiovascular disease.",
  fries: "Deep-fried in oils that raise LDL and inflammation.",
  "ice cream": "High saturated fat and added sugar.",
};