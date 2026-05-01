import { Meal } from "@/data/content";
import { Sparkles, ShoppingCart, ExternalLink, Flame } from "lucide-react";
import { detectAllergens, isLocalIngredient, recipeHasLocal } from "@/lib/allergens";
import AllergenInfo from "./AllergenInfo";
import { LocalBadge, LocalFooterNote } from "./LocalBadge";

const walmartUrl = (q: string) => `https://www.walmart.com/search?q=${encodeURIComponent(q)}`;
const shortName = (name: string) => name.split(/[(,]/)[0].trim();

const MealCard = ({ meal }: { meal: Meal }) => {
  const allergens = detectAllergens(meal.ingredients);
  const hasLocal = recipeHasLocal(meal.ingredients);
  return (
    <article className="group rounded-2xl bg-card overflow-hidden shadow-soft hover:shadow-card transition-all duration-300 hover:-translate-y-1 border border-border/60">
      <div className="aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={meal.image}
          alt={meal.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="font-display text-xl font-semibold">{meal.name}</h3>
          <span className="shrink-0 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-success/10 text-success text-xs font-semibold">
            <Flame className="w-3 h-3" /> {meal.calories} cal
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-secondary font-semibold mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          Core Ingredients
        </div>
        <ul className="space-y-2">
          {meal.ingredients.map((ing) => (
            <li key={ing.name} className="text-sm">
              <span className="font-medium text-foreground">{ing.name}</span>
              {isLocalIngredient(ing.name) && <LocalBadge />}
              <span className="text-muted-foreground"> — {ing.effect}</span>
            </li>
          ))}
        </ul>

        <div className="mt-5 pt-4 border-t border-border/60">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-primary font-semibold mb-2">
            <ShoppingCart className="w-3.5 h-3.5" />
            Shop These Ingredients
          </div>
          <div className="flex flex-wrap gap-2">
            {meal.ingredients.map((ing) => {
              const q = shortName(ing.name);
              return (
                <a
                  key={ing.name}
                  href={walmartUrl(q)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-muted text-xs font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  {q}
                  <ExternalLink className="w-3 h-3" />
                </a>
              );
            })}
          </div>
        </div>
        <AllergenInfo allergens={allergens} />
        {hasLocal && <LocalFooterNote />}
      </div>
    </article>
  );
};

export default MealCard;