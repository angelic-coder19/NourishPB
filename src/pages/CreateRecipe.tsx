import { useMemo, useState } from "react";
import { DollarSign, Sparkles, AlertTriangle, Send, Mic, Image as ImageIcon, ShoppingCart, ExternalLink } from "lucide-react";
import { meals, unhealthyIngredients, Meal } from "@/data/content";
import RecipeDetailCard from "@/components/RecipeDetailCard";
import { toast } from "@/hooks/use-toast";
import mealLentil from "@/assets/meal-lentil.jpg";
import mealSalmon from "@/assets/meal-salmon.jpg";
import mealChickpea from "@/assets/meal-chickpea.jpg";
import AllergenInfo from "@/components/AllergenInfo";
import { LocalBadge, LocalFooterNote } from "@/components/LocalBadge";
import { detectAllergens, isLocalIngredient, recipeHasLocal } from "@/lib/allergens";

type BudgetMeal = {
  name: string;
  image: string;
  ingredients: { name: string; price: number }[];
  total: number;
  instructions: string[];
  searchTerm: string;
};

const budgetMeals: BudgetMeal[] = [
  {
    name: "Hearty Black Bean & Brown Rice Bowl",
    image: mealLentil,
    searchTerm: "black beans",
    ingredients: [
      { name: "Black beans (1 can)", price: 1.28 },
      { name: "Brown rice", price: 1.5 },
      { name: "Garlic", price: 0.98 },
      { name: "Olive oil (per portion)", price: 0.5 },
      { name: "Cumin spice", price: 0.3 },
    ],
    total: 4.56,
    instructions: [
      "Rinse and drain black beans.",
      "Cook brown rice per package instructions.",
      "Sauté garlic in olive oil for 2 minutes.",
      "Add beans, cumin, and salt-free seasoning; cook 5 minutes.",
      "Serve beans over rice, top with fresh lime if available.",
    ],
  },
  {
    name: "Baked Lemon Herb Salmon with Greens",
    image: mealSalmon,
    searchTerm: "salmon",
    ingredients: [
      { name: "Salmon fillet", price: 6.0 },
      { name: "Fresh spinach", price: 2.5 },
      { name: "Garlic", price: 0.98 },
      { name: "Lemon", price: 0.5 },
      { name: "Olive oil", price: 0.75 },
      { name: "Brown rice", price: 1.5 },
    ],
    total: 12.23,
    instructions: [
      "Preheat oven to 400°F.",
      "Season salmon with lemon juice, garlic, and herbs.",
      "Bake 12–15 minutes until flaky.",
      "Sauté spinach in olive oil 3 minutes.",
      "Serve over brown rice.",
    ],
  },
  {
    name: "Heart-Healthy Smothered Turkey & Collard Greens",
    image: mealChickpea,
    searchTerm: "ground turkey",
    ingredients: [
      { name: "Ground turkey", price: 5.0 },
      { name: "Collard greens", price: 2.0 },
      { name: "Onion", price: 0.75 },
      { name: "Garlic", price: 0.98 },
      { name: "Low-sodium broth", price: 1.5 },
      { name: "Brown rice", price: 1.5 },
      { name: "Olive oil", price: 0.75 },
      { name: "Whole grain bread", price: 2.5 },
    ],
    total: 14.98,
    instructions: [
      "Brown ground turkey in olive oil with onion and garlic.",
      "Add low-sodium broth and simmer 10 minutes.",
      "Wash and chop collard greens; cook in a separate pan 20 minutes.",
      "Season with apple cider vinegar and smoked paprika (no salt).",
      "Serve over brown rice with whole grain bread.",
    ],
  },
];

const pickBudgetMeal = (amount: number): BudgetMeal => {
  if (amount < 10) return budgetMeals[0];
  if (amount < 20) return budgetMeals[1];
  return budgetMeals[2];
};

const walmartUrl = (q: string) => `https://www.walmart.com/search?q=${encodeURIComponent(q)}`;

const BudgetMealCard = ({ meal }: { meal: BudgetMeal }) => {
  const allergens = detectAllergens(meal.ingredients);
  const hasLocal = recipeHasLocal(meal.ingredients);
  return (
  <article className="rounded-2xl bg-card border border-border/60 shadow-card overflow-hidden animate-scale-in">
    <div className="aspect-[16/9] overflow-hidden bg-muted">
      <img src={meal.image} alt={meal.name} className="w-full h-full object-cover" />
    </div>
    <div className="p-6">
      <h3 className="font-display text-2xl font-semibold mb-4">{meal.name}</h3>
      <div className="text-xs uppercase tracking-wider text-secondary font-semibold mb-2">Core Ingredients</div>
      <ul className="space-y-1.5 mb-4">
        {meal.ingredients.map((i) => (
          <li key={i.name} className="text-sm flex justify-between gap-3">
            <span className="font-medium">
              {i.name}
              {isLocalIngredient(i.name) && <LocalBadge />}
            </span>
            <span className="text-muted-foreground tabular-nums">${i.price.toFixed(2)}</span>
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-between border-t border-border/60 pt-3 mb-5">
        <span className="text-sm font-semibold">Total estimated cost</span>
        <span className="font-display text-lg font-semibold text-primary">~${meal.total.toFixed(2)}</span>
      </div>
      <a
        href={walmartUrl(meal.searchTerm)}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 h-11 px-5 rounded-full bg-primary text-primary-foreground font-semibold shadow-soft hover:shadow-glow transition-shadow mb-5"
      >
        <ShoppingCart className="w-4 h-4" /> Shop at Walmart <ExternalLink className="w-3.5 h-3.5" />
      </a>
      <div className="text-xs uppercase tracking-wider text-secondary font-semibold mb-2">Instructions</div>
      <ol className="space-y-2 list-decimal list-inside text-sm">
        {meal.instructions.map((step, i) => (
          <li key={i} className="leading-relaxed">{step}</li>
        ))}
      </ol>
      <AllergenInfo allergens={allergens} />
      {hasLocal && <LocalFooterNote />}
    </div>
  </article>
);
};

const PageHeader = ({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: string }) => (
  <div className="container pt-12 md:pt-16 pb-6 max-w-3xl">
    <p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-2">{eyebrow}</p>
    <h1 className="font-display text-4xl md:text-5xl font-semibold mb-3">{title}</h1>
    <p className="text-muted-foreground text-lg">{subtitle}</p>
  </div>
);

const SectionCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="rounded-3xl bg-card border border-border/60 shadow-soft p-6 md:p-8">
    <h2 className="font-display text-2xl font-semibold mb-5">{title}</h2>
    {children}
  </section>
);

const pickByBudget = (amount: number): Meal | null => {
  const affordable = meals.filter((m) => m.cost <= amount).sort((a, b) => b.cost - a.cost);
  if (affordable.length) return affordable[0];
  return [...meals].sort((a, b) => a.cost - b.cost)[0];
};

const detectUnhealthy = (text: string) => {
  const lower = text.toLowerCase();
  return Object.entries(unhealthyIngredients)
    .filter(([key]) => lower.includes(key))
    .map(([name, reason]) => ({ name, reason }));
};

const matchByIngredients = (text: string): Meal => {
  const lower = text.toLowerCase();
  let best = meals[0];
  let bestScore = -1;
  for (const m of meals) {
    const score = m.ingredients.reduce((s, ing) => {
      const key = ing.name.split(" ")[0].toLowerCase();
      return s + (lower.includes(key) ? 1 : 0);
    }, 0);
    if (score > bestScore) {
      bestScore = score;
      best = m;
    }
  }
  return best;
};

const CreateRecipe = () => {
  const [budget, setBudget] = useState("");
  const [budgetMeal, setBudgetMeal] = useState<BudgetMeal | null>(null);

  const [ingredients, setIngredients] = useState("");
  const [ingResult, setIngResult] = useState<{ meal: Meal; warnings: { name: string; reason: string }[] } | null>(null);

  const handleBudget = (e: React.FormEvent) => {
    e.preventDefault();
    const n = parseFloat(budget);
    if (!n || n <= 0) {
      toast({ title: "Enter an amount", description: "Please enter a dollar amount greater than 0." });
      return;
    }
    setBudgetMeal(pickBudgetMeal(n));
  };

  const handleIngredients = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ingredients.trim()) {
      toast({ title: "Tell us what you have", description: "List a few ingredients to generate a meal." });
      return;
    }
    const warnings = detectUnhealthy(ingredients);
    const meal = matchByIngredients(ingredients);
    setIngResult({ meal, warnings });
  };

  const supportsSpeech = useMemo(
    () => typeof window !== "undefined" && ("webkitSpeechRecognition" in window || "SpeechRecognition" in window),
    []
  );

  const startSpeech = () => {
    // @ts-expect-error vendor
    const Recog = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Recog) return;
    const rec = new Recog();
    rec.lang = "en-US";
    rec.onresult = (e: any) => {
      const txt = e.results[0][0].transcript;
      setIngredients((prev) => (prev ? prev + ", " + txt : txt));
    };
    rec.start();
    toast({ title: "Listening…", description: "Say the ingredients you have." });
  };

  return (
    <>
      <PageHeader
        eyebrow="Create Recipe"
        title="Cook from what you have — or what you can spend."
        subtitle="We'll match you with a heart-healthy meal and flag anything that puts your heart at risk."
      />

      <div className="container pb-20 grid lg:grid-cols-2 gap-8">
        {/* From Money */}
        <SectionCard title="From Money">
          <form onSubmit={handleBudget} className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="number"
                step="0.01"
                min="0"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                placeholder="Enter amount (e.g. 8.00)"
                className="w-full h-12 pl-11 pr-4 rounded-full bg-background border border-input text-lg focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <button
              type="submit"
              className="h-12 px-6 rounded-full bg-primary text-primary-foreground font-semibold shadow-soft hover:shadow-glow transition-shadow"
            >
              Find Meal
            </button>
          </form>
          {budgetMeal ? (
            <BudgetMealCard meal={budgetMeal} />
          ) : (
            <div className="rounded-2xl bg-muted/50 p-8 text-center text-muted-foreground">
              <Sparkles className="w-8 h-8 mx-auto mb-2 text-primary" />
              Enter your budget to get a heart-healthy recipe with local prices.
            </div>
          )}
        </SectionCard>

        {/* From Ingredients */}
        <SectionCard title="From Ingredients">
          <form onSubmit={handleIngredients} className="space-y-3 mb-6">
            <div className="relative">
              <textarea
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                rows={4}
                placeholder="e.g. chicken, spinach, garlic, olive oil…"
                className="w-full p-4 rounded-2xl bg-background border border-input text-base resize-none focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <div className="absolute bottom-3 right-3 flex gap-1.5">
                {supportsSpeech && (
                  <button type="button" onClick={startSpeech} className="p-2 rounded-full bg-muted hover:bg-muted/70" title="Speak">
                    <Mic className="w-4 h-4" />
                  </button>
                )}
                <button type="button" onClick={() => toast({ title: "Image input", description: "Snap or upload a photo of your ingredients (demo)." })} className="p-2 rounded-full bg-muted hover:bg-muted/70" title="Take image">
                  <ImageIcon className="w-4 h-4" />
                </button>
                <button type="submit" className="p-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90" title="Send">
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </form>

          {ingResult ? (
            <div className="space-y-4">
              {ingResult.warnings.length > 0 && (
                <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-5 animate-scale-in">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="shrink-0 w-9 h-9 rounded-full bg-destructive/15 text-destructive flex items-center justify-center">
                      <AlertTriangle className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-display font-semibold text-lg text-destructive">Watch out for these</p>
                      <p className="text-sm text-muted-foreground">These ingredients raise your heart disease risk.</p>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {ingResult.warnings.map((w) => (
                      <li key={w.name} className="text-sm">
                        <span className="font-semibold capitalize">{w.name}</span>
                        <span className="text-muted-foreground"> — {w.reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <RecipeDetailCard meal={ingResult.meal} />
            </div>
          ) : (
            <div className="rounded-2xl bg-muted/50 p-8 text-center text-muted-foreground">
              <Sparkles className="w-8 h-8 mx-auto mb-2 text-primary" />
              Speak, snap, or type what's in your kitchen.
            </div>
          )}
        </SectionCard>
      </div>
    </>
  );
};

export default CreateRecipe;