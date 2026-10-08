import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState, type FormEvent } from "react";
import { ArrowDown, ArrowLeft, ArrowRight, Check, Menu, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { concepts } from "@/lib/wedding-concepts";
import { useCinematicMotion } from "@/components/cinematic-motion";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Éloise — Three Cinematic Wedding Photography Concepts" },
    { name: "description", content: "Explore three wedding photography concepts: romantic fine art, modern editorial, and adventurous destination stories." },
    { property: "og:title", content: "Éloise — Wedding Photography Concepts" },
    { property: "og:description", content: "Three distinct visions of wedding photography. Honest emotion, editorial elegance, and wild romance." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Index,
});

function Index() {
  const [active, setActive] = useState(0);
  const [menu, setMenu] = useState(false);
  const [inquiry, setInquiry] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [gallery, setGallery] = useState<number | null>(null);
  const scope = useRef<HTMLDivElement>(null);
  const concept = concepts[active] ?? concepts[0];
  const galleryStory = gallery === null ? null : concepts[gallery];
  useCinematicMotion(scope, concept.id);

  const switchConcept = (index: number) => {
    if (index === active) return;
    setActive(index);
    setMenu(false);
    window.scrollTo({ top: 0, behavior: "instant" });
  };
  const openInquiry = () => { setSubmitted(false); setInquiry(true); setMenu(false); };
  const submitInquiry = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setSubmitted(true); };

  return (
    <>
      <div className="mockup-bar">
        <div className="studio-mark"><Sparkles strokeWidth={1.4} /><strong>The wedding edit</strong><span>Three ways to tell a love story</span></div>
        <div className="concept-switch" role="group" aria-label="Photography concepts">
          {concepts.map((item, index) => <Button key={item.id} variant="concept" aria-pressed={active === index} onClick={() => switchConcept(index)}><span>{item.number}</span>{item.name}</Button>)}
        </div>
        <div className="live-indicator"><i />CONCEPT PREVIEW</div>
      </div>
      <div ref={scope} className="photographer-site" data-concept={concept.id}>
        <section className="photographer-hero" key={concept.id}>
          <img className="hero-photo" src={concept.image} alt={`${concept.couple}, a wedding couple in ${concept.location.toLowerCase()}`} width={1920} height={1088} fetchPriority="high" />
          <div className="hero-shade" />
          <header className="photographer-nav">
            <a className="wordmark" href="#" aria-label="Éloise home">éloise<small>PHOTOGRAPHY</small></a>
            <nav className={`nav-links ${menu ? "is-open" : ""}`} aria-label="Main navigation">
              {[ ["The stories", "stories"], ["My approach", "approach"], ["The experience", "experience"] ].map(([label, id]) => <Button key={id} variant="navigation" asChild><a href={`#${id}`} onClick={() => setMenu(false)}>{label}</a></Button>)}
              {menu && <Button variant="navigation" onClick={openInquiry}>Let’s make memories <ArrowRight /></Button>}
            </nav>
            <Button variant="navigation" className="nav-cta" onClick={openInquiry}>Let’s make memories <ArrowRight /></Button>
            <Button variant="navigation" size="icon" className="menu-toggle" aria-label={menu ? "Close menu" : "Open menu"} aria-expanded={menu} onClick={() => setMenu(!menu)}>{menu ? <X /> : <Menu />}</Button>
          </header>
          <div className="hero-content">
            <div className="eyebrow hero-detail"><span className="eyebrow-line" />{concept.descriptor}</div>
            <h1 className="hero-title">{concept.heading.map(line => <span key={line} className="hero-line"><span className="hero-line-inner">{line === concept.accentWord ? <em>{line}</em> : line}</span></span>)}</h1>
            <p className="hero-description hero-detail">{concept.description}</p>
            <div className="hero-detail"><Button variant="cinematic" asChild><a href="#stories">Explore the stories <ArrowRight /></a></Button></div>
          </div>
          <div className="image-index"><span>{concept.number}</span><i /><span>03</span></div>
          <div className="hero-bottom hero-detail">
            <a href="#approach" className="scroll-cue"><ArrowDown strokeWidth={1} />A LITTLE MORE OF THE STORY</a>
            <div className="featured-caption"><div className="eyebrow">{concept.location} · A WEDDING STORY</div><p>{concept.couple}<Button variant="navigation" size="icon" aria-label={`View ${concept.couple}'s story`} onClick={() => setGallery(active)}><ArrowRight strokeWidth={1} /></Button></p></div>
          </div>
        </section>
        <div className="editorial-note"><p>For the big days. And all the little things.</p><Sparkles className="note-star" strokeWidth={1} /><span className="eyebrow">{concept.category}<br />WITH FEELING, ALWAYS.</span></div>
        <section id="approach" className="section-inner statement">
          <div><div className="section-label"><span />THE HEART BEHIND THE LENS</div><h2>{concept.statement.split(" ").map((word, index) => <span className="statement-word" key={`${word}-${index}`}>{word}</span>)}</h2></div>
          <div className="statement-copy scroll-reveal"><p>{concept.about}</p><Button variant="link" className="text-link" asChild><a href="#experience">A little about my approach <ArrowRight /></a></Button></div>
        </section>
        <section id="stories" className="story-section"><div className="section-inner">
          <div className="section-heading scroll-reveal"><div><div className="section-label"><span />LOVE, IN ALL ITS FORMS</div><h2>A few love stories.</h2></div><Button variant="link" className="text-link" onClick={() => setGallery(active)}>View the collection <ArrowRight /></Button></div>
          <div className="story-grid">{concepts.map((story, index) => <article className="story-card scroll-reveal" key={story.id}>
            <div className="story-image"><img className="story-photo" src={story.image} alt={`${story.couple} wedding in ${story.location.toLowerCase()}`} loading="lazy" width={1920} height={1088} /><Button variant="navigation" aria-label={`Open ${story.couple}'s wedding gallery`} onClick={() => setGallery(index)} /></div>
            <h3>{story.couple}<ArrowRight strokeWidth={1} /></h3><p>{story.location} · {story.category}</p>
          </article>)}</div>
        </div></section>
        <section id="experience" className="section-inner experience">
          <div className="section-heading scroll-reveal"><div><div className="section-label"><span />THOUGHTFUL, FROM THE VERY BEGINNING</div><h2>Your day. Your way.</h2></div></div>
          <div className="process-grid">{[
            ["01", "First, we connect.", "A conversation about the two of you, what you’re dreaming of, and what matters most. No scripts. Just a good feeling."],
            ["02", "Be here, together.", "On your day, you get to be completely present. I’ll find the beautiful light, the little details, and the moments in between."],
            ["03", "Keep the feeling.", "A thoughtfully curated collection of photographs. Your favourite people, your favourite day — a story to return to, again and again."],
          ].map(([number, title, text]) => <div className="process-step scroll-reveal" key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></div>)}</div>
        </section>
        <section className="contact-section"><div className="scroll-reveal"><div className="eyebrow">THE NEXT STORY COULD BE YOURS</div><h2>Let’s make something<br /><em>worth remembering.</em></h2><Button variant="cinematic" onClick={openInquiry}>Tell me your story <ArrowRight /></Button></div></section>
        <footer className="footer"><a className="wordmark" href="#">éloise</a><span>Wedding photography · Concept collection</span><span>Made with feeling.</span></footer>
      </div>
      <Dialog open={inquiry} onOpenChange={setInquiry}><DialogContent className="inquiry-dialog"><DialogTitle className="dialog-heading">Your story starts here.</DialogTitle><DialogDescription>Tell me a little about the day you’re dreaming of.</DialogDescription>
        {submitted ? <div className="success-panel"><Check size={32} strokeWidth={1.5} /><h3>Beautiful. Let’s imagine it.</h3><p>Your sample inquiry is complete.<br />This is a mockup — no message has been sent.</p><Button onClick={() => setInquiry(false)}>Back to the stories <ArrowRight /></Button></div> : <form className="inquiry-form" onSubmit={submitInquiry}>
          <label>Your names<input name="names" autoComplete="name" placeholder="You & your favourite person" required /></label>
          <label>Email address<input type="email" name="email" autoComplete="email" placeholder="you@example.com" required /></label>
          <div className="form-row"><label>Wedding date<input type="date" name="date" required /></label><label>Location<input name="location" placeholder="Somewhere beautiful" required /></label></div>
          <label>A little about your plans<textarea name="message" rows={3} placeholder="The place, the people, the feeling…" /></label>
          <Button variant="cinematic" type="submit">Preview your inquiry <ArrowRight /></Button><p className="demo-note">Concept preview only. Your details are not stored or sent.</p>
        </form>}
      </DialogContent></Dialog>
      <Dialog open={gallery !== null} onOpenChange={open => { if (!open) setGallery(null); }}><DialogContent className="gallery-dialog"><DialogTitle className="dialog-heading">{galleryStory?.couple ?? "Wedding stories"}</DialogTitle><DialogDescription>{galleryStory?.location} · A sample wedding story</DialogDescription>
        {galleryStory && <img className="gallery-image" src={galleryStory.image} alt={`${galleryStory.couple}'s wedding portrait`} width={1920} height={1088} />}
        <div className="gallery-controls"><Button variant="outline" size="icon" aria-label="Previous story" onClick={() => setGallery(previous => ((previous ?? 0) + concepts.length - 1) % concepts.length)}><ArrowLeft /></Button><p>{String((gallery ?? 0) + 1).padStart(2, "0")} / 03 · THE WEDDING COLLECTION</p><Button variant="outline" size="icon" aria-label="Next story" onClick={() => setGallery(previous => ((previous ?? 0) + 1) % concepts.length)}><ArrowRight /></Button></div>
      </DialogContent></Dialog>
    </>
  );
}
