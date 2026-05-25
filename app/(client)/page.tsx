import { FoodSection } from "../components/FoodSection";
import Footer from "../components/Footer";
import { Header } from "../components/Header";
import Hero from "../components/Hero";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Hero />
      <FoodSection label="Desserts" />
    </>
  );
}
