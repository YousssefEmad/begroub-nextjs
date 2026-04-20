"use client";

import * as React from "react";
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "./button";

type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

type CarouselProps = {
  opts?: CarouselOptions;
  plugins?: CarouselPlugin;
  orientation?: "horizontal" | "vertical";
  setApi?: (api: CarouselApi) => void;
};

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: ReturnType<typeof useEmblaCarousel>[1];
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
} & CarouselProps;

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

function useCarousel() {
  const context = React.useContext(CarouselContext);
  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }
  return context;
}

const Carousel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & CarouselProps
>(
  (
    {
      orientation = "horizontal",
      opts,
      setApi,
      plugins,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [carouselRef, api] = useEmblaCarousel(
      { ...opts, axis: orientation === "horizontal" ? "x" : "y" },
      plugins
    );

    const [canScrollPrev, setCanScrollPrev] = React.useState(false);
    const [canScrollNext, setCanScrollNext] = React.useState(false);

    const onSelect = React.useCallback((api: CarouselApi) => {
      if (!api) return;
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    }, []);

    const scrollPrev = React.useCallback(() => api?.scrollPrev(), [api]);
    const scrollNext = React.useCallback(() => api?.scrollNext(), [api]);

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        const isRTL = opts?.direction === "rtl";
        
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          // In RTL, ArrowLeft should go to next (scroll left)
          if (isRTL) {
            scrollNext();
          } else {
            scrollPrev();
          }
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          // In RTL, ArrowRight should go to previous (scroll right)
          if (isRTL) {
            scrollPrev();
          } else {
            scrollNext();
          }
        }
      },
      [scrollPrev, scrollNext, opts?.direction]
    );

    React.useEffect(() => {
      if (!api || !setApi) return;
      setApi(api);
    }, [api, setApi]);

    React.useEffect(() => {
      if (!api) return;
      onSelect(api);
      api.on("reInit", onSelect);
      api.on("select", onSelect);
      return () => {
        api?.off("select", onSelect);
        api?.off("reInit", onSelect);
      };
    }, [api, onSelect]);

    return (
      <CarouselContext.Provider
        value={{
          carouselRef,
          api,
          opts,
          orientation:
            orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext,
        }}
      >
        <div
          ref={ref}
          onKeyDownCapture={handleKeyDown}
          className={cn("relative", className)}
          role="region"
          aria-roledescription="carousel"
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    );
  }
);
Carousel.displayName = "Carousel";

const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { carouselRef, orientation } = useCarousel();
  return (
    <div ref={carouselRef} className="overflow-hidden">
      <div
        ref={ref}
        className={cn(
          "flex",
          orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
          className
        )}
        {...props}
      />
    </div>
  );
});
CarouselContent.displayName = "CarouselContent";

const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { orientation } = useCarousel();
  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "pl-4" : "pt-4",
        className
      )}
      {...props}
    />
  );
});
CarouselItem.displayName = "CarouselItem";

/* ---------- Controllers with SocialIcon-like white fill on hover ---------- */

const navBase =
  "relative group overflow-hidden h-12 w-12 rounded-full border border-white/80 " +
  "text-white bg-transparent focus-visible:ring-2 focus-visible:ring-white " +
  "disabled:opacity-40 transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]";

const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, ...props }, ref) => {
  const { orientation, scrollPrev, canScrollPrev, opts } = useCarousel();
  const isRTL = opts?.direction === "rtl";
  
  return (
    <Button
      ref={ref}
      size="icon"
      className={cn(
        navBase,
        orientation === "horizontal"
          ? "top-1/2 -translate-y-1/2 left-6"
          : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      {/* White overlay fills like the SocialIcon */}
      <span
        aria-hidden
        className="absolute inset-0 rounded-full bg-white scale-0 transition-transform duration-500 group-hover:scale-100 active:scale-100"
      />
      {/* In RTL, previous should show right arrow since it goes to the right */}
      {isRTL ? (
        <ArrowRight className="relative z-[1] h-7 w-7 transition-colors duration-300 group-hover:text-black" />
      ) : (
        <ArrowLeft className="relative z-[1] h-7 w-7 transition-colors duration-300 group-hover:text-black" />
      )}
      <span className="sr-only">Previous slide</span>
    </Button>
  );
});
CarouselPrevious.displayName = "CarouselPrevious";

const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, ...props }, ref) => {
  const { orientation, scrollNext, canScrollNext, opts } = useCarousel();
  const isRTL = opts?.direction === "rtl";
  
  return (
    <Button
      ref={ref}
      size="icon"
      className={cn(
        navBase,
        orientation === "horizontal"
          ? "top-1/2 -translate-y-1/2 right-6"
          : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <span
        aria-hidden
        className="absolute inset-0 rounded-full bg-white scale-0 transition-transform duration-500 group-hover:scale-100 active:scale-100"
      />
      {/* In RTL, next should show left arrow since it goes to the left */}
      {isRTL ? (
        <ArrowLeft className="relative z-[1] h-7 w-7 transition-colors duration-300 group-hover:text-black" />
      ) : (
        <ArrowRight className="relative z-[1] h-7 w-7 transition-colors duration-300 group-hover:text-black" />
      )}
      <span className="sr-only">Next slide</span>
    </Button>
  );
});
CarouselNext.displayName = "CarouselNext";

export {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
};
