import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, GraduationCap, X } from "lucide-react";

type Step = {
  selector: string;
  title: string;
  body: string;
};

const STEPS: Step[] = [
  {
    selector: '[data-tour="hero"]',
    title: "Welcome to Project Eureka",
    body:
      "This page helps you eat in a way that protects your heart. We'll walk through each section together — take your time.",
  },
  {
    selector: '[data-tour="meals"]',
    title: "Healthy Meals",
    body:
      "These are full meals built around foods that are good for your heart. Each one shows the ingredients and how they help.",
  },
  {
    selector: '[data-tour="herbs"]',
    title: "Healthy Herbs",
    body:
      "Small spices like garlic, turmeric, and cinnamon can lower cholesterol and blood pressure. A little goes a long way.",
  },
  {
    selector: '[data-tour="fruits"]',
    title: "Healthy Fruits",
    body:
      "Fresh fruits add fiber, antioxidants, and potassium that protect your arteries. Aim for a serving every day.",
  },
  {
    selector: '[data-tour="shop"]',
    title: "Where to Shop",
    body:
      "Find these foods near you in Pine Bluff — at supermarkets, local farms, UAPB programs, and the local food bank.",
  },
  {
    selector: '[data-tour="coupons"]',
    title: "Heart-Healthy Savings",
    body:
      "Tap any coupon for a code you can show at checkout to save money on heart-healthy ingredients.",
  },
];

const TOUR_KEY = "eureka-tour-seen";

const HomeTour = () => {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [rect, setRect] = useState<DOMRect | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // Show launcher button always; auto-open once for first-time visitors
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!localStorage.getItem(TOUR_KEY)) {
      // delay to let layout settle
      const t = setTimeout(() => setOpen(true), 800);
      return () => clearTimeout(t);
    }
  }, []);

  // Measure target rect for current step
  useLayoutEffect(() => {
    if (!open) return;
    const measure = () => {
      const el = document.querySelector(STEPS[step].selector) as HTMLElement | null;
      if (!el) {
        setRect(null);
        return;
      }
      const r = el.getBoundingClientRect();
      setRect(r);
      // Scroll target into view
      const targetY = window.scrollY + r.top - 100;
      window.scrollTo({ top: targetY, behavior: "smooth" });
    };
    measure();
    const id = setTimeout(measure, 350); // remeasure after scroll settles
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", measure, { passive: true });
    return () => {
      clearTimeout(id);
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", measure);
    };
  }, [open, step]);

  // Lock body scroll when open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    // allow scroll for measurement; don't fully lock
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const close = () => {
    setOpen(false);
    setStep(0);
    if (typeof window !== "undefined") localStorage.setItem(TOUR_KEY, "1");
  };

  const next = () => {
    if (step >= STEPS.length - 1) close();
    else setStep((s) => s + 1);
  };

  const prev = () => setStep((s) => Math.max(0, s - 1));

  // Launcher button (always visible)
  const Launcher = (
    <button
      type="button"
      onClick={() => {
        setStep(0);
        setOpen(true);
      }}
      className="fixed bottom-6 right-6 z-40 inline-flex items-center gap-2 px-5 h-12 rounded-full bg-primary text-primary-foreground font-semibold shadow-glow hover:scale-105 transition-transform"
      aria-label="Start guided tour"
    >
      <GraduationCap className="w-5 h-5" />
      <span className="hidden sm:inline">Take a Tour</span>
    </button>
  );

  if (!open) return Launcher;

  const padding = 12;
  const spotlight =
    rect &&
    ({
      top: rect.top - padding,
      left: rect.left - padding,
      width: rect.width + padding * 2,
      height: rect.height + padding * 2,
    } as const);

  // Position the explanation card under (or above) the spotlight
  const cardStyle: React.CSSProperties = (() => {
    if (!rect) return { top: "50%", left: "50%", transform: "translate(-50%, -50%)" };
    const vh = window.innerHeight;
    const vw = window.innerWidth;
    const cardWidth = Math.min(420, vw - 32);
    const below = rect.bottom + 24;
    const above = rect.top - 24;
    const placeBelow = below + 220 < vh || below < vh / 2;
    const top = placeBelow ? Math.min(below, vh - 240) : Math.max(16, above - 220);
    const left = Math.min(Math.max(16, rect.left + rect.width / 2 - cardWidth / 2), vw - cardWidth - 16);
    return { top, left, width: cardWidth };
  })();

  const current = STEPS[step];

  return (
    <>
      {Launcher}
      <div className="fixed inset-0 z-50 pointer-events-none">
        {/* Dim overlay with cut-out */}
        <svg className="absolute inset-0 w-full h-full pointer-events-auto" onClick={close}>
          <defs>
            <mask id="tour-mask">
              <rect width="100%" height="100%" fill="white" />
              {spotlight && (
                <rect
                  x={spotlight.left}
                  y={spotlight.top}
                  width={spotlight.width}
                  height={spotlight.height}
                  rx={20}
                  ry={20}
                  fill="black"
                />
              )}
            </mask>
          </defs>
          <rect width="100%" height="100%" fill="rgba(0,0,0,0.65)" mask="url(#tour-mask)" />
        </svg>

        {/* Spotlight ring */}
        {spotlight && (
          <div
            className="absolute rounded-[20px] ring-4 ring-primary/80 shadow-glow pointer-events-none transition-all duration-300"
            style={{
              top: spotlight.top,
              left: spotlight.left,
              width: spotlight.width,
              height: spotlight.height,
            }}
          />
        )}

        {/* Explanation card */}
        <div
          ref={cardRef}
          className="absolute pointer-events-auto rounded-2xl bg-card border border-border shadow-card p-6 animate-fade-in-up"
          style={cardStyle}
        >
          <div className="flex items-start justify-between gap-4 mb-2">
            <p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">
              Step {step + 1} of {STEPS.length}
            </p>
            <button
              onClick={close}
              aria-label="Close tour"
              className="w-8 h-8 -mt-1 -mr-1 rounded-full bg-muted hover:bg-muted/70 flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <h3 className="font-display text-2xl font-semibold mb-2">{current.title}</h3>
          <p className="text-base text-muted-foreground leading-relaxed mb-5">{current.body}</p>

          {/* Progress dots */}
          <div className="flex items-center gap-1.5 mb-5">
            {STEPS.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all ${
                  i === step ? "w-6 bg-primary" : "w-1.5 bg-muted"
                }`}
              />
            ))}
          </div>

          <div className="flex items-center justify-between gap-2">
            <button
              onClick={close}
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Skip tour
            </button>
            <div className="flex items-center gap-2">
              <button
                onClick={prev}
                disabled={step === 0}
                className="inline-flex items-center gap-1.5 px-4 h-10 rounded-full bg-muted text-foreground text-sm font-semibold disabled:opacity-40 hover:bg-muted/70"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button
                onClick={next}
                className="inline-flex items-center gap-1.5 px-5 h-10 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:shadow-glow"
              >
                {step === STEPS.length - 1 ? "Finish" : "Next"}
                {step < STEPS.length - 1 && <ArrowRight className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeTour;