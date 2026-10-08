import portrait from "@/assets/portrait-session.jpg";
import lifestyle from "@/assets/lifestyle-session.jpg";
import fashion from "@/assets/fashion-session.jpg";
import embrace from "@/assets/wedding-embrace.jpg";
import { concepts } from "./wedding-concepts";

export const categories = ["All work", "Weddings", "Portraits", "Lifestyle", "Editorial"] as const;
export const photographs = [
  ...concepts.map(item => ({ image: item.image, title: item.couple, category: "Weddings", description: item.location })),
  { image: embrace, title: "The in-between", category: "Weddings", description: "A moment, not a pose" },
  { image: portrait, title: "Quiet confidence", category: "Portraits", description: "People, as they are" },
  { image: lifestyle, title: "A life together", category: "Lifestyle", description: "Ordinary days. Extraordinary feeling." },
  { image: fashion, title: "In full colour", category: "Editorial", description: "Form, light & expression" },
];
export const sequenceTitles = {
  romantic: ["The anticipation.", "The connection.", "The forever."],
  editorial: ["The composition.", "The feeling.", "The icon."],
  adventure: ["Find your wild.", "Follow the feeling.", "Leave the ordinary."],
};
export { embrace };