"use client";

import { createContext, useContext, useEffect, useLayoutEffect, useRef, useState } from "react";

type HeaderVariant = "solid" | "onLight" | "onDark";

type HeaderThemeContextValue = {
  variant: HeaderVariant;
  setVariant: (variant: HeaderVariant) => void;
};

const HeaderThemeContext = createContext<HeaderThemeContextValue | null>(null);

export function HeaderThemeProvider({ children }: { children: React.ReactNode }) {
  const [variant, setVariant] = useState<HeaderVariant>("solid");

  return (
    <HeaderThemeContext.Provider value={{ variant, setVariant }}>
      {children}
    </HeaderThemeContext.Provider>
  );
}

export function useHeaderTheme() {
  const ctx = useContext(HeaderThemeContext);
  if (!ctx) {
    throw new Error("useHeaderTheme must be used within HeaderThemeProvider");
  }
  return ctx;
}

export function useSetHeaderVariant(variant: HeaderVariant) {
  const { setVariant } = useHeaderTheme();

  useLayoutEffect(() => {
    setVariant(variant);
    return () => setVariant("solid");
  }, [variant, setVariant]);
}

export function useSectionHeaderVariant<T extends HTMLElement>(variant: HeaderVariant) {
  const ref = useRef<T | null>(null);
  const { setVariant } = useHeaderTheme();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVariant(variant);
      },
      { rootMargin: "-65px 0px -80% 0px", threshold: 0 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [variant, setVariant]);

  return ref;
}
