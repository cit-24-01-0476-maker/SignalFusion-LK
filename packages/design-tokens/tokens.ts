export const tokens = {
  colors: {
    brand: {
      navyDark: "#070B14",
      navyCard: "#0D1527",
      navyCardHover: "#131F38",
      navyBorder: "rgba(0, 242, 254, 0.15)",
      navyBorderSubtle: "rgba(255, 255, 255, 0.08)",
      surfaceGlass: "rgba(13, 21, 39, 0.72)",
    },
    accent: {
      cyan: "#00F2FE",
      cyanGlow: "rgba(0, 242, 254, 0.4)",
      electricBlue: "#2563EB",
      blueGlow: "rgba(37, 99, 235, 0.35)",
    },
    operators: {
      dialog: {
        name: "Dialog",
        brandColor: "#ED1C24",
        accent: "#F87171",
        mcc: "413",
        mnc: "02",
      },
      mobitel: {
        name: "SLT-Mobitel",
        brandColor: "#00875A",
        accent: "#34D399",
        mcc: "413",
        mnc: "01",
      },
      airtel: {
        name: "Airtel",
        brandColor: "#E51937",
        accent: "#FB7185",
        mcc: "413",
        mnc: "05",
      },
      hutch: {
        name: "Hutch",
        brandColor: "#FF6600",
        accent: "#FDBA74",
        mcc: "413",
        mnc: "08",
      },
    },
    status: {
      success: "#10B981",
      warning: "#F59E0B",
      critical: "#EF4444",
      neutral: "#64748B",
    },
    text: {
      primary: "#F8FAFC",
      secondary: "#94A3B8",
      muted: "#64748B",
      highlight: "#00F2FE",
    },
  },
  typography: {
    fontFamily: {
      sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      mono: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
    },
  },
  effects: {
    glassBackdrop: "backdrop-blur-md bg-opacity-75",
    glowCyan: "0 0 20px rgba(0, 242, 254, 0.25)",
    glowBlue: "0 0 20px rgba(37, 99, 235, 0.3)",
  },
} as const;

export default tokens;
