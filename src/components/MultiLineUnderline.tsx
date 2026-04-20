// components/MultiLineUnderline.tsx
"use client";
import * as React from "react";

type LineRect = { left: number; top: number; width: number };

export default function MultiLineUnderline({
  children,
  color = "currentColor",
  thickness = 1,
  gap = 6, // distance from text baseline
  duration = 500, // ms for each line to fill
  delay = 150, // ms between lines (stagger)
  rtl = false, // set true for RTL text
  className = "",
}: {
  children: React.ReactNode;
  color?: string;
  thickness?: number;
  gap?: number;
  duration?: number;
  delay?: number;
  rtl?: boolean;
  className?: string;
}) {
  const wrapperRef = React.useRef<HTMLSpanElement | null>(null);
  const [lines, setLines] = React.useState<LineRect[]>([]);

  const measure = React.useCallback(() => {
    const el = wrapperRef.current;
    if (!el) return;
    // Use a Range to get one rect per visual line
    const range = document.createRange();
    range.selectNodeContents(el);
    const clientRects = Array.from(range.getClientRects());

    const hostRect = el.getBoundingClientRect();
    const next: LineRect[] = clientRects.map((r) => ({
      left: r.left - hostRect.left,
      top: r.bottom - hostRect.top + gap, // place slightly below text
      width: r.width,
    }));
    setLines(next);
  }, [gap]);

  React.useEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (wrapperRef.current) ro.observe(wrapperRef.current);
    const onResize = () => measure();
    window.addEventListener("resize", onResize);
    window.addEventListener("load", onResize);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("load", onResize);
    };
  }, [measure]);

  return (
    <span
      className={`relative inline-block leading-tight group/underline ${className}`}
      ref={wrapperRef}
      // Direction hint helps accurate line wrapping for RTL
      dir={rtl ? "rtl" : "ltr"}
    >
      {/* The actual text */}
      <span>{children}</span>

      {/* One underline per visual line, stagger-filled */}
      {lines.map((ln, i) => (
        <span
          key={i}
          className="pointer-events-none absolute block origin-left scale-x-0 group-hover/underline:scale-x-100 -mt-2"
          style={{
            left: rtl ? undefined : ln.left,
            right: rtl ? ln.left : undefined, // mirror if rtl
            top: ln.top,
            height: thickness,
            width: ln.width,
            backgroundColor: color,
            transitionProperty: "transform",
            transitionDuration: `${duration}ms`,
            transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)",
            transitionDelay: `${i * delay}ms`,
            transformOrigin: rtl ? ("right" as const) : "left",
          }}
        />
      ))}
    </span>
  );
}
