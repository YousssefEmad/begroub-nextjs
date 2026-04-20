'use client';
import dynamic from "next/dynamic";

const PortfolioPDF = dynamic(() => import("./PortfolioPDF"), {
  ssr: false,
  loading: () => (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: "#141415" }}
    >
      <div
        className="w-10 h-10 rounded-full border-4 animate-spin"
        style={{ borderColor: "#F18A1D", borderTopColor: "transparent" }}
      />
    </div>
  ),
});

export default function page() {
  return <PortfolioPDF />;
}
