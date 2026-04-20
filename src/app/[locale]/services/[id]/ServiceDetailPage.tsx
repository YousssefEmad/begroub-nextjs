"use client";
import React, { useState } from "react";
import { motion } from "motion/react";
import { CheckCircle, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/navigations";
import SplitText from "@/components/SplitText";
import { ServiceDetailsApiResponse } from "@/types/servicesApiTypes";
import { useLocale, useTranslations } from "next-intl";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image, { StaticImageData } from "next/image";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";

export default function ServiceDetailPage({
  serviceDetailsApiData,
}: {
  serviceDetailsApiData: ServiceDetailsApiResponse;
}) {
  const service = serviceDetailsApiData.data.service;
  const t = useTranslations("services");
  const locale = useLocale();
  const [selectedImage, setSelectedImage] = useState<string | null>(
    null
  );

  return (
    <section className="min-h-screen bg-main-black2 text-main-white">
      {/* Header Section */}
      <div className="w-full bg-main-black2 text-main-primary flex flex-col items-center justify-end xl:justify-center pt-[70px] pb-6 lg:pt-[120px] min-h-fit relative overflow-hidden">
        <div className="flex flex-col items-center relative z-10 text-center px-4">
          {locale === "en" ? (
            <SplitText
              text={service.name}
              tag="h1"
              className="font-extrabold leading-[1.2] text-[clamp(32px,8vw,80px)] relative mb-4"
              delay={80}
              duration={0.6}
              ease="power3.out"
              splitType="chars"
              from={{ opacity: 0, y: 30 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0}
              rootMargin="0px"
              textAlign="center"
              initialHidden
            />
          ) : (
            <motion.h1
              dir="rtl"
              className="font-extrabold leading-[1.5] text-[clamp(32px,8vw,80px)] relative bg-clip-text text-transparent bg-gradient-to-b from-orange-300 to-[#F18A1D]"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {service.name}
            </motion.h1>
          )}

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl text-white font-medium max-w-2xl mx-auto capitalize"
          >
            {service.short_desc}
          </motion.p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 lg:py-20 -mt-10">
        <div className="max-w-6xl mx-auto">
          {/* Description Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="flex flex-col lg:flex-row gap-8 items-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 lg:p-12">
              {/* Text Column */}
              <div className="flex-1">
                <h2 className="text-3xl lg:text-4xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  {t("About This Service")}
                </h2>
                <div
                  className="text-lg leading-relaxed opacity-90 text-white/80 [text-justify:inter-word]"
                  dangerouslySetInnerHTML={{ __html: service?.long_desc }}
                />
              </div>

              {/* Image Column inside the same container */}
              <div className="w-full lg:w-1/2 relative h-64 sm:h-80 md:h-96 lg:h-[450px] rounded-2xl border-[2px] border-main-secondary overflow-hidden">
                <img
                  src={service?.image}
                  alt={service?.alt_image ?? ""}
                  className="absolute inset-0 h-full w-full object-cover rounded-2xl"
                />
              </div>
            </div>
          </motion.div>

          {/* Features and Benefits Grid - Dynamic from Tabs */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {service.tabs
              .sort((a, b) => a.order - b.order)
              .map((tab, index) => (
                <motion.div
                  key={tab.id}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.8, delay: 0.2 * index }}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8"
                >
                  <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    {index === 0 ? (
                      <CheckCircle className="w-6 h-6 text-main-primary" />
                    ) : (
                      <Star className="w-6 h-6 text-main-primary" />
                    )}
                    {tab.name}
                  </h3>

                  {/* Render long_desc <ul><li>...</li></ul> the same style as cards with primary-colored markers */}
                  <div
                    className="space-y-4 service-tab-content [&_ul]:list-disc [&_ul]:pl-6 [&_ul_li]:marker:text-main-primary"
                    dangerouslySetInnerHTML={{ __html: tab.long_desc }}
                  />
                </motion.div>
              ))}
          </div>

          {/* Image Slider Section */}
          {service?.images && service.images.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8 }}
              className="mb-12 lg:mb-20"
            >
              <Carousel
                opts={{
                  align: "start",
                  loop: true,
                  direction: locale === "ar" ? "rtl" : "ltr",
                }}
                plugins={[
                  Autoplay({
                    delay: 3000,
                  }),
                ]}
                className="w-full"
              >
                <CarouselContent className="-ms-4">
                  {service.images.map((img) => (
                    <CarouselItem
                      key={img.id}
                      className="ps-4 md:basis-1/2 lg:basis-1/3"
                    >
                      <div
                        onClick={() => setSelectedImage(img.image)}
                        className="relative aspect-[4/3] cursor-target overflow-hidden rounded-2xl border-2 border-main-secondary/30 hover:border-main-secondary transition-colors duration-300 group"
                      >
                        <Image
                          src={img.image}
                          alt={`${img.alt_image ?? ""}`}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-main-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="flex justify-center gap-4 mt-8">
                  <CarouselPrevious className="static cursor-target translate-y-0 border-main-primary text-main-primary hover:bg-main-primary/10" />
                  <CarouselNext className="static cursor-target translate-y-0 border-main-primary text-main-primary hover:bg-main-primary/10" />
                </div>
              </Carousel>
            </motion.div>
          )}

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center bg-gradient-to-r from-main-primary/10 to-main-secondary/10 backdrop-blur-sm border-[2px] border-main-secondary rounded-2xl p-8 lg:p-12"
          >
            <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-main-primary to-main-secondary bg-clip-text text-transparent">
              {t("Ready to Get Started?")}
            </h3>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              {t("Let’s discuss how our")} {service.name.toLowerCase()}{" "}
              {t("service can help your business grow and achieve its goals")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button className="bg-main-primary text-main-text hover:bg-main-secondary w-full md:w-fit px-8 py-6 text-lg font-semibold transition-all duration-300 hover:scale-105 rounded-[6px]">
                  {t("Get in Touch")}
                </Button>
              </Link>
              <Link href="/services">
                <Button
                  variant="outline"
                  className="border-main-primary/50 text-main-primary hover:bg-main-primary/10 w-full md:w-fit px-8 py-6 text-lg font-semibold transition-all duration-300 hover:scale-105 rounded-[6px]"
                >
                  {t("View All Services")}
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Image Modal */}
      <DialogPrimitive.Root
        open={!!selectedImage}
        onOpenChange={(open) => !open && setSelectedImage(null)}
      >
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay className="fixed inset-0 z-[100] bg-main-black/90 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
          <DialogPrimitive.Content className="fixed left-[50%] top-[50%] z-[101] w-[85vw] h-[85vh] max-w-7xl translate-x-[-50%] translate-y-[-50%] p-0 focus:outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95">
            <div className="relative w-full h-full overflow-hidden rounded-2xl border-2 border-main-secondary shadow-2xl bg-main-black2">
              {selectedImage && (
                <Image
                  src={selectedImage}
                  alt="Full size view"
                  fill
                  className="object-cover"
                />
              )}
              <DialogPrimitive.Close className="absolute top-4 right-4 p-2 rounded-full bg-main-primary text-main-black hover:bg-main-secondary transition-colors duration-300 cursor-target">
                <X className="w-6 h-6" />
              </DialogPrimitive.Close>
            </div>
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    </section>
  );
}
