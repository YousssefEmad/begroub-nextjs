/* eslint-disable @typescript-eslint/no-explicit-any */
// app/components/SplitText.tsx
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText as GSAPSplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, GSAPSplitText, useGSAP);

export interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string | ((t: number) => number);
  splitType?: "chars" | "words" | "lines" | "words, chars";
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  threshold?: number;
  rootMargin?: string;
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
  textAlign?: React.CSSProperties["textAlign"];
  onLetterAnimationComplete?: () => void;
  /** keeps text invisible until the GSAP tween actually starts */
  initialHidden?: boolean;
}

const SplitText: React.FC<SplitTextProps> = ({
  text,
  className = "",
  delay = 100,
  duration = 0.6,
  ease = "power3.out",
  splitType = "chars",
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = "-100px",
  tag = "p",
  textAlign = "center",
  onLetterAnimationComplete,
  initialHidden = true,
}) => {
  const ref = useRef<HTMLElement>(null);
  const animationCompletedRef = useRef(false);
  const [fontsLoaded, setFontsLoaded] = useState<boolean>(false);
  useEffect(() => {
    if ((document as any).fonts?.status === "loaded") {
      setFontsLoaded(true);
    } else {
      (document as any).fonts?.ready.then(() => setFontsLoaded(true));
    }
  }, []);

  useGSAP(
    () => {
      if (!ref.current || !text || !fontsLoaded) return;
      const el = ref.current as HTMLElement & {
        _rbsplitInstance?: GSAPSplitText;
      };

      // Clean any previous split
      if (el._rbsplitInstance) {
        try {
          el._rbsplitInstance.revert();
        } catch {}
        el._rbsplitInstance = undefined;
      }

      // Prevent flash of unstyled text; also set inline in render for first paint
      if (initialHidden) el.style.visibility = "hidden";

      // Compute ScrollTrigger start
      const startPct = (1 - threshold) * 100;
      const marginMatch = /^(-?\d+(?:\.\d+)?)(px|em|rem|%)?$/.exec(rootMargin);
      const marginValue = marginMatch ? parseFloat(marginMatch[1]) : 0;
      const marginUnit = marginMatch ? marginMatch[2] || "px" : "px";
      const sign =
        marginValue === 0
          ? ""
          : marginValue < 0
          ? `-=${Math.abs(marginValue)}${marginUnit}`
          : `+=${marginValue}${marginUnit}`;
      const start = `top ${startPct}%${sign}`;

      let targets: Element[] = [];
      const assignTargets = (self: GSAPSplitText) => {
        if (splitType.includes("chars") && self.chars?.length)
          targets = self.chars;
        if (!targets.length && splitType.includes("words") && self.words.length)
          targets = self.words;
        if (!targets.length && splitType.includes("lines") && self.lines.length)
          targets = self.lines;
        if (!targets.length) targets = self.chars || self.words || self.lines;
      };

      const splitInstance = new GSAPSplitText(el, {
        type: splitType,
        smartWrap: true,
        autoSplit: splitType === "lines",
        linesClass: "split-line",
        wordsClass: "split-word",
        charsClass: "split-char",
        reduceWhiteSpace: false,
        onSplit: (self: GSAPSplitText) => {
          assignTargets(self);

          targets.forEach((el) => {
            el.classList.add(
              "bg-clip-text",
              "text-transparent",
              "bg-gradient-to-b",
              "from-orange-300",
              "to-[#F18A1D]"
            );
          });

          // Ensure children start in "from" state before revealing parent
          if (initialHidden) {
            gsap.set(targets, {
              ...from,
              force3D: true,
              willChange: "transform, opacity",
            });
          }

          return gsap.fromTo(
            targets,
            { ...from, force3D: true, willChange: "transform, opacity" },
            {
              ...to,
              duration: tag === "p" ? 0.6 : duration, // Apply faster duration for paragraph elements
              ease,
              stagger: 0.05, // Reduce stagger time (optional for faster effect)
              scrollTrigger: {
                trigger: el,
                start,
                once: true,
                fastScrollEnd: true,
                anticipatePin: 0.4,
                onEnter: () => {
                  if (initialHidden) el.style.visibility = "visible";
                },
                onEnterBack: () => {
                  if (initialHidden) el.style.visibility = "visible";
                },
              },
              onStart: () => {
                if (initialHidden) el.style.visibility = "visible";
              },
              onComplete: () => {
                animationCompletedRef.current = true;
                onLetterAnimationComplete?.();
              },
            }
          );
        },
      });

      el._rbsplitInstance = splitInstance;

      return () => {
        ScrollTrigger.getAll().forEach((st) => {
          if (st.trigger === el) st.kill();
        });
        try {
          splitInstance.revert();
        } catch {}
        el._rbsplitInstance = undefined;
        if (initialHidden) el.style.visibility = "";
      };
    },
    {
      dependencies: [
        text,
        delay,
        duration,
        ease,
        splitType,
        JSON.stringify(from),
        JSON.stringify(to),
        threshold,
        rootMargin,
        fontsLoaded,
        onLetterAnimationComplete,
        initialHidden,
      ],
      scope: ref,
    }
  );

  const renderTag = () => {
    const style: React.CSSProperties = {
      textAlign,
      wordWrap: "break-word",
      willChange: "transform, opacity",
      visibility: initialHidden ? "hidden" : undefined,
    };
    const classes = `split-parent overflow-hidden inline-block whitespace-normal ${className}`;

    switch (tag) {
      case "h1":
        return (
          <h1 ref={ref as any} style={style} className={classes}>
            {text}
          </h1>
        );
      case "h2":
        return (
          <h2 ref={ref as any} style={style} className={classes}>
            {text}
          </h2>
        );
      case "h3":
        return (
          <h3 ref={ref as any} style={style} className={classes}>
            {text}
          </h3>
        );
      case "h4":
        return (
          <h4 ref={ref as any} style={style} className={classes}>
            {text}
          </h4>
        );
      case "h5":
        return (
          <h5 ref={ref as any} style={style} className={classes}>
            {text}
          </h5>
        );
      case "h6":
        return (
          <h6 ref={ref as any} style={style} className={classes}>
            {text}
          </h6>
        );
      case "span":
        return (
          <span ref={ref as any} style={style} className={classes}>
            {text}
          </span>
        );
      default:
        return (
          <p ref={ref as any} style={style} className={classes}>
            {text}
          </p>
        );
    }
  };

  return renderTag();
};

export default SplitText;
