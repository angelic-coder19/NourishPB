import { useState } from "react";
import { Heart } from "lucide-react";
import { fastFoodItems, FastFoodItem } from "@/data/content";

const HeartRating = ({ value }: { value: number }) => (
  <div className="inline-flex items-center gap-0.5" title={`${value} of 5 hearts`}>
    {Array.from({ length: 5 }).map((_, i) => (
      <Heart
        key={i}
        className={`w-4 h-4 ${i < value ? "fill-primary text-primary" : "text-muted-foreground/40"}`}
      />
    ))}
  </div>
);

const FFCard = ({ item }: { item: FastFoodItem }) => (
  <article className="rounded-2xl bg-card border border-border/60 shadow-soft hover:shadow-card transition-all duration-300 hover:-translate-y-1 overflow-hidden group">
    <div className="relative aspect-[16/9] overflow-hidden bg-muted">
      <img src={item.image} alt={item.meal} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      <div className={`absolute top-3 left-3 w-11 h-11 rounded-full ${item.brandColor} text-white font-display font-bold text-lg flex items-center justify-center shadow-card border-2 border-white`}>
        {item.initials}
      </div>
      <div className="absolute top-3 right-3 px-3 py-1.5 rounded-full bg-card/95 backdrop-blur shadow-soft">
        <HeartRating value={item.hearts} />
      </div>
    </div>
    <div className="p-5">
      <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">{item.restaurant}</p>
      <h3 className="font-display text-lg font-semibold mt-1 mb-3">{item.meal}</h3>
      <ul className="space-y-1.5 text-sm">
        {item.ingredients.map((ing) => (
          <li key={ing.name} className="flex gap-2">
            <span className="text-primary mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
            <span>
              <span className="font-medium">{ing.name}</span>
              <span className="text-muted-foreground"> — {ing.effect}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  </article>
);

const PAGE_SIZE = 5;

const FastFood = () => {
  const [count, setCount] = useState(PAGE_SIZE);
  const visible = fastFoodItems.slice(0, count);
  const hasMore = count < fastFoodItems.length;

  return (
    <>
      <section className="container pt-12 md:pt-20 pb-6 text-center max-w-4xl mx-auto">
        <p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-3">Fast Food Cheat Sheet</p>
        <h1 className="font-display text-4xl md:text-6xl font-semibold leading-tight mb-4">
          Healthy choices from your{" "}
          <span className="italic text-primary">unhealthy vices</span>
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          The smartest picks from Pine Bluff's drive-thrus — rated by how kindly they treat your heart.
        </p>
      </section>

      <section className="container py-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible.map((it) => <FFCard key={it.id} item={it} />)}
        </div>

        {hasMore && (
          <div className="flex justify-center mt-10">
            <button
              onClick={() => setCount((c) => c + PAGE_SIZE)}
              className="h-12 px-8 rounded-full bg-primary text-primary-foreground font-semibold shadow-soft hover:shadow-glow transition-shadow"
            >
              Load more
            </button>
          </div>
        )}
      </section>
    </>
  );
};

export default FastFood;