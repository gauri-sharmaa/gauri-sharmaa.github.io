import InterestMap, { KindGlyph } from "@/components/InterestMap";
import type { MapNodeKind } from "@/data/interestMap";

const KINDS: { kind: MapNodeKind; label: string }[] = [
  { kind: "interest", label: "Interest" },
  { kind: "topic", label: "Topic" },
  { kind: "project", label: "Project" },
  { kind: "experience", label: "Experience" },
  { kind: "writing", label: "Writing" },
];

// The layout puts graph paper behind this whole page; the map fills it edge to edge.
const MapPage = () => {
  return (
    <div className="flex flex-col">
      <div className="container mx-auto px-4 pt-10 pb-4">
        <h1 className="text-4xl font-bold mb-4">How it all connects</h1>
        <p className="text-lg text-muted-foreground mb-4 max-w-3xl">
          It's hard to keep my projects siloed, and a one-page resume can't capture everything (even with
          maxed-out margins)
        </p>
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          {KINDS.map(({ kind, label }) => (
            <span key={kind} className="flex items-center gap-1.5">
              <KindGlyph kind={kind} />
              {label}
            </span>
          ))}
        </div>
      </div>
      <div className="w-full h-[78vh] min-h-[480px]">
        <InterestMap page />
      </div>
      <p className="container mx-auto px-4 py-4 text-sm text-muted-foreground md:hidden">
        Swipe sideways or pinch to move around the map, or tap the expand button in the corner to explore it full screen.
      </p>
    </div>
  );
};

export default MapPage;
