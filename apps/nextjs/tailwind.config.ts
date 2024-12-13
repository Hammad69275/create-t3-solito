import baseConfig from "@acme/tailwind-config/web";
import type { Config } from "tailwindcss";
// @ts-expect-error - no types
import nativewind from "nativewind/preset";

export default {
  // We need to append the path to the UI package to the content array so that
  // those classes are included correctly.
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "../../packages/ui/screens/**/*.{ts,tsx}"],
  presets: [baseConfig, nativewind],
  important: 'html',
} satisfies Config;
