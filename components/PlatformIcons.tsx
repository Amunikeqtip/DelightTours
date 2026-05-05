import Image from "next/image";

type Platform = {
  name: string;
  src: string;
  width: number;
  height: number;
};

const platforms: Platform[] = [
  {
    name: "Viator",
    src: "/platforms/viator.svg",
    width: 112,
    height: 32,
  },
  {
    name: "Bokun",
    src: "/platforms/bokun.png",
    width: 112,
    height: 32,
  },
  {
    name: "Tripadvisor",
    src: "/platforms/tripadvisor.svg",
    width: 32,
    height: 32,
  },
  {
    name: "GetYourGuide",
    src: "/platforms/getyourguide.svg",
    width: 112,
    height: 40,
  },
];

function PlatformLogo({
  platform,
  compact,
}: {
  platform: Platform;
  compact: boolean;
}) {
  return (
    <span
      className={
        compact
          ? "flex h-8 items-center justify-center"
          : "flex h-11 min-w-0 flex-1 items-center justify-center rounded-md border border-border bg-white px-3 py-2 shadow-sm sm:h-12 sm:flex-none sm:px-4"
      }
      title={platform.name}
    >
      <Image
        src={platform.src}
        alt={platform.name}
        width={platform.width}
        height={platform.height}
        className={compact ? "h-5 w-auto object-contain sm:h-6" : "max-h-6 max-w-[108px] object-contain sm:max-h-7 sm:max-w-[128px]"}
      />
    </span>
  );
}

export default function PlatformIcons({
  compact = false,
  include = platforms.map((platform) => platform.name),
}: {
  compact?: boolean;
  include?: string[];
}) {
  const selected = platforms.filter((platform) => include.includes(platform.name));

  return (
    <div className={compact ? "flex flex-wrap items-center justify-center gap-2 sm:gap-3" : "grid w-full grid-cols-2 gap-2 sm:flex sm:w-auto sm:flex-wrap sm:items-center sm:gap-3"}>
      {selected.map((platform) => (
        <PlatformLogo key={platform.name} platform={platform} compact={compact} />
      ))}
    </div>
  );
}
