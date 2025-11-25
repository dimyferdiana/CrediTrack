import React from "react";

export const cn = (...classes: (string | undefined | null | false)[]) =>
  classes.filter(Boolean).join(" ");

export const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary" | "ghost" | "danger" | "outline"; size?: "sm" | "md" | "lg" | "icon" }
>(({ className, variant = "primary", size = "md", ...props }, ref) => {
  const variants = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    danger: "bg-destructive/10 text-destructive hover:bg-destructive/20",
    outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
  };
  const sizes = {
    sm: "h-9 px-3 text-xs",
    md: "h-12 px-4 py-2",
    lg: "h-14 px-8 text-lg",
    icon: "h-10 w-10 p-0 flex items-center justify-center",
  };

  return (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center rounded-xl text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  );
});

export const Card = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("rounded-xl border bg-card text-card-foreground shadow-sm", className)} {...props} />
);

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => {
    return (
      <input
        className={cn(
          "flex h-14 w-full rounded-xl border border-input bg-secondary px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

export const Icon = ({ name, className, filled = false }: { name: string; className?: string; filled?: boolean }) => (
  <span className={cn("material-symbols-outlined select-none", filled && "filled", className)}>{name}</span>
);

export const Switch = ({ checked, onCheckedChange }: { checked: boolean; onCheckedChange: (c: boolean) => void }) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    onClick={() => onCheckedChange(!checked)}
    className={cn(
      "peer inline-flex h-[28px] w-[48px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
      checked ? "bg-primary" : "bg-input"
    )}
  >
    <span
      className={cn(
        "pointer-events-none block h-6 w-6 rounded-full bg-background shadow-lg ring-0 transition-transform",
        checked ? "translate-x-5" : "translate-x-0"
      )}
    />
  </button>
);

export const ProgressBar = ({ value, max = 100, className, colorClass = "bg-primary" }: { value: number; max?: number; className?: string; colorClass?: string }) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div className={cn("h-2 w-full overflow-hidden rounded-full bg-secondary", className)}>
      <div className={cn("h-full transition-all", colorClass)} style={{ width: `${percentage}%` }} />
    </div>
  );
};
