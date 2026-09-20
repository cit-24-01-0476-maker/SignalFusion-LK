/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navyDark: "#070B14",
          navyCard: "#0D1527",
          navyCardHover: "#131F38",
          navyBorder: "rgba(0, 242, 254, 0.15)",
          navyBorderSubtle: "rgba(255, 255, 255, 0.08)",
          surfaceGlass: "rgba(13, 21, 39, 0.72)",
        },
        cyan: {
          glow: "rgba(0, 242, 254, 0.35)",
          bright: "#00F2FE",
        },
        electric: "#2563EB",
        operator: {
          dialog: "#ED1C24",
          mobitel: "#00875A",
          airtel: "#E51937",
          hutch: "#FF6600",
        },
      },
      fontFamily: {
        sans: ["system-ui", "-apple-system", "BlinkMacSystemFont", "'Segoe UI'", "Roboto", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'radar-sweep': 'sweep 4s linear infinite',
      },
      keyframes: {
        sweep: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        }
      }
    },
  },
  plugins: [],
}
