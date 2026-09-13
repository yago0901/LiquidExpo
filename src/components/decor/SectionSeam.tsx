export function SectionSeam({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative z-20 h-0" aria-hidden="true">
      {children}
    </div>
  );
}
