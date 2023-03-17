import Image from "next/image";
import { BsCheck } from "react-icons/bs";

export default function Song({ title, artist, cover, time, selected }) {
  return (
    <div className="flex items-center justify-between rounded-md">
      <div className="flex gap-4">
        <div className="m-auto relative">
          {selected && (
            <>
              <div className="bg-black/40 absolute z-10 inset-0 w-full h-full" />
              <BsCheck className="fill-white absolute z-20 inset-0 flex items-center jusitfy-center w-full h-full" />
            </>
          )}

          <Image
            src={cover}
            width={50}
            height={50}
            alt="cover"
            className="rounded-lg"
          />
        </div>
        <div className="flex flex-col justify-around px-2">
          <p className="font-semibold text-lg">{title}</p>
          <p className="font-semibold text-sm text-textlight">{artist}</p>
        </div>
      </div>
      <p className="font-bold text-sm text-textlight">{time}</p>
    </div>
  );
}
