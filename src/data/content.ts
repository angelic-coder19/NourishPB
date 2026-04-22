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
  tags?: string[];
};

export const meals: Meal[] = [
  {
    id: "salmon",
    name: "Lemon-Herb Grilled Salmon",
    image: mealSalmon,
    cost: 9.8,
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
  initials: string;
  color: string; // tailwind bg class
};

export const stores: Store[] = [
  { name: "Walmart Supercenter", url: "https://www.walmart.com/store/finder?location=pine+bluff+ar", initials: "W", color: "bg-[hsl(210_85%_45%)]" },
  { name: "Kroger", url: "https://www.kroger.com/stores/search?searchText=Pine+Bluff%2C+AR", initials: "K", color: "bg-[hsl(350_75%_42%)]" },
  { name: "Save A Lot", url: "https://savealot.com/stores", initials: "SL", color: "bg-[hsl(28_92%_52%)]" },
  { name: "ALDI", url: "https://stores.aldi.us/", initials: "A", color: "bg-[hsl(220_75%_35%)]" },
  { name: "Harps Food Store", url: "https://www.harpsfood.com/stores", initials: "H", color: "bg-[hsl(150_55%_35%)]" },
];

export type FastFoodItem = {
  id: string;
  restaurant: string;
  initials: string;
  brandColor: string;
  meal: string;
  image: string;
  ingredients: { name: string; effect: string }[];
  hearts: 1 | 2 | 3 | 4 | 5;
};

export const fastFoodItems: FastFoodItem[] = [
  {
    id: "ff1",
    restaurant: "Subway",
    initials: "S",
    brandColor: "bg-[hsl(150_75%_30%)]",
    meal: "Oven-Roasted Turkey on 9-Grain Wheat",
    image: ffTurkeySub,
    hearts: 5,
    ingredients: [
      { name: "Whole grain bread", effect: "Fiber lowers LDL cholesterol" },
      { name: "Spinach + tomato", effect: "Nitrates and lycopene support arteries" },
      { name: "Lean turkey", effect: "Protein without saturated fat" },
    ],
  },
  {
    id: "ff2",
    restaurant: "Chick-fil-A",
    initials: "C",
    brandColor: "bg-[hsl(350_75%_45%)]",
    meal: "Grilled Chicken Cool Wrap",
    image: ffWrap,
    hearts: 4,
    ingredients: [
      { name: "Grilled chicken", effect: "Lean protein, no frying oils" },
      { name: "Mixed greens", effect: "Antioxidants reduce inflammation" },
    ],
  },
  {
    id: "ff3",
    restaurant: "Wendy's",
    initials: "W",
    brandColor: "bg-[hsl(350_70%_40%)]",
    meal: "Grilled Chicken Salad (light dressing)",
    image: ffGrilledChicken,
    hearts: 4,
    ingredients: [
      { name: "Grilled chicken breast", effect: "Lean protein, low saturated fat" },
      { name: "Romaine + veggies", effect: "Folate and potassium aid blood pressure" },
    ],
  },
  {
    id: "ff4",
    restaurant: "McDonald's",
    initials: "M",
    brandColor: "bg-[hsl(35_95%_50%)]",
    meal: "Egg White Delight + Apple Slices",
    image: ffEggWrap,
    hearts: 3,
    ingredients: [
      { name: "Egg whites", effect: "Protein with no cholesterol" },
      { name: "Apple slices", effect: "Soluble fiber lowers LDL" },
    ],
  },
  {
    id: "ff5",
    restaurant: "Taco Bell",
    initials: "T",
    brandColor: "bg-[hsl(280_60%_45%)]",
    meal: "Power Menu Bowl — Veggie",
    image: ffBeanBowl,
    hearts: 4,
    ingredients: [
      { name: "Black beans", effect: "Plant protein and fiber lower BP" },
      { name: "Brown rice + pico", effect: "Whole grains and lycopene" },
    ],
  },
  {
    id: "ff6",
    restaurant: "Sonic",
    initials: "S",
    brandColor: "bg-[hsl(220_70%_40%)]",
    meal: "Apple Slices Side",
    image: ffAppleSlices,
    hearts: 3,
    ingredients: [
      { name: "Fresh apple", effect: "Pectin fiber lowers cholesterol" },
    ],
  },
  {
    id: "ff7",
    restaurant: "McDonald's",
    initials: "M",
    brandColor: "bg-[hsl(35_95%_50%)]",
    meal: "Fruit & Yogurt Parfait",
    image: ffParfait,
    hearts: 3,
    ingredients: [
      { name: "Low-fat yogurt", effect: "Calcium + probiotics support BP" },
      { name: "Berries", effect: "Anthocyanins protect arteries" },
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