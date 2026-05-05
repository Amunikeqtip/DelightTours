type Platform = {
  name: string;
  color: string;
  textColor: string;
  path: string;
};

const platforms: Platform[] = [
  {
    name: "Viator",
    color: "#1F8A70",
    textColor: "#FFFFFF",
    path: "M8 5.5h4.1l3.4 10.4 3.4-10.4H23l-5.4 15h-4.2L8 5.5Z",
  },
  {
    name: "Bokun",
    color: "#1D4E89",
    textColor: "#FFFFFF",
    path: "M9 5.5h7.2c3.1 0 5 1.6 5 4 0 1.5-.8 2.7-2.1 3.2 1.8.5 2.9 1.8 2.9 3.7 0 2.6-2.1 4.1-5.5 4.1H9v-15Zm6.7 6c1.2 0 1.9-.6 1.9-1.6s-.7-1.6-1.9-1.6h-3v3.2h3Zm.5 6.2c1.4 0 2.2-.7 2.2-1.8s-.8-1.8-2.2-1.8h-3.5v3.6h3.5Z",
  },
  {
    name: "Tripadvisor",
    color: "#00AA6C",
    textColor: "#FFFFFF",
    path: "M8.2 9.3c1.1-1.4 2.7-2.2 4.6-2.2 1.2 0 2.3.3 3.2 1 1-.7 2-1 3.2-1 1.9 0 3.5.8 4.6 2.2l1.7-1.8h-5.1V5h-8.8v2.5H6.5l1.7 1.8Zm4.6 9.9a3.7 3.7 0 1 0 0-7.4 3.7 3.7 0 0 0 0 7.4Zm6.4 0a3.7 3.7 0 1 0 0-7.4 3.7 3.7 0 0 0 0 7.4Zm-6.4-2.3a1.4 1.4 0 1 1 0-2.8 1.4 1.4 0 0 1 0 2.8Zm6.4 0a1.4 1.4 0 1 1 0-2.8 1.4 1.4 0 0 1 0 2.8Z",
  },
  {
    name: "GetYourGuide",
    color: "#FF5A1F",
    textColor: "#FFFFFF",
    path: "M16 4.5c5 0 9 3.6 9 8.1 0 3.5-2.4 6.5-5.8 7.6l-3.2 3.3-3.2-3.3C9.4 19.1 7 16.1 7 12.6c0-4.5 4-8.1 9-8.1Zm0 3.2c-3.1 0-5.6 2.2-5.6 4.9 0 2.8 2.5 5 5.6 5s5.6-2.2 5.6-5c0-2.7-2.5-4.9-5.6-4.9Zm0 2.1 1.1 2.1 2.3.3-1.7 1.6.4 2.3-2.1-1.1-2.1 1.1.4-2.3-1.7-1.6 2.3-.3L16 9.8Z",
  },
];

function PlatformIcon({ platform }: { platform: Platform }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-md border border-border bg-white px-3 py-2 shadow-sm">
      <span
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-sm"
        style={{ backgroundColor: platform.color }}
        aria-hidden="true"
      >
        <svg viewBox="0 0 32 32" className="h-6 w-6" role="img">
          <path d={platform.path} fill={platform.textColor} />
        </svg>
      </span>
      <span className="text-sm font-bold text-foreground/75">{platform.name}</span>
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

  if (compact) {
    return (
      <span className="inline-flex items-center gap-2">
        {selected.map((platform) => (
          <span
            key={platform.name}
            className="flex h-7 w-7 items-center justify-center rounded-sm"
            style={{ backgroundColor: platform.color }}
            title={platform.name}
            aria-label={platform.name}
          >
            <svg viewBox="0 0 32 32" className="h-5 w-5" role="img">
              <path d={platform.path} fill={platform.textColor} />
            </svg>
          </span>
        ))}
      </span>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      {selected.map((platform) => (
        <PlatformIcon key={platform.name} platform={platform} />
      ))}
    </div>
  );
}
