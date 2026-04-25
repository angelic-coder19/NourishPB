import { useState } from "react";
import { Leaf, Sprout, Tractor } from "lucide-react";
import Modal from "./Modal";

type Produce = { name: string; effect: string };

const lillys: Produce[] = [
  { name: "Collard Greens", effect: "Rich in vitamin K, supports artery health" },
  { name: "Tomatoes", effect: "Lycopene reduces LDL oxidation" },
  { name: "Carrots", effect: "Beta-carotene reduces oxidative stress" },
  { name: "Parsley", effect: "Flavonoids support blood pressure regulation" },
  { name: "Basil", effect: "Anti-inflammatory compounds protect vessel walls" },
  { name: "Thyme", effect: "Antioxidants reduce cardiovascular inflammation" },
];

const farmerJoes: Produce[] = [
  { name: "Beetroot", effect: "Nitrates lower blood pressure naturally" },
  { name: "Sweet Potatoes", effect: "Potassium and fiber support heart function" },
  { name: "Broccoli", effect: "Sulforaphane reduces arterial inflammation" },
  { name: "Ginger", effect: "Lowers triglycerides and blood pressure" },
  { name: "Cayenne Pepper", effect: "Capsaicin improves circulation" },
  { name: "Green Tea", effect: "Catechins reduce LDL cholesterol" },
];

const ProduceList = ({ items }: { items: Produce[] }) => (
  <ul className="space-y-2.5">
    {items.map((p) => (
      <li key={p.name} className="flex items-start gap-2.5 text-sm">
        <Leaf className="w-4 h-4 mt-0.5 text-success shrink-0" />
        <span>
          <span className="font-semibold text-foreground">{p.name}</span>
          <span className="text-muted-foreground"> — {p.effect}</span>
        </span>
      </li>
    ))}
  </ul>
);

const FarmCard = ({
  icon,
  name,
  tip,
  onClick,
}: {
  icon: React.ReactNode;
  name: string;
  tip: string;
  onClick: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    className="group rounded-2xl bg-white/95 hover:bg-white border border-success/20 p-5 flex flex-col items-center gap-3 text-center transition-all hover:-translate-y-1 shadow-soft hover:shadow-card"
  >
    <div className="w-20 h-20 rounded-2xl bg-success/10 flex items-center justify-center text-success">
      {icon}
    </div>
    <div>
      <p className="font-semibold text-sm text-foreground">{name}</p>
      <p className="text-xs text-muted-foreground inline-flex items-center gap-1 mt-1">
        Local Farm · Pine Bluff, AR
      </p>
      <span className="inline-flex items-center gap-1 mt-2 px-2 py-0.5 rounded-full bg-success/15 text-success text-[10px] font-semibold">
        Locally Grown 🌱
      </span>
      <p className="text-xs text-muted-foreground mt-2 leading-snug">{tip}</p>
    </div>
  </button>
);

export const LocalFarms = () => {
  const [open, setOpen] = useState<"lillys" | "joe" | null>(null);
  return (
    <>
      <FarmCard
        icon={<Sprout className="w-10 h-10" />}
        name="Lilly's Garden"
        tip="Fresh-picked produce direct from a Pine Bluff garden"
        onClick={() => setOpen("lillys")}
      />
      <FarmCard
        icon={<Tractor className="w-10 h-10" />}
        name="Farmer Joe's Greens"
        tip="Root vegetables and specialty produce grown in Jefferson County"
        onClick={() => setOpen("joe")}
      />
      <Modal
        open={open === "lillys"}
        onClose={() => setOpen(null)}
        title="Available at Lilly's Garden"
      >
        <ProduceList items={lillys} />
      </Modal>
      <Modal
        open={open === "joe"}
        onClose={() => setOpen(null)}
        title="Available at Farmer Joe's Greens"
      >
        <ProduceList items={farmerJoes} />
      </Modal>
    </>
  );
};

export default LocalFarms;
