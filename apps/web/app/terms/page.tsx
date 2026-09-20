import { FileText, ShieldCheck } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 text-xs text-slate-300 leading-relaxed">
      <div className="border-b border-slate-800 pb-5">
        <span className="text-xs uppercase font-mono font-bold text-cyan-400 tracking-wider">
          Legal Agreement
        </span>
        <h1 className="text-3xl font-black text-white mt-1">Terms of Service</h1>
        <p className="text-sm text-slate-400 mt-2">
          SignalFusion LK Terms of Service governing web, mobile, and desktop software usage.
        </p>
      </div>

      <div className="space-y-6">
        <section className="space-y-2">
          <h3 className="text-sm font-bold text-white">1. Service Purpose</h3>
          <p>
            SignalFusion LK is a network telemetry, diagnostics, and benchmarking utility. SignalFusion LK does not guarantee cellular coverage improvements where physical RF conditions or carrier infrastructure do not support it.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="text-sm font-bold text-white">2. Acceptable Use</h3>
          <p>
            Users agree not to flood speed-test endpoints with automated scripts or botnets designed to artificially inflate bandwidth or degrade test node availability for other Sri Lankan users.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="text-sm font-bold text-white">3. Disclaimers</h3>
          <p>
            Speed test results reflect application-layer performance at the moment of measurement and may vary based on local radio congestion, device hardware, and tower backhaul capacity.
          </p>
        </section>
      </div>
    </div>
  );
}
