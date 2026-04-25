import { LeafyGreen } from "lucide-react";

export const LocalBadge = () => (
  <span className="inline-flex items-center gap-1 ml-1.5 px-1.5 py-0.5 rounded-full bg-success/15 text-success text-[10px] font-semibold align-middle">
    <LeafyGreen className="w-3 h-3" />
    Local
  </span>
);

export const LocalFooterNote = () => null;

export default LocalBadge;
