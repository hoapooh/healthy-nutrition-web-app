import Image from "next/image";
import { AuthStatusIndicator } from "@/features/shared/ui/components/auth-status-indicator";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8">
      <div className="flex items-center justify-center gap-x-2">
        <h1 className="text-2xl font-bold">Welcome to Healthy Nutrition!</h1>
        <Image
          src="/next.svg"
          alt="Next.js Logo"
          height={0}
          width={0}
          style={{ width: "64px", height: "auto" }}
        />
      </div>

      <p className="text-gray-500">Your health and nutrition companion.</p>

      {/* Auth Status Indicator */}
      <div className="flex flex-col items-center gap-2">
        <p className="text-sm text-gray-600">Authentication Status:</p>
        <AuthStatusIndicator />
      </div>
    </div>
  );
}
