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
          A map of my interests and the projects, roles, and writing that tie them together.
          Drag to move around, scroll or pinch to zoom, and select anything to see what it links to.
        </p>
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
          {KINDS.map(({ kind, label }) => (
            <span key={kind} className="flex items-center gap-1.5">
              <KindGlyph kind={kind} />
              {label}
            </span>
          ))}
        </div>
        <div className="h-[70vh] min-h-[480px]">
          <InterestMap />
        </div>
      </div>
    </div>
  );
};

export default MapPage;
