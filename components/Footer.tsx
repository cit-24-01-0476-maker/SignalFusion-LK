import React from "react";
import Link from "next/link";
import { ShieldCheck, Activity, Radio, Cpu, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#05080F] border-t border-slate-800 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded bg-gradient-to-tr from-blue-600 to-cyan-400 p-[1px]">
                <div className="w-full h-full bg-[#070B14] rounded flex items-center justify-center">
                  <Activity className="w-4 h-4 text-cyan-400" />
                </div>
              </div>
              <span className="font-bold text-white tracking-tight">SignalFusion LK</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Smarter Signal. Stable Internet. A Sri Lanka-first mobile network intelligence and diagnostics ecosystem. Zero fake signals, genuine telemetry, and privacy-preserving spatial aggregation.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-500/20 px-3 py-1.5 rounded-md w-fit">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Zero-Fake Signal Architecture • Verified Crowdsourcing</span>
            </div>
          </div>

          {/* Ecosystem */}
          <div>
            <h4 className="text-white text-xs font-semibold uppercase tracking-wider mb-3">Ecosystem</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/speedtest" className="hover:text-cyan-400 transition-colors">Web Speed Test</Link></li>
              <li><Link href="/map" className="hover:text-cyan-400 transition-colors">Sri Lanka Network Map</Link></li>
              <li><Link href="/compare" className="hover:text-cyan-400 transition-colors">Operator Comparison</Link></li>
              <li><Link href="/network-lab" className="hover:text-cyan-400 transition-colors">Browser Diagnostics Lab</Link></li>
              <li><Link href="/dashboard" className="hover:text-cyan-400 transition-colors">Web Dashboard</Link></li>
              <li><Link href="/devices" className="hover:text-cyan-400 transition-colors">Connected Devices</Link></li>
            </ul>
          </div>

          {/* Platforms */}
          <div>
            <h4 className="text-white text-xs font-semibold uppercase tracking-wider mb-3">Apps & Software</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/mobile" className="hover:text-cyan-400 transition-colors">Android Mobile App</Link></li>
              <li><Link href="/desktop" className="hover:text-cyan-400 transition-colors">Windows Desktop Software</Link></li>
              <li><Link href="/download" className="hover:text-cyan-400 transition-colors">Download Center</Link></li>
              <li><Link href="/releases" className="hover:text-cyan-400 transition-colors">Release Center (v1.4.0)</Link></li>
              <li><Link href="/status" className="hover:text-cyan-400 transition-colors">System Status</Link></li>
            </ul>
          </div>

          {/* Trust & Legal */}
          <div>
            <h4 className="text-white text-xs font-semibold uppercase tracking-wider mb-3">Honesty & Legal</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/technology" className="hover:text-cyan-400 transition-colors">Engineering Philosophy</Link></li>
              <li><Link href="/how-it-works" className="hover:text-cyan-400 transition-colors">Anti-Fake Policy</Link></li>
              <li><Link href="/privacy" className="hover:text-cyan-400 transition-colors">Privacy & GPS Grids</Link></li>
              <li><Link href="/terms" className="hover:text-cyan-400 transition-colors">Terms of Service</Link></li>
              <li><Link href="/docs" className="hover:text-cyan-400 transition-colors">OpenAPI Docs</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <div>
            © 2026 SignalFusion LK. Sri Lankan operators monitored: Dialog, SLT-Mobitel, Airtel, Hutch.
          </div>
          <div className="flex items-center gap-4">
            <span className="text-slate-400">Colombo Edge Node: 18ms Latency</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span className="text-emerald-400">Ecosystem Online</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
