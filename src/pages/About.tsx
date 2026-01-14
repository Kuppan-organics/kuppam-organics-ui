import { Leaf, Heart, Users, TreePine } from "lucide-react";
import Layout from "@/components/layout/Layout";
import heroImage from "@/assets/about.png";

const values = [
  {
    icon: Leaf,
    title: "Pure Organic",
    description:
      "Every product is grown without synthetic chemicals, pesticides, or GMOs.",
  },
  {
    icon: Heart,
    title: "Health First",
    description:
      "We prioritize nutrition and wellbeing in everything we grow and sell.",
  },
  {
    icon: Users,
    title: "Farmer Support",
    description:
      "Fair prices and sustainable practices that support local farming families.",
  },
  {
    icon: TreePine,
    title: "Eco-Friendly",
    description:
      "Traditional methods that protect soil health and preserve biodiversity.",
  },
];

export default function About() {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative pb-24 bg-primary text-primary-foreground overflow-hidden min-h-[500px] md:min-h-[600px] flex items-center justify-center">
        <div className="absolute inset-0 opacity-40">
          <img
            src={heroImage}
            alt=""
            className="w-full h-full object-cover object-top"
          />
        </div>
        <div className="container relative z-10 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            Our Story
          </h1>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            Reviving traditional farming to bring you the purest organic produce
            from Kuppam's fertile lands.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-3xl font-bold text-center mb-8">
              From Kuppam's Soil to Your Soul
            </h2>
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p className="mb-6">
                Kuppam Organics was born from a simple yet powerful vision: to
                restore the traditional farming methods that our ancestors
                practiced for generations. In a world dominated by synthetic
                fertilizers and chemical pesticides, we chose a different path.
              </p>
              <p className="mb-6">
                Founded in the fertile lands of Kuppam, Andhra Pradesh, our
                journey began with a handful of farmers who believed in the
                power of organic farming. Today, we work with over 500 farming
                families across the region, helping them transition to
                sustainable agricultural practices.
              </p>
              <p>
                Every product you purchase from us is not just food—it's a step
                towards healthier living, a vote for sustainable farming, and a
                contribution to the livelihoods of traditional farmers who are
                the true guardians of our land.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-card">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-background rounded-2xl p-8 shadow-soft">
              <h3 className="font-heading text-2xl font-bold text-primary mb-4">
                Our Mission
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                To make pure, organic food accessible to everyone while
                supporting traditional farming communities and protecting our
                environment for future generations.
              </p>
            </div>
            <div className="bg-background rounded-2xl p-8 shadow-soft">
              <h3 className="font-heading text-2xl font-bold text-primary mb-4">
                Our Vision
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                A world where organic farming is the norm, where farmers thrive,
                consumers are healthy, and our soil remains rich and productive
                for centuries to come.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-background">
        <div className="container">
          <h2 className="font-heading text-3xl font-bold text-center mb-12">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div
                key={value.title}
                className="bg-card rounded-2xl p-6 text-center shadow-soft"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-accent/15 flex items-center justify-center">
                  <value.icon className="h-7 w-7 text-accent" />
                </div>
                <h3 className="font-heading text-xl font-semibold mb-2">
                  {value.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
