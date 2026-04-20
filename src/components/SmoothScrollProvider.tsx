"use client";

import { type ReactNode } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollSmoother from "gsap/ScrollSmoother";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

interface SmoothScrollProps {
  children: ReactNode;
}

export default function SmoothScrollProvider({ children }: SmoothScrollProps) {
  useGSAP(() => {
    if (ScrollSmoother.get()) return;

    const smoother = ScrollSmoother.create({
      smooth: 1.2,
      effects: true,
      ignoreMobileResize: true,
      normalizeScroll: true,
    });

    return () => smoother.kill();
  }, []);

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">{children}</div>
    </div>
  );
}
