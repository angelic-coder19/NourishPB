import { useEffect, useMemo, useRef, useState } from "react";
import { Download, Sparkles, X, ShoppingCart, ExternalLink, AlertTriangle } from "lucide-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { toast } from "@/hooks/use-toast";
import mealOatmeal from "@/assets/meal-oatmeal.jpg";
import mealLentil from "@/assets/meal-lentil.jpg";
import mealSalmon from "@/assets/meal-salmon.jpg";
import mealChickpea from "@/assets/meal-chickpea.jpg";
import AllergenInfo from "@/components/AllergenInfo";
import { LocalBadge, LocalFooterNote } from "@/components/LocalBadge";
import { detectAllergens, isLocalIngredient, recipeHasLocal, Allergen } from "@/lib/allergens";

type PlanMeal = {
  name: string;
  description: string;
  image: string;
  ingredients: { name: string; price: number }[];
  total: number;
  instructions: string[];
  searchTerm: string;
};

const breakfastOptions: PlanMeal[] = [
  {
    name: "Oatmeal with Blueberries",
    description: "Beta-glucan oats and antioxidant berries.",
    image: mealOatmeal,
    searchTerm: "oats",
    ingredients: [
      { name: "Rolled oats", price: 0.35 },
      { name: "Blueberries", price: 1.25 },
      { name: "Walnuts", price: 0.6 },
    ],
    total: 2.2,
    instructions: [
      "Bring 1 cup water to a boil and stir in oats.",
      "Simmer 5 minutes until creamy.",
      "Top with blueberries and walnuts.",
    ],
  },
  {
    name: "Whole Grain Toast & Eggs",
    description: "Fiber bread with lean protein.",
    image: mealOatmeal,
    searchTerm: "whole grain bread",
    ingredients: [
      { name: "Whole grain bread", price: 2.5 },
      { name: "Eggs", price: 1.5 },
      { name: "Olive oil", price: 0.5 },
    ],
    total: 4.5,
    instructions: [
      "Toast 2 slices of whole grain bread.",
      "Cook eggs in olive oil to your liking.",
      "Serve together with cracked pepper.",
    ],
  },
  {
    name: "Greek Yogurt & Walnuts",
    description: "Probiotics with omega-3-rich nuts.",
    image: mealOatmeal,
    searchTerm: "greek yogurt",
    ingredients: [
      { name: "Greek yogurt", price: 1.75 },
      { name: "Walnuts", price: 0.6 },
      { name: "Honey", price: 0.2 },
    ],
    total: 2.55,
    instructions: [
      "Spoon yogurt into a bowl.",
      "Top with walnuts and a drizzle of honey.",
    ],
  },
];

const lunchOptions: PlanMeal[] = [
  {
    name: "Black Bean & Rice Bowl",
    description: "Plant protein over fiber-rich brown rice.",
    image: mealLentil,
    searchTerm: "black beans",
    ingredients: [
      { name: "Black beans (1 can)", price: 1.28 },
      { name: "Brown rice", price: 1.5 },
      { name: "Garlic", price: 0.98 },
      { name: "Olive oil", price: 0.5 },
    ],
    total: 4.26,
    instructions: [
      "Cook brown rice per package instructions.",
      "Sauté garlic in olive oil 2 minutes.",
      "Add beans and warm through.",
      "Serve over rice with lime.",
    ],
  },
  {
    name: "Grilled Chicken Salad",
    description: "Lean protein over leafy greens.",
    image: mealChickpea,
    searchTerm: "chicken breast",
    ingredients: [
      { name: "Chicken breast", price: 4.0 },
      { name: "Mixed greens", price: 2.0 },
      { name: "Olive oil", price: 0.5 },
    ],
    total: 6.5,
    instructions: [
      "Grill seasoned chicken 6 minutes per side.",
      "Slice over greens.",
      "Dress with olive oil and lemon.",
    ],
  },
  {
    name: "Lentil Soup",
    description: "Plant protein and fiber for blood pressure.",
    image: mealLentil,
    searchTerm: "lentils",
    ingredients: [
      { name: "Green lentils", price: 0.75 },
      { name: "Carrots", price: 0.45 },
      { name: "Spinach", price: 1.2 },
      { name: "Garlic", price: 0.3 },
    ],
    total: 2.7,
    instructions: [
      "Sauté carrots and garlic 5 minutes.",
      "Add lentils and low-sodium broth; simmer 25 min.",
      "Stir in spinach until wilted.",
    ],
  },
];

const dinnerOptions: PlanMeal[] = [
  {
    name: "Baked Salmon & Greens",
    description: "Omega-3s with leafy nitrates.",
    image: mealSalmon,
    searchTerm: "salmon",
    ingredients: [
      { name: "Salmon fillet", price: 6.0 },
      { name: "Fresh spinach", price: 2.5 },
      { name: "Lemon", price: 0.5 },
      { name: "Olive oil", price: 0.75 },
      { name: "Brown rice", price: 1.5 },
    ],
    total: 11.25,
    instructions: [
      "Preheat oven to 400°F.",
      "Season salmon with lemon, garlic, herbs.",
      "Bake 12–15 minutes until flaky.",
      "Sauté spinach in olive oil 3 minutes.",
      "Serve over brown rice.",
    ],
  },
  {
    name: "Smothered Turkey & Collard Greens",
    description: "Southern flavor, heart-healthy build.",
    image: mealChickpea,
    searchTerm: "ground turkey",
    ingredients: [
      { name: "Ground turkey", price: 5.0 },
      { name: "Collard greens", price: 2.0 },
      { name: "Onion", price: 0.75 },
      { name: "Garlic", price: 0.98 },
      { name: "Low-sodium broth", price: 1.5 },
      { name: "Brown rice", price: 1.5 },
    ],
    total: 11.73,
    instructions: [
      "Brown ground turkey in olive oil with onion and garlic.",
      "Add low-sodium broth, simmer 10 minutes.",
      "Cook collard greens in a separate pan 20 minutes.",
      "Season with apple cider vinegar and smoked paprika.",
      "Serve over brown rice.",
    ],
  },
  {
    name: "Garlic Chicken & Brown Rice",
    description: "Lean protein with fiber-rich grains.",
    image: mealChickpea,
    searchTerm: "chicken",
    ingredients: [
      { name: "Chicken breast", price: 4.0 },
      { name: "Garlic", price: 0.98 },
      { name: "Brown rice", price: 1.5 },
      { name: "Olive oil", price: 0.75 },
    ],
    total: 7.23,
    instructions: [
      "Sauté garlic in olive oil 1 minute.",
      "Add chicken; cook 6 minutes per side.",
      "Serve over brown rice.",
    ],
  },
];

const sources: Record<MealType, PlanMeal[]> = {
  breakfast: breakfastOptions,
  lunch: lunchOptions,
  dinner: dinnerOptions,
};

type Group = "family" | "individual" | "school" | "organization";
type Period = "daily" | "weekly";
type MealType = "breakfast" | "lunch" | "dinner";

const groupOptions: { value: Group; label: string }[] = [
  { value: "family", label: "Family" },
  { value: "individual", label: "Individual" },
  { value: "school", label: "School" },
  { value: "organization", label: "Organization" },
];

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const pick = (arr: PlanMeal[], i: number) => arr[i % arr.length];

const walmartUrl = (q: string) => `https://www.walmart.com/search?q=${encodeURIComponent(q)}`;

const MealPlan = () => {
  const [group, setGroup] = useState<Group>("family");
  const [budget, setBudget] = useState("100");
  const [people, setPeople] = useState("4");
  const [period, setPeriod] = useState<Period>("weekly");
  const [mealTypes, setMealTypes] = useState<MealType[]>(["breakfast", "lunch", "dinner"]);
  const [generated, setGenerated] = useState(false);
  const [open, setOpen] = useState<PlanMeal | null>(null);
  const [accountAllergies, setAccountAllergies] = useState(false);
  const [allergyTags, setAllergyTags] = useState<string[]>([]);
  const [allergyInput, setAllergyInput] = useState("");
  const [errors, setErrors] = useState<{ meals?: string; budget?: string }>({});
  const tableRef = useRef<HTMLDivElement>(null);

  // Group → People constraints
  const peopleConfig: Record<Group, { min: number; max: number; def: number; helper: string; locked?: boolean }> = {
    individual: { min: 1, max: 1, def: 1, helper: "Planning for yourself", locked: true },
    family: { min: 2, max: 10, def: 4, helper: "Enter number of family members (2–10)" },
    school: { min: 50, max: 500, def: 50, helper: "Minimum 50 students required" },
    organization: { min: 10, max: 200, def: 10, helper: "Enter total number of members (10–200)" },
  };
  const pCfg = peopleConfig[group];

  useEffect(() => {
    setPeople(String(pCfg.def));
  }, [group]); // eslint-disable-line react-hooks/exhaustive-deps

  const QUICK_ALLERGENS = ["Gluten", "Dairy", "Eggs", "Fish", "Tree Nuts", "Peanuts", "Soy"];

  const addAllergyTag = (raw: string) => {
    const t = raw.trim();
    if (!t) return;
    setAllergyTags((prev) => (prev.some((x) => x.toLowerCase() === t.toLowerCase()) ? prev : [...prev, t]));
    setAllergyInput("");
  };

  const removeAllergyTag = (t: string) =>
    setAllergyTags((prev) => prev.filter((x) => x !== t));

  const allergyTagsAsAllergens = useMemo<Allergen[]>(() => {
    const valid: Allergen[] = ["Gluten", "Dairy", "Eggs", "Fish", "Shellfish", "Tree Nuts", "Peanuts", "Soy", "Sesame"];
    return allergyTags
      .map((t) => valid.find((v) => v.toLowerCase() === t.toLowerCase()))
      .filter((x): x is Allergen => !!x);
  }, [allergyTags]);

  const isMealSafe = (m: PlanMeal): boolean => {
    if (!accountAllergies || allergyTagsAsAllergens.length === 0) return true;
    const detected = detectAllergens(m.ingredients);
    return !detected.some((a) => allergyTagsAsAllergens.includes(a));
  };

  const cols = period === "daily" ? 1 : 7;
  const colLabels = period === "daily" ? ["Today"] : days;

  const plan = useMemo(() => {
    if (!generated) return null;
    const rows: { type: MealType; cells: (PlanMeal | null)[] }[] = mealTypes.map((t) => {
      const safePool = sources[t].filter(isMealSafe);
      const offset = t === "lunch" ? 1 : t === "dinner" ? 2 : 0;
      const cells = Array.from({ length: cols }, (_, i) =>
        safePool.length === 0 ? null : safePool[(i + offset) % safePool.length]
      );
      return { type: t, cells };
    });
    return rows;
  }, [generated, mealTypes, cols, accountAllergies, allergyTagsAsAllergens]);

  const totalCost = useMemo(() => {
    if (!plan) return 0;
    const ppl = parseInt(people) || 1;
    const sum = plan.reduce((s, r) => s + r.cells.reduce((cs, m) => cs + (m?.total ?? 0), 0), 0);
    return sum * ppl;
  }, [plan, people]);

  const toggleMealType = (t: MealType) => {
    setMealTypes((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));
  };

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    const next: { meals?: string; budget?: string } = {};
    if (mealTypes.length === 0) next.meals = "Please select at least one meal type";
    const b = parseFloat(budget);
    if (!b || b <= 0) next.budget = "Budget must be greater than $0";
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    setGenerated(true);
  };

  const handleDownload = async () => {
    if (!tableRef.current) return;
    toast({ title: "Generating PDF…" });
    const canvas = await html2canvas(tableRef.current, { scale: 2, backgroundColor: "#faf7f0" });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("l", "pt", "a4");
    const w = pdf.internal.pageSize.getWidth();
    const h = (canvas.height * w) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, w, h);
    pdf.save("project-eureka-meal-plan.pdf");
  };

  const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">{label}</span>
      {children}
    </label>
  );

  const inputCls =
    "h-11 px-4 rounded-xl bg-background border border-input focus:outline-none focus:ring-2 focus:ring-ring";

  return (
    <>
      <div className="container pt-12 md:pt-16 pb-6 max-w-3xl">
        <p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-2">Meal Plan</p>
        <h1 className="font-display text-4xl md:text-5xl font-semibold mb-3">Plan a heart-healthy week</h1>
        <p className="text-muted-foreground text-lg">
          Generate a meal timetable that fits your budget, group size, and schedule.
        </p>
      </div>

      <div className="container pb-12">
        <form
          onSubmit={handleGenerate}
          className="rounded-3xl bg-card border border-border/60 shadow-soft p-6 md:p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4"
        >
          <Field label="Group">
            <select value={group} onChange={(e) => setGroup(e.target.value as Group)} className={inputCls}>
              {groupOptions.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </Field>
          <Field label="Budget">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
              <input type="number" min="0" value={budget} onChange={(e) => setBudget(e.target.value)} className={inputCls + " w-full pl-7"} />
            </div>
          </Field>
          <Field label="People">
            <input
              type="number"
              min={pCfg.min}
              max={pCfg.max}
              value={people}
              disabled={pCfg.locked}
              onChange={(e) => setPeople(e.target.value)}
              className={inputCls + (pCfg.locked ? " opacity-60 cursor-not-allowed" : "")}
            />
            <span className="text-[11px] text-muted-foreground">{pCfg.helper}</span>
          </Field>
          <Field label="Period">
            <select value={period} onChange={(e) => setPeriod(e.target.value as Period)} className={inputCls}>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
            </select>
          </Field>
          <Field label="Meals">
            <div className="flex flex-wrap gap-2 pt-1">
              {(["breakfast", "lunch", "dinner"] as MealType[]).map((t) => {
                const active = mealTypes.includes(t);
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => toggleMealType(t)}
                    className={`px-3 h-9 rounded-full text-sm font-medium border transition-colors capitalize ${
                      active
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-background border-input hover:bg-muted"
                    }`}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
            {errors.meals && <span className="text-xs text-destructive font-medium">{errors.meals}</span>}
          </Field>

          {/* Allergy account section */}
          <div className="lg:col-span-5 pt-2">
            <label className="inline-flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={accountAllergies}
                onChange={(e) => setAccountAllergies(e.target.checked)}
                className="w-4 h-4 accent-primary"
              />
              <span className="text-sm font-medium">Account for food allergies</span>
            </label>
            <div
              className={`grid transition-all duration-300 ease-out ${
                accountAllergies ? "grid-rows-[1fr] opacity-100 mt-3" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <div className="rounded-2xl border border-border/60 bg-muted/30 p-4 space-y-3">
                  <div>
                    <span className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">
                      List any allergies or dietary restrictions
                    </span>
                    <div className="mt-2 flex flex-wrap items-center gap-2 rounded-xl bg-background border border-input px-3 py-2 min-h-[48px]">
                      {allergyTags.map((t) => (
                        <span
                          key={t}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold"
                        >
                          {t}
                          <button
                            type="button"
                            onClick={() => removeAllergyTag(t)}
                            className="hover:text-destructive"
                            aria-label={`Remove ${t}`}
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                      <input
                        type="text"
                        value={allergyInput}
                        onChange={(e) => setAllergyInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === ",") {
                            e.preventDefault();
                            addAllergyTag(allergyInput);
                          } else if (e.key === "Backspace" && !allergyInput && allergyTags.length) {
                            removeAllergyTag(allergyTags[allergyTags.length - 1]);
                          }
                        }}
                        placeholder="Type an allergen and press Enter (e.g. peanuts)"
                        className="flex-1 min-w-[180px] bg-transparent outline-none text-sm"
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {QUICK_ALLERGENS.map((q) => (
                      <button
                        key={q}
                        type="button"
                        onClick={() => addAllergyTag(q)}
                        className="px-3 h-7 rounded-full border border-input bg-background hover:bg-muted text-xs font-medium"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    We'll exclude meals containing these ingredients from your plan.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {errors.budget && (
            <div className="lg:col-span-5 -mt-1">
              <span className="text-xs text-destructive font-medium">{errors.budget}</span>
            </div>
          )}

          <div className="lg:col-span-5 flex flex-wrap items-center gap-3 pt-2">
            <button type="submit" className="h-11 px-6 rounded-full bg-primary text-primary-foreground font-semibold shadow-soft hover:shadow-glow transition-shadow inline-flex items-center gap-2">
              <Sparkles className="w-4 h-4" /> Generate Plan
            </button>
            {generated && (
              <button type="button" onClick={handleDownload} className="h-11 px-6 rounded-full bg-secondary text-secondary-foreground font-semibold inline-flex items-center gap-2 hover:opacity-90">
                <Download className="w-4 h-4" /> Download PDF
              </button>
            )}
            {generated && (
              <span className="text-sm text-muted-foreground ml-auto">
                Estimated total: <strong className="text-foreground">${totalCost.toFixed(2)}</strong> · {people} {parseInt(people) === 1 ? "person" : "people"}
              </span>
            )}
          </div>
        </form>
      </div>

      {plan && (
        <div className="container pb-20">
          <div ref={tableRef} className="rounded-3xl bg-gradient-warm border border-border/60 p-6 overflow-x-auto">
            <h2 className="font-display text-2xl font-semibold mb-4 capitalize">{period} Meal Plan · {group}</h2>
            <div
              className="grid gap-3 min-w-[700px]"
              style={{ gridTemplateColumns: `120px repeat(${cols}, minmax(0, 1fr))` }}
            >
              <div />
              {colLabels.map((d) => (
                <div key={d} className="text-center text-xs uppercase tracking-wider font-semibold text-muted-foreground py-2">{d}</div>
              ))}
              {plan.map((row) => (
                <div key={row.type} className="contents">
                  <div className="flex items-center font-display capitalize text-lg font-semibold pr-2">{row.type}</div>
                  {row.cells.map((m, i) => {
                    if (!m) {
                      return (
                        <div
                          key={`${row.type}-${i}-empty`}
                          className="rounded-2xl border border-dashed p-3 text-xs flex items-start gap-2"
                          style={{ backgroundColor: "#FEF3C7", color: "#92400E", borderColor: "#FCD34D" }}
                        >
                          <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                          <span>No allergen-safe meals available for this slot — please adjust your filters.</span>
                        </div>
                      );
                    }
                    const detected = detectAllergens(m.ingredients);
                    const local = recipeHasLocal(m.ingredients);
                    return (
                      <button
                        key={`${row.type}-${i}`}
                        type="button"
                        onClick={() => setOpen(m)}
                        className="text-left rounded-2xl bg-card border border-border/60 shadow-soft hover:shadow-card hover:-translate-y-0.5 transition-all overflow-hidden group"
                      >
                        <div className="aspect-[4/3] overflow-hidden bg-muted">
                          <img src={m.image} alt={m.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        </div>
                        <div className="p-3">
                          <p className="font-medium text-sm leading-snug">
                            {m.name}
                            {local && <LocalBadge />}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1 leading-snug line-clamp-2">{m.description}</p>
                          <p className="text-xs text-primary font-semibold mt-1">~${m.total.toFixed(2)}/serving</p>
                          <AllergenInfo allergens={detected} />
                        </div>
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {open && (
        <div
          className="fixed inset-0 z-50 bg-foreground/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in-up"
          onClick={() => setOpen(null)}
        >
          <div className="relative max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setOpen(null)}
              className="absolute -top-3 -right-3 z-10 w-10 h-10 rounded-full bg-card shadow-card flex items-center justify-center hover:bg-muted"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
            <article className="rounded-2xl bg-card border border-border/60 shadow-card overflow-hidden">
              <div className="aspect-[16/9] overflow-hidden bg-muted">
                <img src={open.image} alt={open.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <h3 className="font-display text-2xl font-semibold mb-4">{open.name}</h3>
                <div className="text-xs uppercase tracking-wider text-secondary font-semibold mb-2">Core Ingredients</div>
                <ul className="space-y-1.5 mb-4">
                  {open.ingredients.map((i) => (
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
                  <span className="font-display text-lg font-semibold text-primary">~${open.total.toFixed(2)}</span>
                </div>
                <a
                  href={walmartUrl(open.searchTerm)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 h-11 px-5 rounded-full bg-primary text-primary-foreground font-semibold shadow-soft hover:shadow-glow transition-shadow mb-5"
                >
                  <ShoppingCart className="w-4 h-4" /> Shop at Walmart <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <div className="text-xs uppercase tracking-wider text-secondary font-semibold mb-2">Instructions</div>
                <ol className="space-y-2 list-decimal list-inside text-sm">
                  {open.instructions.map((step, i) => (
                    <li key={i} className="leading-relaxed">{step}</li>
                  ))}
                </ol>
                <AllergenInfo allergens={detectAllergens(open.ingredients)} />
                {recipeHasLocal(open.ingredients) && <LocalFooterNote />}
              </div>
            </article>
          </div>
        </div>
      )}
    </>
  );
};

export default MealPlan;