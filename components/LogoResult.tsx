"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";

interface LogoResultProps {
  image: string;
  businessName: string;
  onRegenerate: () => void;
  onReset: () => void;
}

export default function LogoResult({
  image,
  businessName,
  onRegenerate,
  onReset,
}: LogoResultProps) {
  const handleDownload = () => {
    const a = document.createElement("a");
    a.href = image;
    a.download = `${businessName.toLowerCase().replace(/\s+/g, "-")}-logo.png`;
    a.click();
  };

  return (
    <div className="flex flex-col gap-10">
      <div>
        <p className="font-mono text-[10px] text-zinc-600 uppercase tracking-[0.15em] mb-2">
          Your logo
        </p>
        <h2 className="font-display italic text-[1.75rem] leading-tight text-white">
          {businessName}
        </h2>
      </div>

      {/* Logo — white frame for AI-generated white-background image */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="rounded-xl bg-white p-8 aspect-square flex items-center justify-center"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt={`${businessName} logo`}
          className="w-full h-full object-contain"
        />
      </motion.div>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col gap-2.5"
      >
        <Button onClick={handleDownload} size="lg" className="w-full">
          Download PNG
        </Button>
        <div className="flex gap-2.5">
          <Button variant="secondary" onClick={onRegenerate} size="lg" className="flex-1">
            Try again
          </Button>
          <Button variant="ghost" onClick={onReset} size="lg" className="flex-1">
            Start over
          </Button>
        </div>
      </motion.div>
    </div>
  );
}

