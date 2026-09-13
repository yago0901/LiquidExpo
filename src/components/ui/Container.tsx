import { cn } from "@/lib/utils";

type ContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  narrow?: boolean;
};

export function Container({ className, narrow, ...props }: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-6 sm:px-8 lg:px-12",
        narrow ? "max-w-3xl" : "max-w-7xl",
        className,
      )}
      {...props}
    />
  );
}
