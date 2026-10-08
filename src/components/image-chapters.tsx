import { embrace, sequenceTitles } from "@/lib/photography";
import { concepts, type WeddingConcept } from "@/lib/wedding-concepts";

export function ImageChapters({ concept }: { concept: WeddingConcept }) {
  const titles = sequenceTitles[concept.id];
  const images = [concept.image, embrace, concepts[concept.id === "adventure" ? 0 : 2].image];
  return <section className="image-chapters" aria-label="A story in three frames"><div className="chapter-stage">
    {images.map((image, index) => <div className="chapter-panel" key={`${concept.id}-${index}`}>
      <img className="chapter-photo" src={image} alt={index === 1 ? "A joyful, candid wedding embrace" : "A cinematic wedding portrait"} width={1920} height={1088} loading="lazy" />
      <div className="chapter-shade" /><div className="chapter-text"><span className="eyebrow">A STORY IN THREE FRAMES · 0{index + 1}</span><h2>{titles[index]}</h2><p>{["Before the world falls away.", "The moments you can’t rehearse.", "A feeling that stays with you."][index]}</p></div>
    </div>)}
    <div className="chapter-rail"><span>THE WEDDING EDIT</span><div><i className="chapter-progress" /></div><span>01 — 03</span></div>
  </div></section>;
}