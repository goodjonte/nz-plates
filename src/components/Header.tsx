"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-blue-800 text-white shadow-lg">
      <nav className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tight">
          NZ Plate Guide
        </Link>
        <button
          className="md:hidden p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
        <div className={`${menuOpen ? "flex" : "hidden"} md:flex flex-col md:flex-row absolute md:relative top-16 md:top-0 left-0 md:left-auto w-full md:w-auto bg-blue-800 md:bg-transparent gap-1 md:gap-6 p-4 md:p-0 z-50`}>
          <Link href="/" className="hover:text-blue-200 transition-colors py-2 md:py-0" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link href="/how-it-works" className="hover:text-blue-200 transition-colors py-2 md:py-0" onClick={() => setMenuOpen(false)}>How It Works</Link>
          <Link href="/timeline" className="hover:text-blue-200 transition-colors py-2 md:py-0" onClick={() => setMenuOpen(false)}>Timeline</Link>
          <Link href="/quiz" className="hover:text-blue-200 transition-colors py-2 md:py-0" onClick={() => setMenuOpen(false)}>Quiz</Link>
        </div>
      </nav>
    </header>
  );
}
