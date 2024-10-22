// "use client";

import { motion } from "framer-motion";

export default function AnimatedText({
  text,
  isCollapsed,
  className,
}: {
  text: string;
  isCollapsed: boolean;
  className?: string;
}) {
  return (
    <motion.span
      initial={{ opacity: 0 }} // Start hidden
      animate={{ opacity: isCollapsed ? 0 : 1 }} // Fade in
      exit={{ opacity: 0 }} // Fade out
      transition={{
        duration: 0.5,
        delay: isCollapsed ? 0.1 : 0.2, // Sequential delay for entrance and reverse for exit
      }}
      className={`inline-block ${className}`}
    >
      {text}
    </motion.span>
  );
}

export function encodeQueryString(params: any) {
  const keys = Object.keys(params);
  return keys.length
    ? "?" +
        keys
          .map(
            (key) =>
              encodeURIComponent(key) + "=" + encodeURIComponent(params[key])
          )
          .join("&")
    : "";
}

interface SvgIconComponentProps {
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>; // The SVG icon component type
  color?: string; // Optional color prop
  size?: number; // Optional size prop
  className?: string; // Optional className prop
}

export const SvgIconComponent: React.FC<SvgIconComponentProps> = ({
  Icon,
  color = "black", // default color is black
  size = 24, // default size is 24
  className = "",
}) => {
  return (
    <div
      className={`icon-container ${className}`}
      style={{
        width: size,
        height: size,
      }}
    >
      {/* Icon as React component with size and color applied */}
      <Icon width={size} height={size} style={{ fill: color }} />
    </div>
  );
};
