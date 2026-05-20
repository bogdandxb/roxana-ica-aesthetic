"use client";
import { useState } from "react";

export default function MentoratPrezentare() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="mt-2 px-6 py-3 border border-[#C6A769] text-[#C6A769] text-sm tracking-widest uppercase hover:bg-[#C6A769] hover:text-white transition-colors"
        style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 500 }}
      >
        Vezi prezentarea programului
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative w-full max-w-3xl h-[90vh] bg-white rounded flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-3 border-b border-[#E8E1D8]">
              <span className="text-[#4A403A] text-sm tracking-widest uppercase" style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 500 }}>
                Skin Intelligence Mentorship
              </span>
              <button
                onClick={() => setOpen(false)}
                className="text-[#7A6F66] hover:text-[#4A403A] text-xl leading-none"
              >
                ✕
              </button>
            </div>
            <iframe
              src="/RoxanaIca_Mentorat.pdf"
              className="flex-1 w-full"
              title="Prezentare Mentorat Roxana Ica"
            />
          </div>
        </div>
      )}
    </>
  );
}
