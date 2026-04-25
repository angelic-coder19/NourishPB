import { X } from "lucide-react";
import { useEffect } from "react";

const Modal = ({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) => {
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 bg-foreground/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in-up"
      onClick={onClose}
    >
      <div
        className="relative max-w-lg w-full max-h-[90vh] overflow-y-auto rounded-2xl bg-card border border-border/60 shadow-card"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-muted flex items-center justify-center hover:bg-muted/70"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>
        <div className="p-6 pr-14">
          <h3 className="font-display text-2xl font-semibold mb-4">{title}</h3>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
