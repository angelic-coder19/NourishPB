import { Link } from "react-router-dom";
import { ArrowRight, Heart, MapPin } from "lucide-react";
import heroImg from "@/assets/hero-foods.jpg";
import { meals, herbs, fruits, stores } from "@/data/content";
import MealCard from "@/components/MealCard";
import HerbCard from "@/components/HerbCard";
import LocalFarms from "@/components/LocalFarms";
import Coupons from "@/components/Coupons";

const Section = ({
  eyebrow,
  title,
  subtitle,
  children,
  id,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  id?: string;
}) => (
  <section id={id} className="container py-16 md:py-20">
    <div className="max-w-2xl mb-10">
      <p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-2">{eyebrow}</p>
      <h2 className="font-display text-3xl md:text-4xl font-semibold mb-2">{title}</h2>
      {subtitle && <p className="text-muted-foreground text-lg">{subtitle}</p>}
    </div>
    {children}
  </section>
);

const Index = () => {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImg} alt="Heart-healthy foods" width={1600} height={1024} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-hero" />
        </div>
        <div className="relative container py-24 md:py-32 text-primary-foreground">
          <div className="max-w-2xl animate-fade-in-up">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-foreground/15 backdrop-blur text-xs font-medium uppercase tracking-widest mb-6">
              <Heart className="w-3.5 h-3.5 fill-current" /> Pine Bluff · Innovation Sprint
            </span>
            <h1 className="font-display text-4xl md:text-6xl font-semibold leading-[1.05] mb-5">
              Eat for your heart. <br />
              <span className="italic">One meal at a time.</span>
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 max-w-xl">
              Heart disease causes <strong>1 in 4</strong> deaths in Arkansas — and the foods on your plate are
              the most powerful medicine you have.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/create"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary-foreground text-primary font-semibold shadow-glow hover:scale-105 transition-transform"
              >
                Build a recipe <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/meal-plan"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary-foreground/10 backdrop-blur border border-primary-foreground/30 text-primary-foreground font-semibold hover:bg-primary-foreground/20 transition-colors"
              >
                Plan your week
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Section
        eyebrow="Healthy Meals"
        title="Meals that love your heart back"
        subtitle="Each meal is built around ingredients clinically shown to lower cardiovascular risk."
      >
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {meals.map((m) => <MealCard key={m.id} meal={m} />)}
        </div>
      </Section>

      <div className="bg-gradient-warm">
        <Section
          eyebrow="Healthy Herbs"
          title="Small spice, big protection"
          subtitle="Herbs and spices are some of the most concentrated heart-protective foods on earth."
        >
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {herbs.map((h) => <HerbCard key={h.id} item={h} />)}
          </div>
        </Section>
      </div>

      <Section
        eyebrow="Healthy Fruits"
        title="Nature's heart medicine"
        subtitle="Whole fruits deliver fiber, antioxidants, and potassium your arteries crave."
      >
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {fruits.map((f) => <HerbCard key={f.id} item={f} />)}
        </div>
      </Section>

      <div
        className="relative bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, hsl(var(--success) / 0.85), hsl(var(--success) / 0.75)), url('https://www.salon.com/app/uploads/2021/08/farmers-market-produce-0812211.jpg')",
        }}
      >
        <section id="shop" className="container py-16 md:py-20 text-white">
          <div className="max-w-2xl mb-10">
            <p className="text-xs uppercase tracking-[0.2em] text-white/90 font-semibold mb-2">Where to Shop</p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold mb-2 text-white drop-shadow">
              Find these foods in Pine Bluff
            </h2>
            <p className="text-white/90 text-lg">
              Local stores and farms stocking the ingredients you need to start eating heart-smart today.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {stores.map((store) => (
              <a
                key={store.name}
                href={store.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-2xl bg-white/95 hover:bg-white border border-white/40 p-5 flex flex-col items-center gap-3 text-center transition-all hover:-translate-y-1 shadow-soft hover:shadow-card"
              >
                <div className="w-20 h-20 rounded-2xl bg-white flex items-center justify-center shadow-soft p-3">
                  <img src={store.logo} alt={`${store.name} logo`} loading="lazy" className="max-w-full max-h-full object-contain" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-foreground">{store.name}</p>
                  <p className="text-xs text-muted-foreground inline-flex items-center gap-1 mt-1">
                    <MapPin className="w-3 h-3" /> Pine Bluff, AR
                  </p>
                  <p className="text-xs text-muted-foreground mt-2 leading-snug">{store.tip}</p>
                </div>
              </a>
            ))}
            <LocalFarms />
          </div>
        </section>
      </div>

      <Coupons />
    </>
  );
};

export default Index;
