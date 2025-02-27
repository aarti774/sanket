
import { ArrowRight, Award, BookOpen, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";

const features = [
  {
    icon: BookOpen,
    title: "Interactive Lessons",
    description: "Learn sign language through engaging, step-by-step lessons",
  },
  {
    icon: Video,
    title: "Video Demonstrations",
    description: "Watch clear video demonstrations for each sign",
  },
  {
    icon: Award,
    title: "Achievement Certificates",
    description: "Earn certificates as you progress through lessons",
  },
];

const Index = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-12 animate-fade-in">
      <section className="text-center space-y-6">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">
          Welcome to{" "}
          <span className="text-primary">Sanket</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Begin your journey to learn sign language with our interactive lessons,
          quizzes, and video demonstrations.
        </p>
        <Link to="/lessons">
          <Button className="bg-primary hover:bg-primary/90" size="lg">
            Start Learning <ArrowRight className="ml-2" />
          </Button>
        </Link>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {features.map((feature) => (
          <Card key={feature.title} className="p-6 hover:shadow-lg transition-shadow transform hover:-translate-y-1 duration-300">
            <feature.icon className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </Card>
        ))}
      </section>

      <section className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="text-gray-600 mb-6">
          Join thousands of learners mastering sign language with Sanket.
        </p>
        <Link to="/lessons">
          <Button variant="outline">
            Explore Lessons <ArrowRight className="ml-2" />
          </Button>
        </Link>
      </section>
    </div>
  );
};

export default Index;
