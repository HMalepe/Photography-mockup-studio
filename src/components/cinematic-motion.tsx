import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

export function useCinematicMotion(scope: RefObject<HTMLDivElement | null>, concept: string) {
 useEffect(() => {
  const root = scope.current;
  if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  gsap.registerPlugin(ScrollTrigger);
  const lenis = new Lenis({ lerp: 0.1, smoothWheel: true, anchors: true });
  const tick = (time: number) => lenis.raf(time * 1000);
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add(tick);
  const media = gsap.matchMedia();
  const context = gsap.context(() => {
   if (root.querySelector(".hero-photo")) {
    gsap.from(".hero-line-inner", { yPercent: 110, duration: 1.2, stagger: .1, ease: "power4.out" });
    gsap.fromTo(".hero-photo", { scale: 1.12 }, { scale: 1, duration: 2.4, ease: "power3.out" });
    gsap.from(".hero-detail", { y: 30, opacity: 0, duration: .8, delay: .55, stagger: .12, ease: "power3.out" });
    gsap.to(".hero-photo", { yPercent: 15, ease: "none", scrollTrigger: { trigger: ".photographer-hero", start: "top top", end: "bottom top", scrub: true } });
    gsap.to(".hero-content", { y: -60, opacity: .1, ease: "none", scrollTrigger: { trigger: ".photographer-hero", start: "top top", end: "bottom top", scrub: true } });
    gsap.fromTo(".statement-word", { opacity: .2 }, { opacity: 1, stagger: .12, ease: "none", scrollTrigger: { trigger: ".statement", start: "top 80%", end: "center 45%", scrub: true } });
   }
   gsap.utils.toArray<HTMLElement>(".scroll-reveal").forEach(element => gsap.from(element, { y: 45, opacity: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: element, start: "top 92%", once: true } }));
   const stage = root.querySelector<HTMLElement>(".chapter-stage");
   if (stage) {
    media.add("(min-width: 701px)", () => {
     const panels = Array.from(stage.querySelectorAll<HTMLElement>(".chapter-panel"));
     stage.classList.add("is-cinematic");
     gsap.set(panels.slice(1), { yPercent: 110 });
     const timeline = gsap.timeline({ scrollTrigger: { trigger: stage, start: "top top", end: "+=180%", pin: true, scrub: .7, anticipatePin: 1, invalidateOnRefresh: true } });
     panels.forEach((panel,index) => {
      const photo = panel.querySelector(".chapter-photo");
      if (photo) timeline.fromTo(photo, { scale: 1.18 }, { scale: 1, duration: 1.2, ease: "none" }, index);
      if (index > 0) {
       const direction = concept === "editorial" ? { yPercent: 0, xPercent: 0, rotation: 0 } : { yPercent: 0, rotation: 0 };
       gsap.set(panel, concept === "editorial" ? { yPercent: 0, xPercent: 110 } : concept === "adventure" ? { yPercent: 110, rotation: 6 } : { yPercent: 110 });
       timeline.to(panel, { ...direction, duration: .8, ease: "power2.inOut" }, index);
       const previousPanel = panels[index - 1];
       const text = panel.querySelector(".chapter-text");
       if (previousPanel) timeline.to(previousPanel, { scale: .91, opacity: .45, duration: .8 }, index);
       if (text) timeline.from(text, { y: 50, opacity: 0, duration: .5 }, index + .3);
      }
     });
     timeline.fromTo(".chapter-progress", { scaleX: 0 }, { scaleX: 1, duration: timeline.duration(), ease: "none" }, 0);
     return () => { stage.classList.remove("is-cinematic"); };
    });
    media.add("(max-width: 700px)", () => {
     gsap.utils.toArray<HTMLElement>(".chapter-panel").forEach(panel => {
      gsap.from(panel.querySelector(".chapter-photo"), { scale: 1.15, ease: "none", scrollTrigger: { trigger: panel, start: "top bottom", end: "bottom top", scrub: true } });
      gsap.from(panel.querySelector(".chapter-text"), { y: 35, opacity: 0, scrollTrigger: { trigger: panel, start: "top 65%", once: true } });
     });
    });
   }
   gsap.utils.toArray<HTMLElement>(".process-step").forEach((step,index) => gsap.from(step, { y: 30, duration: .8, delay: index * .12, scrollTrigger: { trigger: step, start: "top 90%", once: true } }));
  }, root);
  const refresh = () => ScrollTrigger.refresh();
  const images = Array.from(root.querySelectorAll("img"));
  images.forEach(image => image.addEventListener("load", refresh, { once: true }));
  const frame = requestAnimationFrame(refresh);
  return () => { cancelAnimationFrame(frame); images.forEach(image => image.removeEventListener("load",refresh)); media.revert(); context.revert(); gsap.ticker.remove(tick); lenis.destroy(); };
 }, [scope, concept]);
}
