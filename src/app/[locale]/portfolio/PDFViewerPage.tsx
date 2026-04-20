"use client";

const PDF_FILE = "/profile.pdf";

export default function PDFViewerPage() {
  return (
    <div className="w-full flex flex-col items-center pb-10 px-4">
      {/* Card wrapper */}
      <div
        className="w-full"
        style={{
          maxWidth: "1100px",
          borderRadius: "20px",
          overflow: "hidden",
          boxShadow:
            "0 8px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06)",
        }}
      >
        {/* Top bar */}
        <div
          className="flex items-center justify-between px-5 py-3"
          style={{
            background:
              "linear-gradient(135deg, rgba(42,42,50,0.98) 0%, rgba(30,30,38,1) 100%)",
            borderBottom: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-extrabold"
              style={{
                background: "var(--main-colors-primary)",
                color: "var(--main-colors-black)",
              }}
            >
              PDF
            </div>
            <span
              className="text-sm font-medium tracking-wide"
              style={{ color: "rgba(255,255,255,0.7)" }}
            >
              Be Group Portfolio
            </span>
          </div>

          <a
            href={PDF_FILE}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-1.5 rounded-xl text-xs font-semibold transition-all hover:opacity-80 active:scale-95"
            style={{
              background: "var(--main-colors-primary)",
              color: "var(--main-colors-black)",
              boxShadow: "0 2px 12px rgba(241,138,29,0.3)",
            }}
          >
            ↗ Open Full Screen
          </a>
        </div>

        {/* iFrame */}
        <iframe
          src={`${PDF_FILE}#zoom=35&toolbar=1&navpanes=0&scrollbar=1`}
          className="w-full"
          style={{
            height: "85vh",
            border: "none",
            display: "block",
            background: "#1a1a1e",
          }}
          title="Portfolio PDF"
        />
      </div>
    </div>
  );
}
