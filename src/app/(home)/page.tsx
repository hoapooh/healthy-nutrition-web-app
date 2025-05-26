import Image from "next/image";

export default function Home() {
  return (
    <div className="flex items-center justify-center gap-x-2">
      <h1 className="text-2xl font-bold">Welcome to Next.js!</h1>

      <p className="text-gray-500">This is a simple example.</p>

      <Image
        src="/next.svg"
        alt="Next.js Logo"
        width={64}
        height={64}
        className="h-16 w-16"
      />
    </div>
  );
}
