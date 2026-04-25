import { AlertTriangle } from "lucide-react";
import { Allergen } from "@/lib/allergens";

const AllergenInfo = ({ allergens }: { allergens: Allergen[] }) => {
  if (allergens.length === 0) return null;
  return (
    <div
      className="mt-3 flex items-start gap-2 rounded-lg px-3 py-2 text-xs font-medium"
      style={{ backgroundColor: "#FEF3C7", color: "#92400E" }}
    >
      <AlertTriangle className="w-3.5 h-3.5 mt-0.5 shrink-0" />
      <span>
        <strong>Contains:</strong> {allergens.join(", ")}
      </span>
    </div>
  );
};

export default AllergenInfo;
