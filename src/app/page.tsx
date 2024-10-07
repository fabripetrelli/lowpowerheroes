import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-black">
      <Image
        src="/assets/IMG_0902.png"
        alt="coming soon..."
        width={5184}
        height={3456}
      />
    </div>
  );
}
