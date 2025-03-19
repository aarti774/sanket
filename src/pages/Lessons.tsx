import { useState, useEffect } from "react";
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
import { Play, Shield } from "lucide-react";
import LessonViewer from "@/components/LessonViewer";
import { toast } from "sonner";
import { quizzes } from "@/data/quizzes";
import QuizViewer from "@/components/QuizViewer";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { logUserActivity, getCurrentUser } from "@/utils/activity-logger";
import { supabase } from "@/integrations/supabase/client";

interface LessonCardProps {
  title: string;
  description: string;
  progress: number;
  onClick: () => void;
}

const LessonCard: React.FC<LessonCardProps> = ({
  title,
  description,
  progress,
  onClick,
}) => (
  <Card className="group hover:shadow-lg transition-all">
    <CardHeader className="space-y-1">
      <div className="flex items-center justify-between">
        <CardTitle className="text-lg">{title}</CardTitle>
        <Play className="h-5 w-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <Progress value={progress} className="h-2" />
    </CardHeader>
    <CardContent>
      <p className="text-sm text-gray-600">{description}</p>
      <Button
        className="w-full mt-4"
        onClick={onClick}
      >
        Continue Learning
      </Button>
    </CardContent>
  </Card>
);

const Lessons = () => {
  const [activeTab, setActiveTab] = useState("alphabet");
  const [lessonViewer, setLessonViewer] = useState<{
    isOpen: boolean;
    lesson?: {
      id: string;
      title: string;
      description: string;
      videoUrl?: string;
    };
  }>({
    isOpen: false,
  });
  const [quizViewer, setQuizViewer] = useState<{
    isOpen: boolean;
    quiz?: any;
    videoUrl?: string;
  }>({
    isOpen: false,
  });
  const { isAdmin, user } = useAuth();
  const navigate = useNavigate();

  const handleLessonClick = async (lesson: {
    id: string;
    title: string;
    description: string;
    videoUrl?: string;
  }) => {
    if (!lesson.videoUrl) {
      toast.error("Video not available for this lesson");
      return;
    }
    
    if (!user) {
      toast.error("You must be logged in to view lessons");
      navigate('/signin');
      return;
    }
    
    // Log lesson view activity
    await logUserActivity('lesson_view', {
      lesson_id: lesson.id,
      lesson_title: lesson.title,
      timestamp: new Date().toISOString()
    });
    
    // Save lesson to the database
    try {
      const { error } = await supabase
        .from('lessons')
        .upsert({
          'lesson-id': lesson.id,
          'lesson-name': lesson.title,
          'content': lesson.description,
          'video-URL': lesson.videoUrl,
          'user_id': user.id
        });
        
      if (error) {
        console.error('Error saving lesson:', error);
      }
    } catch (error) {
      console.error('Failed to save lesson:', error);
    }
    
    setLessonViewer({
      isOpen: true,
      lesson,
    });
  };

  const handleLessonComplete = () => {
    if (lessonViewer.lesson) {
      toast.success("Lesson completed! Now take the quiz!");
      
      // Find a quiz for this lesson
      const matchingQuiz = quizzes.find(quiz => quiz.lessonId === lessonViewer.lesson?.id);
      
      if (matchingQuiz) {
        // Open the quiz
        setLessonViewer({ isOpen: false });
        setQuizViewer({
          isOpen: true,
          quiz: matchingQuiz,
          videoUrl: lessonViewer.lesson.videoUrl
        });
      } else {
        // No quiz available for this lesson
        toast.info("No quiz available for this lesson yet");
        setLessonViewer({ isOpen: false });
      }
    }
  };

  const handleQuizComplete = async (score: number) => {
    if (quizViewer.quiz && user) {
      // Log quiz completion activity
      await logUserActivity('quiz_completion', {
        quiz_id: quizViewer.quiz.id,
        quiz_title: quizViewer.quiz.title,
        score: score,
        timestamp: new Date().toISOString()
      });
      
      // Save quiz result to the database
      try {
        const { error } = await supabase
          .from('quiz')
          .upsert({
            id: user.id,
            'quiz-id': parseInt(quizViewer.quiz.id),
            'quiz-name': quizViewer.quiz.title,
            'score': score,
            'questions': JSON.stringify(quizViewer.quiz.questions),
            'user_id': user.id
          });
          
        if (error) {
          console.error('Error saving quiz result:', error);
        }
      } catch (error) {
        console.error('Failed to save quiz result:', error);
      }
    }
    
    toast.success(`Quiz completed with score: ${score}%`);
    setQuizViewer({ isOpen: false });
  };

  return (
    <div className="max-w-5xl mx-auto animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Sign Language Lessons</h1>
        
        {isAdmin && (
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={() => navigate('/admin')}
          >
            <Shield className="h-4 w-4" />
            Admin
          </Button>
        )}
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="alphabet">Alphabet (A-Z)</TabsTrigger>
          <TabsTrigger value="numbers">Numbers (1-100)</TabsTrigger>
          <TabsTrigger value="phrases">Common Phrases</TabsTrigger>
        </TabsList>

        <TabsContent value="alphabet" className="mt-0">
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {alphabet.map((lesson) => (
              <LessonCard
                key={lesson.id}
                title={lesson.title}
                description={lesson.description}
                progress={lesson.progress}
                onClick={() => handleLessonClick(lesson)}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="numbers" className="mt-0">
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {numbers.map((lesson) => (
              <LessonCard
                key={lesson.id}
                title={lesson.title}
                description={lesson.description}
                progress={lesson.progress}
                onClick={() => handleLessonClick(lesson)}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="phrases" className="mt-0">
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {commonPhrases.map((lesson) => (
              <LessonCard
                key={lesson.id}
                title={lesson.title}
                description={lesson.description}
                progress={lesson.progress}
                onClick={() => handleLessonClick(lesson)}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {lessonViewer.isOpen && lessonViewer.lesson && (
        <LessonViewer
          title={lessonViewer.lesson.title}
          description={lessonViewer.lesson.description}
          videoUrl={lessonViewer.lesson.videoUrl || ""}
          lessonId={lessonViewer.lesson.id}
          onClose={() => setLessonViewer({ isOpen: false })}
          onComplete={handleLessonComplete}
        />
      )}

      {quizViewer.isOpen && quizViewer.quiz && (
        <QuizViewer
          quiz={quizViewer.quiz}
          videoUrl={quizViewer.videoUrl}
          onClose={() => setQuizViewer({ isOpen: false })}
          onComplete={handleQuizComplete}
        />
      )}
    </div>
  );
};

export default Lessons;
