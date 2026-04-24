import { useState } from "react";
import { X } from "lucide-react";

const StatBanner = () => {
  const [open, setOpen] = useState(true);
  if (!open) return null;
  return (
    <div className="bg-[hsl(0_70%_25%)] text-white text-xs sm:text-sm">
      <div className="container flex items-center gap-3 py-2">
        <p className="flex-1 text-center leading-snug">
          Heart disease causes <strong>1 in 4</strong> deaths in Arkansas — and Jefferson County's Black community faces <strong>2.5×</strong> the risk.
        </p>
        <button
          onClick={() => setOpen(false)}
          aria-label="Dismiss banner"
          className="shrink-0 p-1 rounded-full hover:bg-white/15 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default StatBanner;