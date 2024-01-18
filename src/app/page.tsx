import { Button } from "@/components/ui/button";
import Image from "next/image";
import TypeWriterTitle from "@/components/ui/TypeWriterTitle";

export default function Home() {
  return (
    <main>
      <div className="bg-gradient-to-r min-h-screen from-violet-100 to-blue-100">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <h1 className="font-semibold text-7xl text-center">
            AI powered
            <span className="font-bold text-purple-600"> notebook</span>
          </h1>
          <div className="mt-6" />
          <h2 className="font-semibold text-3xl text-center text-slate-600">
            <TypeWriterTitle strings={["✒️ Better note taking", "✒️ Enhance your productivity", "✒️ Let your creativity flow"]} />
          </h2> 
        </div>
      </div>
    </main>
  );
}
