import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

export function useCinematicMotion(scope: RefObject<HTMLDivElement | null>, concept: string) {
  useEffect(() => {
    if (!scope.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true, anchors: true });
    const tick = (time: number) => lenis.raf(time * 1000);
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(tick);
    const context = gsap.context(() => {
      gsap.from(".hero-line-inner", { yPercent: 110, duration: 1.2, stagger: 0.1, ease: "power4.out" });
      gsap.fromTo(".hero-photo", { scale: 1.12 }, { scale: 1, duration: 2.4, ease: "power3.out" });
      gsap.from(".hero-detail", { y: 30, opacity: 0, duration: 0.8, delay: 0.55, stagger: 0.12, ease: "power3.out" });
      gsap.to(".hero-photo", { yPercent: 14, ease: "none", scrollTrigger: { trigger: ".photographer-hero", start: "top top", end: "bottom top", scrub: true } });
      gsap.utils.toArray<HTMLElement>(".scroll-reveal").forEach((element) => {
        gsap.from(element, { y: 40, opacity: 0, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: element, start: "top 88%", once: true } });
      });
      gsap.fromTo(".statement-word", { opacity: 0.2 }, { opacity: 1, stagger: 0.12, ease: "none", scrollTrigger: { trigger: ".statement", start: "top 80%", end: "center 45%", scrub: true } });
    }, scope);
    return () => { context.revert(); gsap.ticker.remove(tick); lenis.destroy(); };
  }, [scope, concept]);
}