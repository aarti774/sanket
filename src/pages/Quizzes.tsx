
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Play } from "lucide-react";
import { quizzes } from "@/data/quizzes";
import QuizViewer from "@/components/QuizViewer";
import { toast } from "sonner";

const Quizzes = () => {
  const [selectedQuiz, setSelectedQuiz] = useState<{
    isOpen: boolean;
    quiz?: typeof quizzes[0];
  }>({
    isOpen: false,
  });

  const handleQuizComplete = (score: number) => {
    toast.success(`Quiz completed with score: ${score}%`);
    setSelectedQuiz({ isOpen: false });
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
                onClick={() => setSelectedQuiz({ isOpen: true, quiz })}
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
