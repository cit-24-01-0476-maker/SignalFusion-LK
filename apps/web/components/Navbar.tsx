"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Activity, Wifi, Smartphone, Monitor, QrCode, Globe, ShieldCheck, BarChart3, Radio } from "lucide-react";
import { translations, Language } from "../lib/i18n";

interface NavbarProps {
  currentLang?: Language;
  onLangChange?: (lang: Language) => void;
  isCompanionLive?: boolean;
  onOpenPairingModal?: () => void;
}

export default function Navbar({
  currentLang = "en",
  onLangChange,
  isCompanionLive = false,
  onOpenPairingModal
}: NavbarProps) {
  const pathname = usePathname();
  const [lang, setLang] = useState<Language>(currentLang);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[lang];

  const handleLangChange = (l: Language) => {
    setLang(l);
    if (onLangChange) onLangChange(l);
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#070B14]/85 backdrop-blur-xl border-b border-cyan-500/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-blue-600 to-cyan-400 p-[1.5px] shadow-lg shadow-cyan-500/20">
                <div className="w-full h-full bg-[#070B14] rounded-[7px] flex items-center justify-center">
                  <Activity className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
                </div>
              </div>
              <div>
                <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-cyan-400 bg-clip-text text-transparent">
                  SignalFusion <span className="text-cyan-400 font-extrabold text-sm px-1.5 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/30">LK</span>
                </span>
                <span className="hidden md:block text-[10px] text-slate-400 -mt-1 tracking-wider uppercase">
                  Smarter Signal. Stable Internet.
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 text-sm font-medium text-slate-300">
            <Link
              href="/speedtest"
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                pathname === "/speedtest" ? "text-cyan-400 bg-cyan-950/30 border border-cyan-500/20" : "hover:text-white hover:bg-slate-800/40"
              }`}
            >
              <Activity className="w-4 h-4" /> Speed Test
            </Link>
            <Link
              href="/map"
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                pathname === "/map" ? "text-cyan-400 bg-cyan-950/30 border border-cyan-500/20" : "hover:text-white hover:bg-slate-800/40"
              }`}
            >
              <Radio className="w-4 h-4" /> Live Map
            </Link>
            <Link
              href="/compare"
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                pathname === "/compare" ? "text-cyan-400 bg-cyan-950/30 border border-cyan-500/20" : "hover:text-white hover:bg-slate-800/40"
              }`}
            >
              <BarChart3 className="w-4 h-4" /> Compare
            </Link>
            <Link
              href="/network-lab"
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                pathname === "/network-lab" ? "text-cyan-400 bg-cyan-950/30 border border-cyan-500/20" : "hover:text-white hover:bg-slate-800/40"
              }`}
            >
              Network Lab
            </Link>
            <Link
              href="/dashboard"
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                pathname === "/dashboard" ? "text-cyan-400 bg-cyan-950/30 border border-cyan-500/20" : "hover:text-white hover:bg-slate-800/40"
              }`}
            >
              Dashboard
            </Link>
            <Link
              href="/download"
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                pathname === "/download" ? "text-cyan-400 bg-cyan-950/30 border border-cyan-500/20" : "hover:text-white hover:bg-slate-800/40"
              }`}
            >
              Download
            </Link>
          </div>

          {/* Right Action & Mode Badge */}
          <div className="flex items-center gap-3">
            {/* Mode Indicator */}
            <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-medium border border-slate-700 bg-slate-900/80">
              <span className={`w-2 h-2 rounded-full ${isCompanionLive ? "bg-emerald-400 animate-pulse" : "bg-cyan-400"}`} />
              <span className="text-slate-300">
                {isCompanionLive ? "Companion LIVE" : "Web Mode"}
              </span>
            </div>

            {/* Connect Device Button */}
            <button
              onClick={onOpenPairingModal}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:brightness-110 transition-all cursor-pointer"
            >
              <QrCode className="w-3.5 h-3.5" />
              <span>CONNECT DEVICE</span>
            </button>

            {/* Language Switcher */}
            <div className="flex items-center text-xs bg-slate-900/90 rounded-lg p-0.5 border border-slate-800 text-slate-400">
              <button
                onClick={() => handleLangChange("en")}
                className={`px-2 py-1 rounded ${lang === "en" ? "bg-cyan-500/20 text-cyan-400 font-bold" : "hover:text-white"}`}
              >
                EN
              </button>
              <button
                onClick={() => handleLangChange("si")}
                className={`px-2 py-1 rounded ${lang === "si" ? "bg-cyan-500/20 text-cyan-400 font-bold" : "hover:text-white"}`}
              >
                සිං
              </button>
              <button
                onClick={() => handleLangChange("ta")}
                className={`px-2 py-1 rounded ${lang === "ta" ? "bg-cyan-500/20 text-cyan-400 font-bold" : "hover:text-white"}`}
              >
                தம
              </button>
            </div>

            {/* Mobile Hamburger toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden px-4 pt-2 pb-4 space-y-1 bg-[#070B14] border-b border-slate-800 text-sm">
          <Link
            href="/speedtest"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-slate-200 hover:bg-slate-800"
          >
            Speed Test
          </Link>
          <Link
            href="/map"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-slate-200 hover:bg-slate-800"
          >
            Sri Lanka Live Map
          </Link>
          <Link
            href="/compare"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-slate-200 hover:bg-slate-800"
          >
            Network Comparison
          </Link>
          <Link
            href="/network-lab"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-slate-200 hover:bg-slate-800"
          >
            Network Lab
          </Link>
          <Link
            href="/dashboard"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-slate-200 hover:bg-slate-800"
          >
            Dashboard
          </Link>
          <Link
            href="/devices"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-slate-200 hover:bg-slate-800"
          >
            Connected Devices
          </Link>
          <Link
            href="/download"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-slate-200 hover:bg-slate-800"
          >
            Download Apps
          </Link>
          <Link
            href="/status"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-slate-400 hover:bg-slate-800"
          >
            System Status
          </Link>
        </div>
      )}
    </nav>
  );
}
