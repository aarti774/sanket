
import { useState } from "react";
import { Check, X, PlayCircle, ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Quiz, QuizQuestion } from "@/data/quizzes";
import { toast } from "sonner";

interface QuizViewerProps {
  quiz: Quiz;
  videoUrl?: string;
  onClose: () => void;
  onComplete: (score: number) => void;
}

const QuizViewer = ({ quiz, videoUrl, onClose, onComplete }: QuizViewerProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [videoTime, setVideoTime] = useState(0);

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const progress = (Object.keys(selectedAnswers).length / quiz.questions.length) * 100;

  const handleAnswerSelect = (answer: string) => {
    if (selectedAnswers[currentQuestion.id]) return; // Prevent changing answer

    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: answer
    }));

    if (answer === currentQuestion.correctAnswer) {
      toast.success("Correct! Well done!");
    } else {
      toast.error("Not quite right. Try reviewing the lesson.");
    }
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    setShowExplanation(false);
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      const correctAnswers = Object.entries(selectedAnswers)
        .filter(([_, answer]) => {
          const question = quiz.questions.find(q => q.id === _);
          return question?.correctAnswer === answer;
        }).length;
      const score = (correctAnswers / quiz.questions.length) * 100;
      onComplete(score);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setShowExplanation(!!selectedAnswers[quiz.questions[currentQuestionIndex - 1].id]);
    }
  };

  const jumpToVideoTimestamp = () => {
    const video = document.querySelector('video');
    if (video && currentQuestion.videoTimestamp) {
      video.currentTime = currentQuestion.videoTimestamp;
      video.play();
    }
  };

  const isAnswerCorrect = (questionId: string, option: string) => {
    const selectedAnswer = selectedAnswers[questionId];
    if (!selectedAnswer) return null;
    return option === quiz.questions.find(q => q.id === questionId)?.correctAnswer;
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl bg-white rounded-lg overflow-hidden">
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">{quiz.title}</h2>
            <Button variant="ghost" onClick={onClose}>
              <ArrowLeft className="mr-2" /> Exit Quiz
            </Button>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Question {currentQuestionIndex + 1} of {quiz.questions.length}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <div className="space-y-6">
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-lg font-medium">{currentQuestion.question}</h3>
              {currentQuestion.videoTimestamp && videoUrl && (
                <Button
                  variant="outline"
                  onClick={jumpToVideoTimestamp}
                  className="flex-shrink-0"
                >
                  <PlayCircle className="mr-2" />
                  Watch Hint
                </Button>
              )}
            </div>

            <div className="grid gap-4">
              {currentQuestion.options.map((option) => {
                const isCorrect = isAnswerCorrect(currentQuestion.id, option);
                return (
                  <Button
                    key={option}
                    onClick={() => handleAnswerSelect(option)}
                    disabled={!!selectedAnswers[currentQuestion.id]}
                    variant={
                      !selectedAnswers[currentQuestion.id]
                        ? "outline"
                        : isCorrect === true
                        ? "default"
                        : isCorrect === false
                        ? "destructive"
                        : "outline"
                    }
                    className="justify-between"
                  >
                    {option}
                    {isCorrect === true && <Check className="h-5 w-5" />}
                    {isCorrect === false && <X className="h-5 w-5" />}
                  </Button>
                );
              })}
            </div>

            {showExplanation && currentQuestion.explanation && (
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm">{currentQuestion.explanation}</p>
              </div>
            )}

            <div className="flex justify-between pt-4">
              <Button
                variant="outline"
                onClick={handlePrevQuestion}
                disabled={currentQuestionIndex === 0}
              >
                <ArrowLeft className="mr-2" /> Previous
              </Button>
              <Button
                onClick={handleNextQuestion}
                disabled={!selectedAnswers[currentQuestion.id]}
              >
                {currentQuestionIndex === quiz.questions.length - 1 ? "Complete Quiz" : "Next"}
                <ArrowRight className="ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default QuizViewer;
