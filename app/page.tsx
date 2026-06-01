import Wizard from "@/components/Wizard";

export default function Home() {
  return (
    <main className="min-h-dvh w-full bg-brand-gradient flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-[540px]">
        <Wizard />
      </div>
    </main>
  );
}
