"use client";

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
  console.log("ttttttttttttttt  ,  ", text);
  return (
    <div className="flex">
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
    </div>
  );
}
