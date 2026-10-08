import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { PhotoReel } from "@/components/photo-reel";
import { useCinematicMotion } from "@/components/cinematic-motion";
import { categories, photographs } from "@/lib/photography";

export const Route = createFileRoute("/portfolio")({
 head: () => ({ meta: [
  { title: "The Portfolio — Éloise Photography" },
  { name: "description", content: "A world of weddings, portraits, lifestyle and editorial photography. Explore the Éloise concept portfolio." },
  { property: "og:title", content: "The Portfolio — Éloise Photography" },
  { property: "og:description", content: "People, places, and everything in between. Explore weddings, portraits, lifestyle and editorial stories." },
  { property: "og:type", content: "website" },
  { name: "twitter:card", content: "summary_large_image" },
 ] }),
 component: Portfolio,
});
function Portfolio() {
 const [category, setCategory] = useState<string>("All work");
 const [viewer, setViewer] = useState<number | null>(null);
 const scope = useRef<HTMLDivElement>(null);
 useCinematicMotion(scope, category);
 return <div className="portfolio-page" ref={scope}>
  <header className="portfolio-nav"><Link to="/" className="wordmark">éloise<small>PHOTOGRAPHY</small></Link><Button variant="link" className="text-link" asChild><Link to="/"><ArrowLeft /> The wedding edit</Link></Button></header>
  <main><section className="section-inner portfolio-intro"><div className="section-label"><span />SELECTED PHOTOGRAPHY</div><h1>Life, in all<br /><em>its beautiful forms.</em></h1><p>People. Places. The feeling in between.</p><div className="portfolio-filters" role="group" aria-label="Photography category">{categories.map(item => <Button key={item} variant="concept" aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</Button>)}</div></section>
   <div className="portfolio-grid section-inner">{photographs.map((photo,index) => category !== "All work" && category !== photo.category ? null : <article className="portfolio-item scroll-reveal" key={`${category}-${photo.title}`}><div className="portfolio-image"><img src={photo.image} alt={photo.title} width={1536} height={1024} loading="lazy" /><Button variant="navigation" aria-label={`Open ${photo.title}`} onClick={() => setViewer(index)}><ArrowRight /></Button></div><div className="reel-caption"><h2>{photo.title}</h2><span>{photo.category}</span></div><p>{photo.description}</p></article>)}</div>
  </main>
  <footer className="footer"><Link to="/" className="wordmark">éloise</Link><span>Weddings · Portraits · Lifestyle · Editorial</span><span>Made with feeling.</span></footer>
  <Dialog open={viewer !== null} onOpenChange={open=>{if(!open)setViewer(null);}}><DialogContent className="gallery-dialog"><DialogTitle className="dialog-heading">Through the lens.</DialogTitle><DialogDescription>The photography collection.</DialogDescription>{viewer !== null && <PhotoReel startIndex={viewer} modal />}</DialogContent></Dialog>
 </div>;
}
