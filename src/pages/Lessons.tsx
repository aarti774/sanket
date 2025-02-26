
import { useState } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { alphabet, numbers, commonPhrases } from "@/data/lessons";
import { Play, Lock } from "lucide-react";

const LessonCard = ({
  title,
  description,
  progress,
  isLocked,
  onClick,
}: {
  title: string;
  description: string;
  progress: number;
  isLocked: boolean;
  onClick: () => void;
}) => (
  <Card className="group hover:shadow-lg transition-all">
    <CardHeader className="space-y-1">
      <div className="flex items-center justify-between">
        <CardTitle className="text-lg">{title}</CardTitle>
        {isLocked ? (
          <Lock className="h-5 w-5 text-gray-400" />
        ) : (
          <Play className="h-5 w-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
        )}
      </div>
      <Progress value={progress} className="h-2" />
    </CardHeader>
    <CardContent>
      <p className="text-sm text-gray-600">{description}</p>
      <Button
        className="w-full mt-4"
        variant={isLocked ? "outline" : "default"}
        disabled={isLocked}
        onClick={onClick}
      >
        {isLocked ? "Locked" : "Continue Learning"}
      </Button>
    </CardContent>
  </Card>
);

const Lessons = () => {
  const [activeTab, setActiveTab] = useState("alphabet");

  const handleLessonClick = (lessonId: string) => {
    // This will be implemented when we add the lesson viewer
    console.log("Opening lesson:", lessonId);
  };

  return (
    <div className="max-w-5xl mx-auto animate-fade-in">
      <h1 className="text-3xl font-bold mb-6">Sign Language Lessons</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="alphabet">Alphabet (A-Z)</TabsTrigger>
          <TabsTrigger value="numbers">Numbers (1-100)</TabsTrigger>
          <TabsTrigger value="phrases">Common Phrases</TabsTrigger>
        </TabsList>

        <TabsContent value="alphabet" className="mt-0">
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {alphabet.map((lesson, index) => (
              <LessonCard
                key={lesson.id}
                title={lesson.title}
                description={lesson.description}
                progress={lesson.progress}
                isLocked={index > 0} // First lesson is unlocked
                onClick={() => handleLessonClick(lesson.id)}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="numbers" className="mt-0">
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {numbers.map((lesson, index) => (
              <LessonCard
                key={lesson.id}
                title={lesson.title}
                description={lesson.description}
                progress={lesson.progress}
                isLocked={index > 0}
                onClick={() => handleLessonClick(lesson.id)}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="phrases" className="mt-0">
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {commonPhrases.map((lesson, index) => (
              <LessonCard
                key={lesson.id}
                title={lesson.title}
                description={lesson.description}
                progress={lesson.progress}
                isLocked={index > 0}
                onClick={() => handleLessonClick(lesson.id)}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Lessons;
