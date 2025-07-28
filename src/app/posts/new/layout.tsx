import React from "react";
import "../../globals.css";

export default function RTLLayout({ children }: { children: React.ReactNode }) {
  return (
    <div dir="rtl" className="font-sans bg-gray-50" style={{ textAlign: "right" }}>
      {children}
    </div>
  );
}
