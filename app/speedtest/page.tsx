import SpeedTestGauge from "../../components/SpeedTestGauge";

export default function SpeedTestPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-3xl font-black text-white">Browser Speed Test Engine</h1>
        <p className="text-sm text-slate-400 mt-2">
          Genuine application-layer HTTP streaming throughput, latency probe, and jitter measurement to our Colombo edge datacenter nodes.
        </p>
      </div>

      <SpeedTestGauge />
    </div>
  );
}
