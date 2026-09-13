import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonStyles = cva(
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-4 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-ink text-void hover:bg-accent hover:text-ink",
        secondary: "border border-line text-ink hover:border-accent hover:text-accent",
        ghost: "text-mist hover:text-ink underline-offset-4 hover:underline",
      },
      size: {
        md: "px-6 py-3 text-sm",
        lg: "px-8 py-4 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

type ButtonProps = VariantProps<typeof buttonStyles> & {
  className?: string;
  children: React.ReactNode;
} & (
    | ({ href: string } & React.AnchorHTMLAttributes<HTMLAnchorElement>)
    | ({ href?: undefined } & React.ButtonHTMLAttributes<HTMLButtonElement>)
  );

export function Button({
  variant,
  size,
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(buttonStyles({ variant, size }), className);

  if ("href" in props && props.href) {
    return (
      <a className={classes} {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    );
  }

  return (
    <button
      className={classes}
      {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}
