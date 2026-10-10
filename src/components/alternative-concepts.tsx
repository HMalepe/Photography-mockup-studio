import { Link } from "@tanstack/react-router";
import { ArrowDown, ArrowUpRight, Compass, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PhotoReel } from "@/components/photo-reel";
import { ImageChapters } from "@/components/image-chapters";
import { photographs, embrace } from "@/lib/photography";
import { type WeddingConcept } from "@/lib/wedding-concepts";

type ConceptProps = {
  concept: WeddingConcept;
  menu: boolean;
  onMenu: () => void;
  onCloseMenu: () => void;
  onInquiry: () => void;
  onOpen: (index: number) => void;
};

export function EditorialWebsite({ concept, menu, onMenu, onCloseMenu, onInquiry, onOpen }: ConceptProps) {
  return <main className="editorial-website">
    <header className="edition-header">
      <Link to="/" className="edition-logo">É / P</Link>
      <span className="edition-kicker">INDEPENDENT PHOTOGRAPHER<br />WEDDINGS & THE WORLD BEYOND</span>
      <nav aria-label="Main navigation" className={`edition-nav ${menu ? "is-open" : ""}`}>
        <Button variant="link" asChild><a href="#selected" onClick={onCloseMenu}>Selected work</a></Button>
        <Button variant="link" asChild><a href="#perspective" onClick={onCloseMenu}>Perspective</a></Button>
        <Button variant="link" onClick={onInquiry}>Get in touch <ArrowUpRight /></Button>
      </nav>
      <Button variant="link" size="icon" className="alternative-menu" aria-label={menu ? "Close menu" : "Open menu"} aria-expanded={menu} onClick={onMenu}>{menu ? <X /> : <Menu />}</Button>
    </header>
    <section className="edition-front">
      <div className="edition-masthead"><h1>ÉLOISE</h1><span>PHOTOGRAPHY<br />WITH A POINT<br />OF VIEW.</span></div>
      <div className="edition-rule"><span>THE WEDDING ISSUE</span><span>LOVE, IN ITS OWN LIGHT.</span><span>VOL. 02</span></div>
      <div className="editorial-cover"><img className="editorial-cover-photo" src={concept.image} alt={`${concept.couple} in Paris`} width={1920} height={1088} fetchPriority="high" /><div className="edition-cover-caption"><span>ON THE COVER</span><h2>{concept.couple}</h2><Button variant="navigation" size="icon" aria-label={`View ${concept.couple}'s story`} onClick={() => onOpen(1)}><ArrowUpRight /></Button></div></div>
      <div className="edition-subline"><p>An editorial eye.<br /><em>An honest heart.</em></p><span>FASHION IN THE FRAME.<br />REAL LIFE AT THE CENTRE.</span><a href="#selected" aria-label="Scroll to selected work"><ArrowDown /></a></div>
    </section>
    <section id="selected" className="edition-work">
      <div className="edition-section-title scroll-reveal"><span>01 / SELECTED WORK</span><h2>The contact sheet.</h2><Button variant="link" asChild><Link to="/portfolio">Full portfolio <ArrowUpRight /></Link></Button></div>
      <PhotoReel startIndex={1} onOpen={onOpen} />
    </section>
    <section id="perspective" className="edition-perspective">
      <div className="edition-manifesto scroll-reveal"><span>02 / THE PERSPECTIVE</span><h2>A little fashion.<br />A lot of <em>feeling.</em></h2><p>{concept.about}</p><Button variant="link" onClick={onInquiry}>Start a conversation <ArrowUpRight /></Button></div>
      <figure className="edition-portrait scroll-reveal"><img src={photographs[6]?.image} alt="Expressive fashion portrait in vibrant colour" width={1536} height={1024} loading="lazy" /><figcaption>FIG. 02 — FORM, LIGHT & EXPRESSION</figcaption></figure>
    </section>
    <section className="edition-diptych"><figure className="scroll-reveal"><img src={embrace} alt="An unrehearsed wedding embrace" width={1536} height={1024} loading="lazy" /><figcaption>THE UNSCRIPTED MOMENT / 01</figcaption></figure><div className="scroll-reveal"><span>NOT PERFECTLY POSED.<br />PERFECTLY YOU.</span><h2>A love story.<br />A work of art.</h2><p>{concept.description}</p><Button variant="link" onClick={() => onOpen(3)}>Inside the story <ArrowUpRight /></Button></div></section>
    <footer className="edition-footer"><span>THE NEXT ISSUE IS YOURS.</span><Button variant="link" onClick={onInquiry}>Let’s make<br /><em>an impression.</em><ArrowUpRight /></Button><div><span>ÉLOISE / PHOTOGRAPHY</span><Link to="/portfolio">Weddings · Portraits · Lifestyle · Editorial</Link><a href="#">BACK TO TOP ↑</a></div></footer>
  </main>;
}

export function AdventureWebsite({ concept, menu, onMenu, onCloseMenu, onInquiry, onOpen }: ConceptProps) {
  return <main className="adventure-website">
    <section className="adventure-cover">
      <img className="adventure-cover-photo" src={concept.image} alt={`${concept.couple} among the Dolomites mountains`} width={1920} height={1088} fetchPriority="high" />
      <div className="adventure-scrim" />
      <header className="wild-header"><Link to="/" className="wild-logo"><Compass strokeWidth={1.3} /><span>ÉLOISE<small>OUT THERE. WITH YOU.</small></span></Link><nav aria-label="Main navigation" className={`wild-nav ${menu ? "is-open" : ""}`}><Button variant="navigation" asChild><a href="#field-notes" onClick={onCloseMenu}>Field notes</a></Button><Button variant="navigation" asChild><Link to="/portfolio">The photographs</Link></Button><Button variant="navigation" onClick={onInquiry}>Let’s wander <ArrowUpRight /></Button></nav><Button variant="navigation" size="icon" className="alternative-menu" aria-label={menu ? "Close menu" : "Open menu"} aria-expanded={menu} onClick={onMenu}>{menu ? <X /> : <Menu />}</Button></header>
      <div className="wild-coordinate">46°29′ N / 11°51′ E<br />DOLOMITES, ITALY</div>
      <div className="wild-title"><span>FOR THE WILDLY IN LOVE</span><h1>LOVE.<br />UNCHARTED.</h1><Button variant="cinematic" asChild><a href="#field-notes">Follow the feeling <ArrowDown /></a></Button></div>
      <div className="wild-bottom"><span>SMALL HUMANS. BIG FEELINGS.</span><Button variant="navigation" aria-label={`View ${concept.couple}'s story`} onClick={() => onOpen(2)}>{concept.couple} <ArrowUpRight /></Button><span>SCROLL TO ROAM ↓</span></div>
    </section>
    <div className="wild-ticker"><span>NO MAP REQUIRED.</span><Compass /><span>JUST YOU. JUST US. JUST THIS.</span><Compass /><span>TAKE THE LONG WAY HOME.</span></div>
    <section id="field-notes" className="field-notes">
      <div className="field-intro scroll-reveal"><span className="field-label">01 / NOTES FROM THE ROAD</span><h2>Less posing.<br />More <em>living.</em></h2><p>{concept.about}</p><Button variant="link" onClick={onInquiry}>Your adventure starts here <ArrowUpRight /></Button></div>
      <figure className="field-photo scroll-reveal"><img src={embrace} alt="Wedding guests embracing with joy" width={1536} height={1024} loading="lazy" /><figcaption><span>FOUND ALONG THE WAY</span><span>NO. 001</span></figcaption></figure>
      <div className="field-footnote scroll-reveal"><span>THE RULE?</span><p>There are no rules.<br />Only a day that feels like you.</p></div>
    </section>
    <ImageChapters concept={concept} />
    <section className="wild-collection"><div className="wild-collection-heading scroll-reveal"><span className="field-label">02 / PEOPLE, PLACES & EVERYTHING BETWEEN</span><h2>Life doesn’t<br />stand still.</h2><Button variant="link" asChild><Link to="/portfolio">Neither do we <ArrowUpRight /></Link></Button></div><PhotoReel startIndex={2} onOpen={onOpen} /></section>
    <section className="wild-invitation"><div className="scroll-reveal"><Compass strokeWidth={1} /><span>WHEREVER IT TAKES US.</span><h2>YOU BRING<br />THE <em>WILD.</em></h2><p>I’ll bring the camera.</p><Button variant="cinematic" onClick={onInquiry}>Let’s get out there <ArrowUpRight /></Button></div></section>
    <footer className="wild-footer"><Link to="/" className="wild-logo">ÉLOISE ↗</Link><span>Weddings / Portraits / Lifestyle / Editorial</span><a href="#">BACK TO THE TOP ↑</a></footer>
  </main>;
}