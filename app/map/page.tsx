import SriLankaMap from "../../components/SriLankaMap";

export default function MapPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-3xl font-black text-white">Sri Lanka Live Network Map</h1>
        <p className="text-sm text-slate-400 mt-2">
          Crowdsourced and native telemetry benchmarks for Dialog, SLT-Mobitel, Airtel, and Hutch aggregated into 1.1km privacy-preserving spatial grids.
        </p>
      </div>

      <SriLankaMap />
    </div>
  );
}
