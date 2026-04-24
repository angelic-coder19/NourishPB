import { useMemo, useRef, useState } from "react";
import { Download, Sparkles, X, ShoppingCart, ExternalLink } from "lucide-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { toast } from "@/hooks/use-toast";
import mealOatmeal from "@/assets/meal-oatmeal.jpg";
import mealLentil from "@/assets/meal-lentil.jpg";
import mealSalmon from "@/assets/meal-salmon.jpg";
import mealChickpea from "@/assets/meal-chickpea.jpg";

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
  const tableRef = useRef<HTMLDivElement>(null);

  const cols = period === "daily" ? 1 : 7;
  const colLabels = period === "daily" ? ["Today"] : days;

  const plan = useMemo(() => {
    if (!generated) return null;
    const rows: { type: MealType; cells: PlanMeal[] }[] = mealTypes.map((t) => ({
      type: t,
      cells: Array.from({ length: cols }, (_, i) => pick(sources[t], i + (t === "lunch" ? 1 : t === "dinner" ? 2 : 0))),
    }));
    return rows;
  }, [generated, mealTypes, cols]);

  const totalCost = useMemo(() => {
    if (!plan) return 0;
    const ppl = parseInt(people) || 1;
    const sum = plan.reduce((s, r) => s + r.cells.reduce((cs, m) => cs + m.total, 0), 0);
    return sum * ppl;
  }, [plan, people]);

  const toggleMealType = (t: MealType) => {
    setMealTypes((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));
  };

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (mealTypes.length === 0) {
      toast({ title: "Select at least one meal", description: "Pick breakfast, lunch, or dinner." });
      return;
    }
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
            <input type="number" min="1" value={people} onChange={(e) => setPeople(e.target.value)} className={inputCls} />
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
          </Field>

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
                  {row.cells.map((m, i) => (
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
                        <p className="font-medium text-sm leading-snug">{m.name}</p>
                        <p className="text-xs text-muted-foreground mt-1">${m.cost.toFixed(2)}/serving</p>
                      </div>
                    </button>
                  ))}
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
          <div className="relative max-w-3xl w-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setOpen(null)}
              className="absolute -top-3 -right-3 z-10 w-10 h-10 rounded-full bg-card shadow-card flex items-center justify-center hover:bg-muted"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
            <RecipeDetailCard meal={open} />
          </div>
        </div>
      )}
    </>
  );
};

export default MealPlan;