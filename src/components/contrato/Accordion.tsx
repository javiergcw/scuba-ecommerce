"use client";
import React, { useState, ReactNode } from "react";

interface AccordionProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

const Accordion: React.FC<AccordionProps> = ({ title, children, defaultOpen = false }) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="mb-6 border rounded-lg bg-white shadow">
      <button
        type="button"
        className="w-full flex justify-between items-center px-6 py-4 text-lg font-semibold text-left text-gray-800 focus:outline-none"
        onClick={() => setOpen((prev) => !prev)}
      >
        <span>{title}</span>
        <span className="ml-2 text-2xl">{open ? "-" : "+"}</span>
      </button>
      {open && <div className="px-6 pb-6">{children}</div>}
    </div>
  );
};

export default Accordion; 