import { useState } from "react";
import { MapPin, Phone, Mail, Fish, HeartHandshake } from "lucide-react";
import Modal from "./Modal";
import CategoryTag from "./CategoryTag";
import tilapiaImg from "@/assets/uapb-tilapia.jpg";
import catfishImg from "@/assets/uapb-catfish.jpg";

const UAPB_SCHOOL_LOGO =
  "https://yt3.googleusercontent.com/ytc/AIdro_kcKQIGxm-eeOJwJHYqLzKq4fYGIB4sdreWT728qe3cjA=s900-c-k-c0x00ffffff-no-rj";

const UAPB_LONOKE_LOGO =
  "https://yt3.googleusercontent.com/_ld56qLHNlFr-sjM0EuAyZioyROEjzmYcElxbFfZXH37FBk1Few_AZ1rvm_GhGUUJASp7dWO6Q=s900-c-k-c0x00ffffff-no-rj";

const TILAPIA_IMG = tilapiaImg;
const CATFISH_IMG = catfishImg;

const Tile = ({
  logo,
  logoIcon,
  name,
  subtitle,
  category,
  tip,
  onClick,
  href,
  logoBg = "bg-white",
}: {
  logo?: string;
  logoIcon?: React.ReactNode;
  name: string;
  subtitle: string;
  category: "UAPB" | "Food Bank";
  tip: string;
  onClick?: () => void;
  href?: string;
  logoBg?: string;
}) => {
  const inner = (
    <>
      <span className="absolute top-2 left-2 z-10">
        <CategoryTag category={category} />
      </span>
      <div className={`w-20 h-20 rounded-2xl ${logoBg} flex items-center justify-center shadow-soft p-3`}>
        {logo ? (
          <img src={logo} alt={`${name} logo`} loading="lazy" className="max-w-full max-h-full object-contain" />
        ) : (
          logoIcon
        )}
      </div>
      <div>
        <p className="font-semibold text-sm text-foreground">{name}</p>
        <p className="text-xs text-muted-foreground inline-flex items-center gap-1 mt-1">
          <MapPin className="w-3 h-3" /> {subtitle}
        </p>
        <p className="text-xs text-muted-foreground mt-2 leading-snug">{tip}</p>
      </div>
    </>
  );
  const cls =
    "group relative rounded-2xl bg-white/95 hover:bg-white border border-white/40 p-5 pt-9 flex flex-col items-center gap-3 text-center transition-all hover:-translate-y-1 shadow-soft hover:shadow-card";
  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {inner}
      </a>
    );
  }
  return (
    <button type="button" onClick={onClick} className={cls}>
      {inner}
    </button>
  );
};

const Contact = ({
  address,
  phone,
  email,
  fax,
  cell,
  emailHref,
}: {
  address: string;
  phone?: string;
  email?: string;
  fax?: string;
  cell?: string;
  emailHref?: string;
}) => (
  <div className="space-y-2 text-sm">
    <div className="flex items-start gap-2 text-foreground">
      <MapPin className="w-4 h-4 mt-0.5 text-success shrink-0" />
      <span>{address}</span>
    </div>
    {phone && (
      <div className="flex items-center gap-2 text-muted-foreground">
        <Phone className="w-4 h-4 text-success shrink-0" />
        <a href={`tel:${phone.replace(/[^+\d]/g, "")}`} className="hover:text-foreground">
          {phone}
        </a>
      </div>
    )}
    {cell && (
      <div className="flex items-center gap-2 text-muted-foreground">
        <Phone className="w-4 h-4 text-success shrink-0" />
        <a href={`tel:${cell.replace(/[^+\d]/g, "")}`} className="hover:text-foreground">
          Cell: {cell}
        </a>
      </div>
    )}
    {fax && (
      <div className="flex items-center gap-2 text-muted-foreground">
        <Phone className="w-4 h-4 text-success shrink-0" />
        <span>Fax: {fax}</span>
      </div>
    )}
    {email && (
      <div className="flex items-center gap-2 text-muted-foreground">
        <Mail className="w-4 h-4 text-success shrink-0" />
        <a href={`mailto:${emailHref ?? email}`} className="hover:text-foreground">
          {email}
        </a>
      </div>
    )}
  </div>
);

export const UapbAndFoodBank = () => {
  const [open, setOpen] = useState<"school" | "lonoke" | null>(null);
  return (
    <>
      <Tile
        logo={UAPB_SCHOOL_LOGO}
        name="UAPB School of Agriculture"
        subtitle="Pine Bluff, AR"
        category="UAPB"
        tip="Fresh tilapia & catfish raised by UAPB Aquaculture & Fisheries"
        onClick={() => setOpen("school")}
      />
      <Tile
        logo={UAPB_LONOKE_LOGO}
        name="UAPB Lonoke Ag Center"
        subtitle="Lonoke, AR"
        category="UAPB"
        tip="Fish health & disease research center supporting local growers"
        onClick={() => setOpen("lonoke")}
      />
      <Tile
        logoIcon={<HeartHandshake className="w-12 h-12 text-primary" />}
        logoBg="bg-primary/10"
        name="Pine Bluff Food Bank"
        subtitle="Multiple locations"
        category="Food Bank"
        tip="Free food assistance for families in Jefferson County"
        href="https://www.findhelp.org/food/food-pantry--pine-bluff-ar"
      />

      <Modal
        open={open === "school"}
        onClose={() => setOpen(null)}
        title="UAPB School of Agriculture, Fisheries & Human Sciences"
      >
        <p className="text-xs uppercase tracking-wider text-success font-semibold mb-3">Available Now · $1/lb</p>
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="rounded-xl overflow-hidden border border-border/60">
            <img src={TILAPIA_IMG} alt="Tilapia" className="w-full h-28 object-cover" />
            <div className="p-3">
              <p className="font-semibold text-sm flex items-center gap-1.5">
                <Fish className="w-4 h-4 text-success" /> Tilapia
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">Lean white fish, $1/lb</p>
            </div>
          </div>
          <div className="rounded-xl overflow-hidden border border-border/60">
            <img src={CATFISH_IMG} alt="Catfish" className="w-full h-28 object-cover" />
            <div className="p-3">
              <p className="font-semibold text-sm flex items-center gap-1.5">
                <Fish className="w-4 h-4 text-success" /> Catfish
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">Locally raised, $1/lb</p>
            </div>
          </div>
        </div>
        <div className="pt-4 border-t border-border/60">
          <Contact
            address="University of Arkansas at Pine Bluff, 1200 N University Dr, Pine Bluff, AR 71601"
            phone="(870) 575-8528"
            email="pondmanagement@uapb.edu"
          />
        </div>
      </Modal>

      <Modal
        open={open === "lonoke"}
        onClose={() => setOpen(null)}
        title="UAPB Lonoke Agricultural Center"
      >
        <p className="text-xs uppercase tracking-wider text-success font-semibold mb-3">
          Fish Health & Disease Diagnostic Lab
        </p>
        <div className="space-y-5">
          <div className="rounded-xl bg-muted/40 p-4">
            <p className="font-semibold text-sm mb-1 text-primary">Dr. Grace Ramena</p>
            <p className="text-xs text-muted-foreground mb-3">
              Fish Pathology, Assistant Professor · Director, Fish Health and Disease Diagnostic Lab
            </p>
            <Contact
              address="2001 Highway 70 East, Lonoke, AR 72086"
              phone="(501) 676-3124"
              cell="(773) 383-9037"
              fax="(870) 575-4638"
              email="ramenag@uapb.edu"
            />
          </div>
          <div className="rounded-xl bg-muted/40 p-4">
            <p className="font-semibold text-sm mb-1 text-primary">Ms. Tiffany Schafer</p>
            <p className="text-xs text-muted-foreground mb-3">Administrative Specialist II</p>
            <Contact
              address="2001 Highway 70 East, Lonoke, AR 72086"
              phone="(501) 676-3124"
              email="tschafer@uaex.edu"
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default UapbAndFoodBank;