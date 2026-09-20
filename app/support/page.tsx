"use client";

import React, { useState } from "react";
import { MessageSquare, Mail, Send, CheckCircle2 } from "lucide-react";

export default function SupportPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="text-center border-b border-slate-800 pb-5">
        <span className="text-xs uppercase font-mono font-bold text-cyan-400 tracking-wider">
          Sri Lanka Community Support
        </span>
        <h1 className="text-3xl font-black text-white mt-1">Get in Touch</h1>
        <p className="text-sm text-slate-400 mt-2">
          Report tower signal discrepancies, suggest speed node peering locations, or submit telemetry feedback.
        </p>
      </div>

      {submitted ? (
        <div className="p-8 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-center space-y-3">
          <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
          <h3 className="text-lg font-bold text-white">Message Received</h3>
          <p className="text-xs text-slate-300">
            Thank you for helping improve Sri Lanka&apos;s mobile intelligence ecosystem. Our Colombo engineering team will review your report.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4 text-xs">
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Your Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Kasun Perera"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Email Address</label>
            <input
              type="email"
              required
              placeholder="kasun@example.lk"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Carrier / Operator</label>
            <select className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-cyan-400">
              <option>Dialog</option>
              <option>SLT-Mobitel</option>
              <option>Airtel</option>
              <option>Hutch</option>
              <option>General Ecosystem Question</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Feedback or Question</label>
            <textarea
              rows={4}
              required
              placeholder="Describe your network observation or inquiry..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-cyan-400"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl font-bold text-xs bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 cursor-pointer transition-all"
          >
            <Send className="w-4 h-4" />
            <span>SUBMIT FEEDBACK</span>
          </button>
        </form>
      )}
    </div>
  );
}
