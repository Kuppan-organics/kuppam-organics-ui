import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import confetti from "canvas-confetti";
import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home/HeroSection";
import CategoriesSection from "@/components/home/CategoriesSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import StorySection from "@/components/home/StorySection";
import ProductShowcase from "@/components/home/ProductShowcase";
import StatsSection from "@/components/home/StatsSection";
import FarmingProcess from "@/components/home/FarmingProcess";
import BrandHeritageSection from "@/components/home/BrandHeritageSection";
import NewsletterSection from "@/components/home/NewsletterSection";

function runConfetti() {
  const duration = 3 * 1000;
  const end = Date.now() + duration;

  const frame = () => {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: ["#C89B3C", "#6B3F1D", "#9C6B3D", "#6E7F3A", "#FFF9F2"],
    });
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: ["#C89B3C", "#6B3F1D", "#9C6B3D", "#6E7F3A", "#FFF9F2"],
    });
    if (Date.now() < end) requestAnimationFrame(frame);
  };
  frame();
}

export default function Index() {
  const location = useLocation();
  const hasTriggeredConfetti = useRef(false);

  useEffect(() => {
    const fromLaunch = (location.state as { fromLaunch?: boolean })?.fromLaunch;
    if (fromLaunch && !hasTriggeredConfetti.current) {
      hasTriggeredConfetti.current = true;
      runConfetti();
    }
  }, [location.state]);

  return (
    <Layout>
      <HeroSection />
      <FeaturesSection />
      <CategoriesSection />
      <ProductShowcase />
      <StatsSection />
      <StorySection />
      <FarmingProcess />
      <BrandHeritageSection />
      <NewsletterSection />
    </Layout>
  );
}
