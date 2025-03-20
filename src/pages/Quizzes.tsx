
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Play } from "lucide-react";
import { quizzes } from "@/data/quizzes";
import QuizViewer from "@/components/QuizViewer";
import { toast } from "sonner";
import { logUserActivity, getCurrentUser } from "@/utils/activity-logger";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Quizzes = () => {
  const [selectedQuiz, setSelectedQuiz] = useState<{
    isOpen: boolean;
    quiz?: typeof quizzes[0];
  }>({
    isOpen: false,
  });
  
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleQuizComplete = async (score: number) => {
    if (selectedQuiz.quiz && user) {
      console.log('Saving quiz result for user:', user.id);
      
      // Log quiz completion activity
      await logUserActivity('quiz_completion', {
        quiz_id: selectedQuiz.quiz.id,
        quiz_title: selectedQuiz.quiz.title,
        score: score,
        timestamp: new Date().toISOString()
      });
      
      // Save quiz result to the database
      try {
        const { error } = await supabase
          .from('quiz')
          .upsert({
            id: crypto.randomUUID(), // Generate a unique ID for the quiz entry
            'quiz-id': parseInt(selectedQuiz.quiz.id),
            'quiz-name': selectedQuiz.quiz.title,
            'score': score,
            'questions': JSON.stringify(selectedQuiz.quiz.questions),
            'user_id': user.id
          });
          
        if (error) {
          console.error('Error saving quiz result:', error);
          toast.error('Failed to save quiz result');
        } else {
          console.log('Quiz result saved successfully');
        }
      } catch (error) {
        console.error('Failed to save quiz result:', error);
        toast.error('An error occurred while saving your quiz result');
      }
    } else {
      console.error('Cannot save quiz: No user or quiz data available');
    }
    
    toast.success(`Quiz completed with score: ${score}%`);
    setSelectedQuiz({ isOpen: false });
  };

  const handleStartQuiz = async (quiz: typeof quizzes[0]) => {
    if (!user) {
      toast.error("You must be logged in to take quizzes");
      navigate('/signin');
      return;
    }
    
    await logUserActivity('quiz_attempt', {
      quiz_id: quiz.id,
      quiz_title: quiz.title,
      timestamp: new Date().toISOString()
    });
    
    setSelectedQuiz({ isOpen: true, quiz });
  };

  return (
    <div className="max-w-5xl mx-auto animate-fade-in">
      <h1 className="text-3xl font-bold mb-6">Available Quizzes</h1>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {quizzes.map((quiz) => (
          <Card key={quiz.id} className="group hover:shadow-lg transition-all">
            <CardHeader className="space-y-1">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{quiz.title}</CardTitle>
                <Play className="h-5 w-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <Progress value={0} className="h-2" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">{quiz.description}</p>
              <p className="text-sm text-gray-600 mb-4">
                Questions: {quiz.questions.length}
              </p>
              <Button
                className="w-full"
                onClick={() => handleStartQuiz(quiz)}
              >
                Start Quiz
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedQuiz.isOpen && selectedQuiz.quiz && (
        <QuizViewer
          quiz={selectedQuiz.quiz}
          onClose={() => setSelectedQuiz({ isOpen: false })}
          onComplete={handleQuizComplete}
        />
      )}
    </div>
  );
};

export default Quizzes;
