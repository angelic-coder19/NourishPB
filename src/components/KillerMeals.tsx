import { AlertTriangle, Flame } from "lucide-react";
import killerFriedChicken from "@/assets/killer-fried-chicken.jpg";
import killerBurger from "@/assets/killer-burger.jpg";
import killerBbqRibs from "@/assets/killer-bbq-ribs.jpg";
import killerBreakfast from "@/assets/killer-breakfast.jpg";

type KillerMeal = {
  id: string;
  name: string;
  image: string;
  calories: number;
  ingredients: { name: string; effect: string }[];
};

const KILLER_MEALS: KillerMeal[] = [
  {
    id: "fried-chicken",
    name: "Fried Chicken & Mashed Potatoes",
    image: killerFriedChicken,
    calories: 1280,
    ingredients: [
      { name: "Deep-fried chicken skin", effect: "Saturated and trans fats spike LDL cholesterol" },
      { name: "Refined frying oil", effect: "Repeatedly heated oils inflame artery walls" },
      { name: "Butter-laden mashed potatoes", effect: "Saturated fat raises bad cholesterol" },
      { name: "Salt-heavy gravy", effect: "Excess sodium drives up blood pressure" },
    ],
  },
  {
    id: "bacon-cheeseburger",
    name: "Bacon Cheeseburger & Fries",
    image: killerBurger,
    calories: 1450,
    ingredients: [
      { name: "Bacon", effect: "Processed meat linked to cardiovascular disease" },
      { name: "Full-fat cheese", effect: "Saturated fat raises LDL cholesterol" },
      { name: "80/20 ground beef", effect: "High saturated fat strains the heart" },
      { name: "Deep-fried fries", effect: "Trans fats and sodium harm blood vessels" },
    ],
  },
  {
    id: "bbq-ribs",
    name: "BBQ Pork Ribs & White Bread",
    image: killerBbqRibs,
    calories: 1620,
    ingredients: [
      { name: "Fatty pork ribs", effect: "High saturated fat content raises cholesterol" },
      { name: "Sugary BBQ sauce", effect: "Added sugar increases triglycerides" },
      { name: "White bread", effect: "Refined carbs spike blood sugar, little fiber" },
      { name: "Mayo-heavy coleslaw", effect: "Saturated fat from mayo crowds out heart-helpful nutrients" },
    ],
  },
  {
    id: "southern-breakfast",
    name: "Bacon, Sausage & Biscuits",
    image: killerBreakfast,
    calories: 1100,
    ingredients: [
      { name: "Pork sausage", effect: "Processed meat and nitrates raise heart disease risk" },
      { name: "Bacon", effect: "Saturated fat and sodium elevate blood pressure" },
      { name: "Buttermilk biscuits", effect: "Refined flour and butter raise LDL cholesterol" },
      { name: "Sausage gravy", effect: "Saturated fat and sodium overload in one bite" },
    ],
  },
];

const KillerMealCard = ({ meal }: { meal: KillerMeal }) => (
  <article className="group rounded-2xl bg-card overflow-hidden shadow-soft hover:shadow-card transition-all duration-300 hover:-translate-y-1 border border-destructive/30">
    <div className="relative aspect-[4/3] overflow-hidden bg-muted">
      <img
        src={meal.image}
        alt={meal.name}
        loading="lazy"
        width={768}
        height={576}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <span className="absolute top-2 right-2 inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-destructive text-destructive-foreground text-xs font-bold shadow-card animate-pulse">
        <Flame className="w-3.5 h-3.5" /> {meal.calories.toLocaleString()} cal
      </span>
    </div>
    <div className="p-5">
      <h3 className="font-display text-xl font-semibold mb-3">{meal.name}</h3>
      <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-destructive font-semibold mb-2">
        <AlertTriangle className="w-3.5 h-3.5" />
        Killer Ingredients
      </div>
      <ul className="space-y-2">
        {meal.ingredients.map((ing) => (
          <li key={ing.name} className="text-sm">
            <span className="font-medium text-foreground">{ing.name}</span>
            <span className="text-muted-foreground"> — {ing.effect}</span>
          </li>
        ))}
      </ul>
    </div>
  </article>
);

const KillerMeals = () => (
  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
    {KILLER_MEALS.map((m) => (
      <KillerMealCard key={m.id} meal={m} />
    ))}
  </div>
);

export default KillerMeals;