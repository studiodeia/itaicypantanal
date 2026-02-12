module.exports = {
  content: ["./client/index.html", "./client/src/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{html,js,ts,jsx,tsx}",
    "app/**/*.{ts,tsx}",
    "components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "body-lg": "var(--body-lg-font-family)",
        "body-md": "var(--body-md-font-family)",
        "body-sm": "var(--body-sm-font-family)",
        "body-xs": "var(--body-xs-font-family)",
        "display-lg": "var(--display-lg-font-family)",
        "functional-sm": "var(--functional-sm-font-family)",
        "functional-md": "var(--functional-md-font-family)",
        "functional-lg": "var(--functional-lg-font-family)",
        "heading-lg": "var(--heading-lg-font-family)",
        "heading-md": "var(--heading-md-font-family)",
        "heading-sm": "var(--heading-sm-font-family)",
        "lead-md": "var(--lead-md-font-family)",
        sans: [
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Paleta Pantanal (100% alinhada com Figma)
        pantanal: {
          dark: {
            primary: "#152218",      // Green/900
            secondary: "#263a30",    // Background/Section/Primary
            overlay: "rgba(10, 19, 12, 0.2)",      // Special/transparent
            overlayHeavy: "rgba(10, 19, 12, 0.4)", // Special/transparent 2
          },
          medium: "#344e41",         // Background/Section/Secondary
          cream: "#fcf4ed",          // Background/Section/Light (NaturalRefuge)
          light: {
            primary: "#e3f7ec",      // Text/primary (on dark bg)
            secondary: "#f2fcf7",    // Text/Contrast (on dark bg)
            muted: "#a8cab9",        // Text/tertiary (on dark bg)
            tertiary: "#cfebdd",     // Text/secondary (on dark bg)
            highlight: "#d7a45d",    // Text/highlight - gold accent
            quarternary: "#6c927f",  // Text/quarternary - subtle numbers
            numberMuted: "#8aad9c",  // Text/number-muted (light section numbers)
          },
          gold: {
            DEFAULT: "#ac8042",      // Background/Component/btn
            hover: "#8f6a35",        // Background/Component/btn hover
          },
          border: {
            light: "#446354",        // Stroke/divider
            primary: "#f2fcf7",      // Stroke/contrast
            muted: "#a8cab9",        // Stroke/muted (feature lists, footer)
          },
          // Cores para tema claro (cream section)
          darkText: {
            primary: "#263a30",      // Text/primary on light bg
            secondary: "#446354",    // Text/secondary on light bg
            muted: "#8aad9c",        // Text/muted on light bg
          },
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
    container: { center: true, padding: "2rem", screens: { "2xl": "1400px" } },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
    require("./.interface-design/utilities"),
  ],
  darkMode: ["class"],
};
