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
          : "flex h-12 items-center justify-center rounded-md border border-border bg-white px-4 py-2 shadow-sm"
      }
      title={platform.name}
    >
      <Image
        src={platform.src}
        alt={platform.name}
        width={platform.width}
        height={platform.height}
        className={compact ? "h-6 w-auto object-contain" : "max-h-7 w-auto object-contain"}
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
    <div className={compact ? "flex items-center gap-3" : "flex flex-wrap items-center gap-3"}>
      {selected.map((platform) => (
        <PlatformLogo key={platform.name} platform={platform} compact={compact} />
      ))}
    </div>
  );
}
