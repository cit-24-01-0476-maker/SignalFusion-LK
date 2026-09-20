"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Radio, Filter, MapPin, Activity, ShieldCheck, Clock, Users, ArrowUpRight, BarChart2, Search } from "lucide-react";

export interface NetworkGridTile {
  gridId: string;
  district: string;
  locationName: string;
  latitude: number;
  longitude: number;
  operator: "Dialog" | "SLT-Mobitel" | "Airtel" | "Hutch";
  networkTechnology: "4G" | "5G";
  medianSignalDbm: number;
  medianRsrp?: number;
  medianRsrq?: number;
  medianSinr?: number;
  medianDownloadMbps: number;
  medianUploadMbps: number;
  medianLatencyMs: number;
  sampleCount: number;
  deviceCount: number;
  latestMeasurementTimestamp: string;
  confidence: "LOW CONFIDENCE" | "MEDIUM CONFIDENCE" | "HIGH CONFIDENCE";
  freshness: "LIVE DEVICE" | "FRESH" | "RECENT" | "HISTORICAL";
}

// 25 Districts of Sri Lanka
export const ALL_SRI_LANKA_TILES: NetworkGridTile[] = [
  // Western Province
  {
    gridId: "col-malabe",
    district: "Colombo",
    locationName: "Malabe IT Hub",
    latitude: 6.9061,
    longitude: 79.9677,
    operator: "Dialog",
    networkTechnology: "5G",
    medianSignalDbm: -84,
    medianRsrp: -84,
    medianRsrq: -10,
    medianSinr: 19,
    medianDownloadMbps: 152.4,
    medianUploadMbps: 29.8,
    medianLatencyMs: 23.0,
    sampleCount: 248,
    deviceCount: 53,
    latestMeasurementTimestamp: "42 seconds ago",
    confidence: "HIGH CONFIDENCE",
    freshness: "LIVE DEVICE",
  },
  {
    gridId: "col-fort",
    district: "Colombo",
    locationName: "Colombo Fort",
    latitude: 6.9344,
    longitude: 79.8428,
    operator: "Dialog",
    networkTechnology: "5G",
    medianSignalDbm: -81,
    medianRsrp: -81,
    medianRsrq: -9,
    medianSinr: 22,
    medianDownloadMbps: 189.5,
    medianUploadMbps: 38.4,
    medianLatencyMs: 18.2,
    sampleCount: 412,
    deviceCount: 94,
    latestMeasurementTimestamp: "3 minutes ago",
    confidence: "HIGH CONFIDENCE",
    freshness: "FRESH",
  },
  {
    gridId: "gam-negombo",
    district: "Gampaha",
    locationName: "Negombo Beach Road",
    latitude: 7.2083,
    longitude: 79.8358,
    operator: "SLT-Mobitel",
    networkTechnology: "4G",
    medianSignalDbm: -87,
    medianRsrp: -88,
    medianRsrq: -11,
    medianSinr: 15,
    medianDownloadMbps: 64.2,
    medianUploadMbps: 19.4,
    medianLatencyMs: 24.1,
    sampleCount: 198,
    deviceCount: 45,
    latestMeasurementTimestamp: "6 minutes ago",
    confidence: "HIGH CONFIDENCE",
    freshness: "FRESH",
  },
  {
    gridId: "kal-panadura",
    district: "Kalutara",
    locationName: "Panadura Town",
    latitude: 6.7132,
    longitude: 79.9074,
    operator: "Dialog",
    networkTechnology: "4G",
    medianSignalDbm: -89,
    medianRsrp: -90,
    medianRsrq: -11,
    medianSinr: 13,
    medianDownloadMbps: 52.6,
    medianUploadMbps: 14.8,
    medianLatencyMs: 26.5,
    sampleCount: 142,
    deviceCount: 33,
    latestMeasurementTimestamp: "18 minutes ago",
    confidence: "HIGH CONFIDENCE",
    freshness: "FRESH",
  },
  // Central Province
  {
    gridId: "kan-center",
    district: "Kandy",
    locationName: "Kandy City Center",
    latitude: 7.2906,
    longitude: 80.6337,
    operator: "Dialog",
    networkTechnology: "5G",
    medianSignalDbm: -84,
    medianRsrp: -84,
    medianRsrq: -10,
    medianSinr: 18,
    medianDownloadMbps: 155.0,
    medianUploadMbps: 31.0,
    medianLatencyMs: 21.4,
    sampleCount: 380,
    deviceCount: 82,
    latestMeasurementTimestamp: "10 minutes ago",
    confidence: "HIGH CONFIDENCE",
    freshness: "FRESH",
  },
  {
    gridId: "mat-town",
    district: "Matale",
    locationName: "Matale Town",
    latitude: 7.4675,
    longitude: 80.6234,
    operator: "SLT-Mobitel",
    networkTechnology: "4G",
    medianSignalDbm: -91,
    medianRsrp: -92,
    medianRsrq: -12,
    medianSinr: 12,
    medianDownloadMbps: 45.2,
    medianUploadMbps: 12.5,
    medianLatencyMs: 31.2,
    sampleCount: 110,
    deviceCount: 26,
    latestMeasurementTimestamp: "45 minutes ago",
    confidence: "MEDIUM CONFIDENCE",
    freshness: "RECENT",
  },
  {
    gridId: "nuw-eliya",
    district: "Nuwara Eliya",
    locationName: "Nuwara Eliya Central",
    latitude: 6.9497,
    longitude: 80.7891,
    operator: "Dialog",
    networkTechnology: "4G",
    medianSignalDbm: -93,
    medianRsrp: -94,
    medianRsrq: -13,
    medianSinr: 11,
    medianDownloadMbps: 38.6,
    medianUploadMbps: 10.2,
    medianLatencyMs: 34.0,
    sampleCount: 95,
    deviceCount: 22,
    latestMeasurementTimestamp: "1 hour ago",
    confidence: "MEDIUM CONFIDENCE",
    freshness: "RECENT",
  },
  // Southern Province
  {
    gridId: "gal-fort",
    district: "Galle",
    locationName: "Galle Fort",
    latitude: 6.0270,
    longitude: 80.2170,
    operator: "SLT-Mobitel",
    networkTechnology: "4G",
    medianSignalDbm: -88,
    medianRsrp: -89,
    medianRsrq: -11,
    medianSinr: 14,
    medianDownloadMbps: 58.0,
    medianUploadMbps: 16.4,
    medianLatencyMs: 26.0,
    sampleCount: 215,
    deviceCount: 48,
    latestMeasurementTimestamp: "14 minutes ago",
    confidence: "HIGH CONFIDENCE",
    freshness: "FRESH",
  },
  {
    gridId: "mtr-town",
    district: "Matara",
    locationName: "Matara Beach Park",
    latitude: 5.9496,
    longitude: 80.5469,
    operator: "Dialog",
    networkTechnology: "4G",
    medianSignalDbm: -89,
    medianRsrp: -90,
    medianRsrq: -12,
    medianSinr: 13,
    medianDownloadMbps: 51.4,
    medianUploadMbps: 15.2,
    medianLatencyMs: 27.8,
    sampleCount: 160,
    deviceCount: 37,
    latestMeasurementTimestamp: "25 minutes ago",
    confidence: "HIGH CONFIDENCE",
    freshness: "FRESH",
  },
  {
    gridId: "ham-port",
    district: "Hambantota",
    locationName: "Hambantota Harbor Zone",
    latitude: 6.1248,
    longitude: 81.1185,
    operator: "Airtel",
    networkTechnology: "4G",
    medianSignalDbm: -92,
    medianRsrp: -93,
    medianRsrq: -13,
    medianSinr: 11,
    medianDownloadMbps: 41.2,
    medianUploadMbps: 11.0,
    medianLatencyMs: 33.4,
    sampleCount: 88,
    deviceCount: 19,
    latestMeasurementTimestamp: "2 hours ago",
    confidence: "MEDIUM CONFIDENCE",
    freshness: "RECENT",
  },
  // Northern Province
  {
    gridId: "jaf-town",
    district: "Jaffna",
    locationName: "Jaffna Town Clock Tower",
    latitude: 9.6615,
    longitude: 80.0255,
    operator: "Dialog",
    networkTechnology: "4G",
    medianSignalDbm: -91,
    medianRsrp: -92,
    medianRsrq: -12,
    medianSinr: 12,
    medianDownloadMbps: 48.0,
    medianUploadMbps: 13.5,
    medianLatencyMs: 35.2,
    sampleCount: 140,
    deviceCount: 31,
    latestMeasurementTimestamp: "50 minutes ago",
    confidence: "HIGH CONFIDENCE",
    freshness: "RECENT",
  },
  {
    gridId: "kln-center",
    district: "Kilinochchi",
    locationName: "Kilinochchi Town",
    latitude: 9.3803,
    longitude: 80.3770,
    operator: "SLT-Mobitel",
    networkTechnology: "4G",
    medianSignalDbm: -95,
    medianRsrp: -96,
    medianRsrq: -14,
    medianSinr: 9,
    medianDownloadMbps: 34.5,
    medianUploadMbps: 8.8,
    medianLatencyMs: 40.1,
    sampleCount: 65,
    deviceCount: 15,
    latestMeasurementTimestamp: "3 hours ago",
    confidence: "MEDIUM CONFIDENCE",
    freshness: "HISTORICAL",
  },
  {
    gridId: "man-island",
    district: "Mannar",
    locationName: "Mannar Town",
    latitude: 8.9810,
    longitude: 79.9042,
    operator: "Dialog",
    networkTechnology: "4G",
    medianSignalDbm: -94,
    medianRsrp: -95,
    medianRsrq: -13,
    medianSinr: 10,
    medianDownloadMbps: 36.8,
    medianUploadMbps: 9.4,
    medianLatencyMs: 38.6,
    sampleCount: 58,
    deviceCount: 13,
    latestMeasurementTimestamp: "4 hours ago",
    confidence: "LOW CONFIDENCE",
    freshness: "HISTORICAL",
  },
  {
    gridId: "vav-center",
    district: "Vavuniya",
    locationName: "Vavuniya Central",
    latitude: 8.7514,
    longitude: 80.4971,
    operator: "SLT-Mobitel",
    networkTechnology: "4G",
    medianSignalDbm: -92,
    medianRsrp: -93,
    medianRsrq: -12,
    medianSinr: 11,
    medianDownloadMbps: 39.4,
    medianUploadMbps: 10.2,
    medianLatencyMs: 36.8,
    sampleCount: 72,
    deviceCount: 16,
    latestMeasurementTimestamp: "2 hours ago",
    confidence: "MEDIUM CONFIDENCE",
    freshness: "RECENT",
  },
  {
    gridId: "mul-town",
    district: "Mullaitivu",
    locationName: "Mullaitivu Coast",
    latitude: 9.2671,
    longitude: 80.8143,
    operator: "Hutch",
    networkTechnology: "4G",
    medianSignalDbm: -98,
    medianRsrp: -99,
    medianRsrq: -15,
    medianSinr: 7,
    medianDownloadMbps: 26.4,
    medianUploadMbps: 6.2,
    medianLatencyMs: 44.2,
    sampleCount: 42,
    deviceCount: 9,
    latestMeasurementTimestamp: "5 hours ago",
    confidence: "LOW CONFIDENCE",
    freshness: "HISTORICAL",
  },
  // Eastern Province
  {
    gridId: "bat-lagoon",
    district: "Batticaloa",
    locationName: "Batticaloa Town",
    latitude: 7.7170,
    longitude: 81.7000,
    operator: "Dialog",
    networkTechnology: "4G",
    medianSignalDbm: -90,
    medianRsrp: -91,
    medianRsrq: -12,
    medianSinr: 12,
    medianDownloadMbps: 46.2,
    medianUploadMbps: 12.8,
    medianLatencyMs: 34.5,
    sampleCount: 118,
    deviceCount: 27,
    latestMeasurementTimestamp: "35 minutes ago",
    confidence: "HIGH CONFIDENCE",
    freshness: "RECENT",
  },
  {
    gridId: "amp-town",
    district: "Ampara",
    locationName: "Ampara Town",
    latitude: 7.2912,
    longitude: 81.6724,
    operator: "SLT-Mobitel",
    networkTechnology: "4G",
    medianSignalDbm: -93,
    medianRsrp: -94,
    medianRsrq: -13,
    medianSinr: 10,
    medianDownloadMbps: 37.5,
    medianUploadMbps: 9.6,
    medianLatencyMs: 37.8,
    sampleCount: 78,
    deviceCount: 18,
    latestMeasurementTimestamp: "2 hours ago",
    confidence: "MEDIUM CONFIDENCE",
    freshness: "RECENT",
  },
  {
    gridId: "tri-harbor",
    district: "Trincomalee",
    locationName: "Trincomalee Harbor",
    latitude: 8.5711,
    longitude: 81.2335,
    operator: "Dialog",
    networkTechnology: "4G",
    medianSignalDbm: -89,
    medianRsrp: -90,
    medianRsrq: -11,
    medianSinr: 13,
    medianDownloadMbps: 54.0,
    medianUploadMbps: 15.0,
    medianLatencyMs: 31.0,
    sampleCount: 132,
    deviceCount: 30,
    latestMeasurementTimestamp: "20 minutes ago",
    confidence: "HIGH CONFIDENCE",
    freshness: "FRESH",
  },
  // North Western Province
  {
    gridId: "kur-central",
    district: "Kurunegala",
    locationName: "Kurunegala Clock Tower",
    latitude: 7.4863,
    longitude: 80.3623,
    operator: "Dialog",
    networkTechnology: "4G",
    medianSignalDbm: -87,
    medianRsrp: -88,
    medianRsrq: -11,
    medianSinr: 14,
    medianDownloadMbps: 59.5,
    medianUploadMbps: 17.2,
    medianLatencyMs: 25.8,
    sampleCount: 240,
    deviceCount: 54,
    latestMeasurementTimestamp: "8 minutes ago",
    confidence: "HIGH CONFIDENCE",
    freshness: "FRESH",
  },
  {
    gridId: "put-town",
    district: "Puttalam",
    locationName: "Puttalam Town",
    latitude: 8.0362,
    longitude: 79.8283,
    operator: "SLT-Mobitel",
    networkTechnology: "4G",
    medianSignalDbm: -92,
    medianRsrp: -93,
    medianRsrq: -13,
    medianSinr: 11,
    medianDownloadMbps: 42.0,
    medianUploadMbps: 11.4,
    medianLatencyMs: 32.6,
    sampleCount: 92,
    deviceCount: 21,
    latestMeasurementTimestamp: "1 hour ago",
    confidence: "MEDIUM CONFIDENCE",
    freshness: "RECENT",
  },
  // North Central Province
  {
    gridId: "anu-sacred",
    district: "Anuradhapura",
    locationName: "Anuradhapura New Town",
    latitude: 8.3114,
    longitude: 80.4037,
    operator: "Dialog",
    networkTechnology: "4G",
    medianSignalDbm: -89,
    medianRsrp: -90,
    medianRsrq: -11,
    medianSinr: 13,
    medianDownloadMbps: 53.2,
    medianUploadMbps: 14.6,
    medianLatencyMs: 28.5,
    sampleCount: 175,
    deviceCount: 39,
    latestMeasurementTimestamp: "15 minutes ago",
    confidence: "HIGH CONFIDENCE",
    freshness: "FRESH",
  },
  {
    gridId: "pol-town",
    district: "Polonnaruwa",
    locationName: "Polonnaruwa Town",
    latitude: 7.9403,
    longitude: 81.0188,
    operator: "SLT-Mobitel",
    networkTechnology: "4G",
    medianSignalDbm: -91,
    medianRsrp: -92,
    medianRsrq: -12,
    medianSinr: 12,
    medianDownloadMbps: 44.8,
    medianUploadMbps: 12.0,
    medianLatencyMs: 31.4,
    sampleCount: 104,
    deviceCount: 24,
    latestMeasurementTimestamp: "40 minutes ago",
    confidence: "MEDIUM CONFIDENCE",
    freshness: "RECENT",
  },
  // Uva Province
  {
    gridId: "bad-valley",
    district: "Badulla",
    locationName: "Badulla Town",
    latitude: 6.9895,
    longitude: 81.0557,
    operator: "Dialog",
    networkTechnology: "4G",
    medianSignalDbm: -90,
    medianRsrp: -91,
    medianRsrq: -12,
    medianSinr: 13,
    medianDownloadMbps: 47.5,
    medianUploadMbps: 13.2,
    medianLatencyMs: 32.0,
    sampleCount: 128,
    deviceCount: 29,
    latestMeasurementTimestamp: "30 minutes ago",
    confidence: "HIGH CONFIDENCE",
    freshness: "RECENT",
  },
  {
    gridId: "mon-town",
    district: "Monaragala",
    locationName: "Monaragala Town",
    latitude: 6.8728,
    longitude: 81.3507,
    operator: "Airtel",
    networkTechnology: "4G",
    medianSignalDbm: -94,
    medianRsrp: -95,
    medianRsrq: -13,
    medianSinr: 10,
    medianDownloadMbps: 35.0,
    medianUploadMbps: 8.9,
    medianLatencyMs: 38.0,
    sampleCount: 62,
    deviceCount: 14,
    latestMeasurementTimestamp: "3 hours ago",
    confidence: "MEDIUM CONFIDENCE",
    freshness: "HISTORICAL",
  },
  // Sabaragamuwa Province
  {
    gridId: "rat-gem",
    district: "Ratnapura",
    locationName: "Ratnapura Clock Tower",
    latitude: 6.6828,
    longitude: 80.3992,
    operator: "Dialog",
    networkTechnology: "4G",
    medianSignalDbm: -88,
    medianRsrp: -89,
    medianRsrq: -11,
    medianSinr: 14,
    medianDownloadMbps: 56.4,
    medianUploadMbps: 16.0,
    medianLatencyMs: 26.4,
    sampleCount: 184,
    deviceCount: 42,
    latestMeasurementTimestamp: "12 minutes ago",
    confidence: "HIGH CONFIDENCE",
    freshness: "FRESH",
  },
  {
    gridId: "keg-town",
    district: "Kegalle",
    locationName: "Kegalle Town",
    latitude: 7.2513,
    longitude: 80.3464,
    operator: "SLT-Mobitel",
    networkTechnology: "4G",
    medianSignalDbm: -89,
    medianRsrp: -90,
    medianRsrq: -11,
    medianSinr: 13,
    medianDownloadMbps: 50.8,
    medianUploadMbps: 14.2,
    medianLatencyMs: 27.5,
    sampleCount: 156,
    deviceCount: 35,
    latestMeasurementTimestamp: "18 minutes ago",
    confidence: "HIGH CONFIDENCE",
    freshness: "FRESH",
  },
];

export default function SriLankaMap() {
  const [selectedOperator, setSelectedOperator] = useState<string>("All");
  const [selectedTech, setSelectedTech] = useState<string>("All");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("All");
  const [selectedMetric, setSelectedMetric] = useState<"download" | "signal" | "latency">("download");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTile, setActiveTile] = useState<NetworkGridTile | null>(ALL_SRI_LANKA_TILES[0]);

  const filteredTiles = ALL_SRI_LANKA_TILES.filter((tile) => {
    if (selectedOperator !== "All" && tile.operator !== selectedOperator) return false;
    if (selectedTech !== "All" && tile.networkTechnology !== selectedTech) return false;
    if (selectedDistrict !== "All" && tile.district !== selectedDistrict) return false;
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      return (
        tile.locationName.toLowerCase().includes(q) ||
        tile.district.toLowerCase().includes(q) ||
        tile.operator.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const districts = ["All", ...Array.from(new Set(ALL_SRI_LANKA_TILES.map((t) => t.district)))].sort();

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      {/* Top Filter Bar */}
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Operator Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-semibold uppercase">Operator:</span>
            {["All", "Dialog", "SLT-Mobitel", "Airtel", "Hutch"].map((op) => (
              <button
                key={op}
                onClick={() => setSelectedOperator(op)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  selectedOperator === op
                    ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 shadow-sm"
                    : "text-slate-400 hover:text-white hover:bg-slate-800"
                }`}
              >
                {op}
              </button>
            ))}
          </div>

          {/* Technology Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-semibold uppercase">Tech:</span>
            {["All", "4G", "5G"].map((tech) => (
              <button
                key={tech}
                onClick={() => setSelectedTech(tech)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  selectedTech === tech
                    ? "bg-blue-600/30 text-blue-300 border border-blue-500/40"
                    : "text-slate-400 hover:text-white hover:bg-slate-800"
                }`}
              >
                {tech}
              </button>
            ))}
          </div>

          {/* District Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-semibold uppercase">District:</span>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="bg-slate-950 text-white text-xs rounded-lg px-2.5 py-1.5 border border-slate-700 focus:outline-none focus:border-cyan-400"
            >
              {districts.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          {/* Metric Display Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-semibold uppercase">Metric:</span>
            <select
              value={selectedMetric}
              onChange={(e: any) => setSelectedMetric(e.target.value)}
              className="bg-slate-950 text-white text-xs rounded-lg px-2.5 py-1.5 border border-slate-700 focus:outline-none focus:border-cyan-400"
            >
              <option value="download">Download Speed (Mbps)</option>
              <option value="signal">Median Signal (dBm)</option>
              <option value="latency">Median Latency (ms)</option>
            </select>
          </div>
        </div>

        {/* Quick Search */}
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by city or district (e.g. Kandy, Galle, Malabe, Jaffna, Trincomalee)..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
          />
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
        </div>
      </div>

      {/* Main Map + Side Panel Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Interactive Map Canvas Container */}
        <div className="lg:col-span-8 rounded-2xl bg-[#050811] border border-slate-800 p-6 relative min-h-[580px] flex flex-col justify-between overflow-hidden shadow-2xl">
          {/* Subtle Sri Lanka Coordinate Grid Backdrop */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#00f2fe05_1px,transparent_1px),linear-gradient(to_bottom,#00f2fe05_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />

          {/* Map Header */}
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
                Sri Lanka Network Intelligence Grid (All 25 Districts)
              </h3>
              <p className="text-xs text-slate-400">
                1.1km privacy-preserving spatial grid with median crowdsourced benchmarks.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-slate-300 font-mono">
                {filteredTiles.length} Grids Shown
              </span>
            </div>
          </div>

          {/* Interactive Map Representation of Sri Lanka */}
          <div className="relative my-auto w-full h-[420px] flex items-center justify-center">
            {/* SVG Base of Sri Lanka */}
            <svg className="w-[340px] h-[390px] text-slate-800/40" viewBox="0 0 300 400" fill="currentColor">
              <path d="M 150,30 C 180,50 205,115 215,175 C 225,235 205,315 175,370 C 155,395 125,395 115,370 C 85,315 70,245 80,175 C 90,105 120,45 150,30 Z" />
            </svg>

            {/* Grid Markers */}
            {filteredTiles.map((tile) => {
              // Convert lat/lon to map coordinates
              // Sri Lanka bounds: Lat 5.8 to 9.9, Lon 79.5 to 81.9
              const relX = ((tile.longitude - 79.5) / 2.4) * 270 + 25;
              const relY = ((9.8 - tile.latitude) / 3.9) * 350 + 20;
              const isSelected = activeTile?.gridId === tile.gridId;

              const metricValue =
                selectedMetric === "download"
                  ? `${tile.medianDownloadMbps} Mbps`
                  : selectedMetric === "signal"
                  ? `${tile.medianSignalDbm} dBm`
                  : `${tile.medianLatencyMs} ms`;

              return (
                <button
                  key={tile.gridId}
                  onClick={() => setActiveTile(tile)}
                  style={{ left: `${relX}px`, top: `${relY}px` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 z-20 group transition-all cursor-pointer focus:outline-none`}
                >
                  <div className="relative flex flex-col items-center">
                    {/* Pulsing indicator */}
                    <div
                      className={`w-3.5 h-3.5 rounded-full flex items-center justify-center ${
                        isSelected
                          ? "bg-cyan-400 ring-4 ring-cyan-500/40 scale-125"
                          : tile.networkTechnology === "5G"
                          ? "bg-purple-400 ring-2 ring-purple-500/30"
                          : "bg-blue-500 hover:bg-cyan-300"
                      }`}
                    >
                      <div className="w-1 h-1 rounded-full bg-slate-950" />
                    </div>

                    {/* Popover Pill */}
                    <div
                      className={`mt-1 whitespace-nowrap text-[9px] font-mono px-1.5 py-0.5 rounded shadow-md border ${
                        isSelected
                          ? "bg-cyan-950 text-cyan-200 border-cyan-400 font-bold z-30"
                          : "bg-slate-900/90 text-slate-300 border-slate-700 group-hover:border-slate-500"
                      }`}
                    >
                      {tile.locationName}: {metricValue}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Map Legend */}
          <div className="relative z-10 flex flex-wrap items-center justify-between text-xs text-slate-400 border-t border-slate-900 pt-3">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-400"></span> 5G NR Active
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span> 4G LTE Active
              </span>
            </div>
            <div>
              <span>Aggregation: Median Filter (No Outliers)</span>
            </div>
          </div>
        </div>

        {/* Side Panel: Location Details (Specified in Prompt) */}
        <div className="lg:col-span-4 rounded-2xl bg-gradient-to-b from-[#0D1527] to-[#070B14] border border-cyan-500/20 p-6 shadow-2xl backdrop-blur-xl flex flex-col justify-between">
          {activeTile ? (
            <div className="space-y-6">
              {/* Header */}
              <div className="border-b border-slate-800 pb-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                    {activeTile.district} District
                  </span>
                  <span
                    className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border ${
                      activeTile.freshness === "LIVE DEVICE"
                        ? "bg-emerald-950/60 text-emerald-400 border-emerald-500/30 animate-pulse"
                        : "bg-slate-900 text-slate-400 border-slate-700"
                    }`}
                  >
                    {activeTile.freshness}
                  </span>
                </div>
                <h3 className="text-2xl font-black text-white mt-1">{activeTile.locationName}</h3>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-sm font-bold text-cyan-400">{activeTile.operator}</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-cyan-950/50 text-cyan-300 font-mono border border-cyan-500/30">
                    {activeTile.networkTechnology} NR/LTE
                  </span>
                </div>
              </div>

              {/* Median Telemetry Stats */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800">
                  <div className="text-slate-400 text-[11px]">Median Signal</div>
                  <div className="text-lg font-bold font-mono text-cyan-400 mt-1">
                    {activeTile.medianSignalDbm} dBm
                  </div>
                  {activeTile.medianRsrp && (
                    <div className="text-[10px] text-slate-500 mt-0.5">RSRP: {activeTile.medianRsrp} dBm</div>
                  )}
                </div>

                <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800">
                  <div className="text-slate-400 text-[11px]">Median Download</div>
                  <div className="text-lg font-bold font-mono text-emerald-400 mt-1">
                    {activeTile.medianDownloadMbps} Mbps
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Upload: {activeTile.medianUploadMbps} Mbps</div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800">
                  <div className="text-slate-400 text-[11px]">Median Ping</div>
                  <div className="text-lg font-bold font-mono text-indigo-300 mt-1">
                    {activeTile.medianLatencyMs} ms
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Application RTT</div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800">
                  <div className="text-slate-400 text-[11px]">Crowd Validation</div>
                  <div className="text-sm font-bold text-white mt-1">
                    {activeTile.sampleCount} Tests
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">{activeTile.deviceCount} Unique Devices</div>
                </div>
              </div>

              {/* Confidence & Freshness Breakdown */}
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Confidence Rating:</span>
                  <span className="font-bold text-emerald-400 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    {activeTile.confidence}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Last Measured:</span>
                  <span className="text-slate-200 font-mono">{activeTile.latestMeasurementTimestamp}</span>
                </div>
              </div>

              {/* Buttons */}
              <div className="space-y-2 pt-2">
                <Link
                  href={`/compare?district=${activeTile.district}&location=${encodeURIComponent(activeTile.locationName)}`}
                  className="w-full py-2.5 rounded-xl text-xs font-bold bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 flex items-center justify-center gap-2 transition-all"
                >
                  <BarChart2 className="w-4 h-4" />
                  <span>COMPARE OPERATORS AT THIS LOCATION</span>
                </Link>

                <Link
                  href="/history"
                  className="w-full py-2.5 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 flex items-center justify-center gap-2 transition-all"
                >
                  <Clock className="w-4 h-4 text-slate-400" />
                  <span>VIEW LOCATION HISTORY</span>
                </Link>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-slate-400 text-xs">
              Select a grid point on the map to inspect verified measurements.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
