"use client";
import Hero from "../components/Hero";

import { FoodSection } from "../components/FoodSection";

export default function Home() {
  return (
    <>
      <Hero />
      <FoodSection label="Desserts" />
    </>
  );
}
