import { NavLink, Outlet } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import StatBanner from "@/components/StatBanner";
import logoEureka from "@/assets/logo-eureka.png";

const navItems = [
  { to: "/", label: "Home", tourId: "nav-home" },
  { to: "/create", label: "Create Recipe", tourId: "nav-create" },
  { to: "/meal-plan", label: "Meal Plan", tourId: "nav-mealplan" },
  { to: "/fast-food", label: "Fast Food Cheat Sheet", tourId: "nav-fastfood" },
];

const Layout = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <StatBanner />
      <header className="sticky top-0 z-40 backdrop-blur-md bg-background/80 border-b border-border/60">
        <div className="container flex items-center justify-between h-16">
          <NavLink to="/" className="flex items-center gap-2 group">
            <span className="relative inline-flex items-center justify-center w-10 h-10">
              <img src={logoEureka} alt="Project Eureka" className="w-full h-full object-contain" />
            </span>
            <span className="font-display font-semibold text-lg leading-none">
              Project Eureka
              <span className="block text-[10px] uppercase tracking-widest text-muted-foreground font-sans font-medium mt-0.5">
                Pine Bluff Heart-Healthy
              </span>
            </span>
          </NavLink>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                data-tour={item.tourId}
                className={({ isActive }) =>
                  cn(
                    "px-4 py-2 text-sm font-medium rounded-full transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-soft"
                      : "text-foreground/80 hover:text-foreground hover:bg-muted"
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-muted"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
        {open && (
          <div className="md:hidden border-t border-border/60 bg-background">
            <nav className="container py-3 flex flex-col gap-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === "/"}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      "px-4 py-2 text-sm font-medium rounded-lg",
                      isActive ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                    )
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-border/60 mt-16 py-8 bg-muted/40">
        <div className="container text-center text-sm text-muted-foreground">
          <p className="font-display text-base text-foreground mb-1">Project Eureka · Innovation Sprint</p>
          <p>Building heart-healthy awareness in Pine Bluff, Arkansas.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;