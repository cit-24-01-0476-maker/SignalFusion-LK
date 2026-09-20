"use client";

import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import DevicePairingModal from "../components/DevicePairingModal";
import { Language } from "../lib/i18n";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [pairingModalOpen, setPairingModalOpen] = useState(false);
  const [isCompanionLive, setIsCompanionLive] = useState(false);
  const [currentLang, setCurrentLang] = useState<Language>("en");
  const [showUpdateToast, setShowUpdateToast] = useState(false);

  useEffect(() => {
    // Register Service Worker for PWA
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").then((reg) => {
        reg.onupdatefound = () => {
          const installingWorker = reg.installing;
          if (installingWorker) {
            installingWorker.onstatechange = () => {
              if (installingWorker.state === "installed" && navigator.serviceWorker.controller) {
                setShowUpdateToast(true);
              }
            };
          }
        };
      }).catch((err) => {
        console.warn("SW registration skipped:", err);
      });
    }
  }, []);

  const handleSimulatePairSuccess = () => {
    setIsCompanionLive(true);
  };

  const handleRefreshApp = () => {
    if (typeof window !== "undefined") {
      window.location.reload();
    }
  };

  return (
    <>
      <Navbar
        currentLang={currentLang}
        onLangChange={setCurrentLang}
        isCompanionLive={isCompanionLive}
        onOpenPairingModal={() => setPairingModalOpen(true)}
      />

      <main className="flex-1">
        {children}
      </main>

      <Footer />

      <DevicePairingModal
        isOpen={pairingModalOpen}
        onClose={() => setPairingModalOpen(false)}
        onSimulatePairSuccess={handleSimulatePairSuccess}
      />

      {/* Subtle PWA Update Toast (Specified in Prompt) */}
      {showUpdateToast && (
        <div className="fixed bottom-4 right-4 z-50 p-4 rounded-xl bg-slate-900 border border-cyan-500/40 shadow-2xl flex items-center gap-3 text-xs text-white">
          <span>SignalFusion has been updated.</span>
          <button
            onClick={handleRefreshApp}
            className="px-3 py-1 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-lg transition-colors cursor-pointer"
          >
            REFRESH
          </button>
        </div>
      )}
    </>
  );
}
