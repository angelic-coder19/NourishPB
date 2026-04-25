type Category = "Supermarket" | "Local Farm" | "UAPB" | "Food Bank";

const STYLES: Record<Category, string> = {
  Supermarket: "bg-primary/10 text-primary",
  "Local Farm": "bg-success/15 text-success",
  UAPB: "bg-secondary/15 text-secondary",
  "Food Bank": "bg-accent/20 text-accent-foreground",
};

const CategoryTag = ({ category }: { category: Category }) => (
  <span
    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider ${STYLES[category]}`}
  >
    {category}
  </span>
);

export default CategoryTag;