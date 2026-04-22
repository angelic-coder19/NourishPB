import { Meal } from "@/data/content";
import { Sparkles } from "lucide-react";

const MealCard = ({ meal }: { meal: Meal }) => {
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
        <h3 className="font-display text-xl font-semibold mb-3">{meal.name}</h3>
        <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-secondary font-semibold mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          Core Ingredients
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
};

export default MealCard;