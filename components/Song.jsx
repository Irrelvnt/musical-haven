import Image from "next/image";

export default function Song({ title, artist, cover, time }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex gap-4 ">
        <div className="m-auto">
          <Image src={cover} width={50} height={50} alt="cover" />
        </div>
        <div className="flex flex-col justify-between px-2">
          <p className="font-semibold text-lg">{title}</p>
          <p className="font-bold text-sm text-textlight">{artist}</p>
        </div>
      </div>
      <p className="font-bold text-sm text-textlight">{time}</p>
    </div>
  );
}
