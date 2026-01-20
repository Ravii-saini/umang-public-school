"use client";
import { useEffect, useRef, useState } from "react";

type Props = {
  end: number | string;
  duration?: number; // in ms
  // suffix to append (e.g. "+") — functions can't be passed from server components
  suffix?: string;
  className?: string;
};

export default function AnimatedCounter({ end, duration = 1500, suffix, className }: Props) {
  const [value, setValue] = useState(0);
  const startRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  // Robustly handle string or number inputs
  const target = typeof end === "string" ? parseInt(end.replace(/\D/g, ""), 10) : end;

  useEffect(() => {
    if (isNaN(target)) return;

    const start = performance.now();
    startRef.current = start;

    function step(now: number) {
      const progress = Math.min((now - (startRef.current || start)) / duration, 1);
      const eased = progress < 0.5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress; // easeInOut
      const current = Math.round(eased * target);
      setValue(current);
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step);
      }
    }

    rafRef.current = requestAnimationFrame(step);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [target, duration]);

  if (isNaN(target)) {
    return <span className={className}>{end}{suffix}</span>;
  }

  const shown = suffix ? `${value}${suffix}` : value.toString();

  return <span className={className}>{shown}</span>;
}
