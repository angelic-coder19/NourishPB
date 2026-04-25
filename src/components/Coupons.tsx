import { useState } from "react";
import { Copy, Scissors, Check } from "lucide-react";
import Modal from "./Modal";
import { toast } from "@/hooks/use-toast";

const STORE_LOGOS: Record<string, string> = {
  Walmart: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Walmart_spark_%282025%29.svg/1280px-Walmart_spark_%282025%29.svg.png",
  "Super 1 Foods": "https://play-lh.googleusercontent.com/YYyjR89xq7G2nqY95VTCJAvaNowo7dLADj9RBotMcrEYnyXGTV4DngQrngSYQV2y4Q",
  FoodSmart: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPUan69as9EbVcdnilcpSeiA5ErvaIx5_Lag&s",
  Walgreens: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqBfQX1bNXXVK-2w_xOvC0QNpxdoDYxGfBYQ&s",
};

type Coupon = {
  id: string;
  store: string;
  product: string;
  discount: string;
};

const COUPONS: Coupon[] = [
  { id: "c1", store: "Walmart", product: "Rolled Oats (any brand)", discount: "$0.75 off" },
  { id: "c2", store: "Walmart", product: "Canned Black Beans", discount: "Buy 2 Get 1 Free" },
  { id: "c3", store: "Super 1 Foods", product: "Fresh Salmon Fillet", discount: "$1.50 off/lb" },
  { id: "c4", store: "Super 1 Foods", product: "Fresh Spinach (bag)", discount: "$0.50 off" },
  { id: "c5", store: "FoodSmart", product: "Brown Rice (2lb bag)", discount: "$0.60 off" },
  { id: "c6", store: "Walgreens", product: "Fish Oil Supplements", discount: "20% off" },
];

const generateCode = (id: string): string => {
  const key = `eureka-coupon-${id}`;
  const existing = typeof window !== "undefined" ? localStorage.getItem(key) : null;
  if (existing) return existing;
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "HH-";
  for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)];
  if (typeof window !== "undefined") localStorage.setItem(key, code);
  return code;
};

const Coupons = () => {
  const [active, setActive] = useState<Coupon | null>(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    toast({ title: "Code copied", description: code });
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <section className="container py-16 md:py-20">
      <div className="max-w-2xl mb-10">
        <p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-2">Coupons</p>
        <h2 className="font-display text-3xl md:text-4xl font-semibold mb-2">Heart-Healthy Savings</h2>
        <p className="text-muted-foreground text-lg">
          Exclusive discounts on heart-healthy ingredients at Pine Bluff stores — activate yours below.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {COUPONS.map((c) => (
          <article
            key={c.id}
            className="relative rounded-2xl bg-card p-5 shadow-soft hover:shadow-card transition-all"
            style={{ border: "2px dashed hsl(var(--primary) / 0.4)" }}
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-start gap-2.5 min-w-0">
                {STORE_LOGOS[c.store] && (
                  <div className="w-10 h-10 rounded-lg bg-white border border-border/60 flex items-center justify-center p-1 shrink-0">
                    <img src={STORE_LOGOS[c.store]} alt={`${c.store} logo`} loading="lazy" className="max-w-full max-h-full object-contain" />
                  </div>
                )}
                <div className="min-w-0">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">{c.store}</p>
                  <p className="font-display text-lg font-semibold leading-tight mt-1">{c.product}</p>
                </div>
              </div>
              <Scissors className="w-5 h-5 text-primary/60 shrink-0" />
            </div>
            <p className="font-display text-2xl font-semibold text-primary mb-4">{c.discount}</p>
            <button
              onClick={() => setActive(c)}
              className="w-full h-10 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:shadow-glow transition-shadow"
            >
              Get Coupon
            </button>
          </article>
        ))}
      </div>

      <Modal open={!!active} onClose={() => setActive(null)} title="Your Coupon Code">
        {active && (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">{active.store}</strong> · {active.product}
              <br />
              <span className="text-primary font-semibold">{active.discount}</span>
            </p>
            <div className="rounded-xl bg-muted p-5 text-center">
              <p className="font-mono text-2xl md:text-3xl font-bold tracking-widest text-foreground">
                {generateCode(active.id)}
              </p>
            </div>
            <button
              onClick={() => handleCopy(generateCode(active.id))}
              className="w-full h-11 rounded-full bg-primary text-primary-foreground font-semibold inline-flex items-center justify-center gap-2 hover:shadow-glow transition-shadow"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? "Copied!" : "Copy Code"}
            </button>
            <p className="text-sm text-foreground">
              Show this code at checkout or mention <strong>"Project Eureka"</strong> at the register.
            </p>
            <p className="text-xs text-muted-foreground italic">
              Coupon valid upon store partnership confirmation. Present to store for activation.
            </p>
          </div>
        )}
      </Modal>
    </section>
  );
};

export default Coupons;
