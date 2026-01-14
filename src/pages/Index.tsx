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

export default function Index() {
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
