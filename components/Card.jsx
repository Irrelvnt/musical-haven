import Image from "next/image";
import Link from "next/link";

export default function Card({ title, image, link = "/" }) {
  return (
    <Link href={link}>
      <div className="relative w-36 h-36 bg-card rounded-md hover:scale-105">
        <div className="sm:block absolute inset-0 z-30 hover:bg-primary/10 transition rounded-md" />
        <div className="absolute z-10 inset-0 bg-gradient-to-t from-black/100 via-black/0 to-black/0 rounded-md" />
        <Image
          src={image}
          width={300}
          height={300}
          alt="card"
          className="absolute inset-0 rounded-md"
        />
        <p className="absolute z-30 bottom-3 left-5 font-semibold text-sm text-white">
          {title}
        </p>
      </div>
    </Link>
  );
}
