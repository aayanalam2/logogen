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
    <div className="flex flex-col gap-7">
      <div>
        <p className="text-xs font-medium text-zinc-400 uppercase tracking-widest mb-2">
          Your logo
        </p>
        <h2 className="text-xl font-semibold text-zinc-900 tracking-tight">
          {businessName}
        </h2>
      </div>

      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="rounded-xl border border-zinc-100 bg-zinc-50 overflow-hidden flex items-center justify-center p-6"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt={`${businessName} logo`}
          className="w-56 h-56 object-contain"
        />
      </motion.div>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col gap-2"
      >
        <Button onClick={handleDownload} size="lg" className="w-full">
          Download PNG
        </Button>
        <div className="flex gap-2">
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

