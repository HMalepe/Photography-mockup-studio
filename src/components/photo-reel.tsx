import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { photographs } from "@/lib/photography";

export function PhotoReel({ onOpen, startIndex = 0, modal = false }: { onOpen?: (index: number) => void; startIndex?: number; modal?: boolean }) {
  const [ref, api] = useEmblaCarousel({ loop: true, align: "center", startIndex, duration: 35 });
  const [selected, setSelected] = useState(startIndex);
  const onSelect = useCallback(() => { if (api) setSelected(api.selectedScrollSnap()); }, [api]);
  useEffect(() => { if (!api) return; onSelect(); api.on("select", onSelect); return () => { api.off("select", onSelect); }; }, [api, onSelect]);
  return <div className={`photo-reel ${modal ? "photo-reel-modal" : ""}`} role="region" aria-label={modal ? "Photo viewer" : "Photography collection"} aria-roledescription="carousel" onKeyDown={event => { if (event.key === "ArrowRight") api?.scrollNext(); if (event.key === "ArrowLeft") api?.scrollPrev(); }}>
    <div className="reel-viewport" ref={ref} data-lenis-prevent><div className="reel-track">{photographs.map((photo, index) => <div className={`reel-slide ${selected === index ? "is-selected" : ""}`} key={photo.title} role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${photographs.length}`}>
      <div className="reel-image-wrap"><img src={photo.image} alt={photo.title} width={1536} height={1024} loading={modal ? "eager" : "lazy"} draggable={false} />{onOpen && <Button variant="navigation" className="reel-open" aria-label={`View ${photo.title}`} onClick={() => onOpen(index)}><ArrowRight /></Button>}</div>
      <div className="reel-caption"><h3>{photo.title}</h3><span>{photo.category}</span></div>
    </div>)}</div></div>
    <div className="reel-controls"><div className="reel-pagination" aria-live="polite"><span>{String(selected + 1).padStart(2, "0")}</span><div className="reel-progress"><i style={{ transform: `scaleX(${(selected + 1) / photographs.length})` }} /></div><span>{String(photographs.length).padStart(2, "0")}</span></div><div className="reel-arrows"><Button variant="outline" size="icon" title="Previous photograph" aria-label="Previous photograph" onClick={() => api?.scrollPrev()}><ArrowLeft /></Button><Button variant="outline" size="icon" title="Next photograph" aria-label="Next photograph" onClick={() => api?.scrollNext()}><ArrowRight /></Button></div></div>
  </div>;
}