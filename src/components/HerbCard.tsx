import { Card2 } from "@/data/content";

const HerbCard = ({ item }: { item: Card2 }) => (
  <article className="group rounded-2xl bg-card overflow-hidden shadow-soft hover:shadow-card transition-all duration-300 hover:-translate-y-1 border border-border/60">
    <div className="aspect-square overflow-hidden bg-muted">
      <img
        src={item.image}
        alt={item.name}
        loading="lazy"
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
    </div>
    <div className="p-5 space-y-4">
      <h3 className="font-display text-xl font-semibold">{item.name}</h3>
      <div>
        <p className="font-semibold text-sm text-secondary mb-1">What it does</p>
        <ul className="space-y-1 text-sm text-muted-foreground list-disc list-inside marker:text-primary">
          {item.whatItDoes.map((t) => <li key={t}>{t}</li>)}
        </ul>
      </div>
      <div>
        <p className="font-semibold text-sm text-secondary mb-1">How to take it</p>
        <ul className="space-y-1 text-sm text-muted-foreground list-disc list-inside marker:text-accent">
          {item.howToTake.map((t) => <li key={t}>{t}</li>)}
        </ul>
      </div>
    </div>
  </article>
);

export default HerbCard;