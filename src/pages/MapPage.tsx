import InterestMap, { KindGlyph } from "@/components/InterestMap";
import type { MapNodeKind } from "@/data/interestMap";

const KINDS: { kind: MapNodeKind; label: string }[] = [
  { kind: "interest", label: "Interest" },
  { kind: "topic", label: "Topic" },
  { kind: "project", label: "Project" },
  { kind: "experience", label: "Experience" },
  { kind: "writing", label: "Writing" },
];

const MapPage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">How it all connects</h1>
        <p className="text-lg text-muted-foreground mb-4 max-w-3xl">
          It's hard to keep my projects siloed, and a one-page resume can't capture everything, even with
          maxed-out margins!
        </p>
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
          {KINDS.map(({ kind, label }) => (
            <span key={kind} className="flex items-center gap-1.5">
              <KindGlyph kind={kind} />
              {label}
            </span>
          ))}
        </div>
        <div className="h-[65vh] md:h-[70vh] min-h-[440px]">
          <InterestMap />
        </div>
        <p className="mt-3 text-sm text-muted-foreground md:hidden">
          Swipe sideways or pinch to move around the map, or tap the expand button in the corner to explore it full screen.
        </p>
      </div>
    </div>
  );
};

export default MapPage;
