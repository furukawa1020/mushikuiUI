"use client";

import { motion } from "framer-motion";

interface PresenceOrbProps {
  seed?: string;
  size?: "sm" | "md" | "lg";
}

export default function PresenceOrb({ seed = "default", size = "md" }: PresenceOrbProps) {
  const sizeMap = {
    sm: "w-12 h-12",
    md: "w-24 h-24",
    lg: "w-32 h-32",
  };

  return (
    <div className={`relative flex items-center justify-center ${sizeMap[size]}`}>
      {/* Outer glow */}
      <motion.div
        className="absolute inset-0 rounded-full bg-accent-gold/20 blur-xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Core orb */}
      <motion.div
        className="relative w-[80%] h-[80%] rounded-full bg-gradient-to-tr from-[#E7DED2] via-accent-gold/40 to-[#FFFDF9] shadow-inner"
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Subtle interior movements */}
        <motion.div
          className="absolute inset-2 rounded-full bg-white/30 blur-md"
          animate={{
            x: [-2, 2, -2],
            y: [-2, 2, -2],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </motion.div>
    </div>
  );
}
