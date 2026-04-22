import { Meal } from "@/data/content";
import { ChefHat, DollarSign, Sparkles } from "lucide-react";

const RecipeDetailCard = ({ meal }: { meal: Meal }) => {
  const total = meal.ingredients.reduce((s, i) => s + (i.price ?? 0), 0);
  return (
    <article className="rounded-2xl bg-card overflow-hidden shadow-card border border-border/60 animate-scale-in">
      <div className="grid md:grid-cols-2 gap-0">
        <div className="aspect-[4/3] md:aspect-auto bg-muted overflow-hidden">
          <img src={meal.image} alt={meal.name} loading="lazy" className="w-full h-full object-cover" />
        </div>
        <div className="p-6 space-y-5">
          <div>
            <h3 className="font-display text-2xl font-semibold">{meal.name}</h3>
            <div className="inline-flex items-center gap-1.5 mt-2 text-sm font-medium text-success">
              <DollarSign className="w-4 h-4" />
              Estimated total: ${total.toFixed(2)}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-secondary font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" /> Core Ingredients
            </div>
            <ul className="space-y-2">
              {meal.ingredients.map((ing) => (
                <li key={ing.name} className="text-sm flex items-start justify-between gap-3">
                  <div>
                    <span className="font-medium">{ing.name}</span>
                    <span className="text-muted-foreground"> — {ing.effect}</span>
                  </div>
                  {ing.price !== undefined && (
                    <span className="shrink-0 text-xs font-mono px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                      ${ing.price.toFixed(2)}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-secondary font-semibold mb-2">
              <ChefHat className="w-3.5 h-3.5" /> Instructions
            </div>
            <ol className="space-y-1.5 text-sm list-decimal list-inside marker:text-primary marker:font-semibold">
              {meal.instructions.map((s) => <li key={s}>{s}</li>)}
            </ol>
          </div>
        </div>
      </div>
    </article>
  );
};

export default RecipeDetailCard;