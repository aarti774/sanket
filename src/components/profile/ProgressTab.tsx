
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

interface ProgressTabProps {
  alphabet: any[];
  numbers: any[];
  commonPhrases: any[];
  quizzes: any[];
}

const ProgressTab: React.FC<ProgressTabProps> = ({
  alphabet,
  numbers,
  commonPhrases,
  quizzes,
}) => {
  const allLessons = [...alphabet, ...numbers, ...commonPhrases];
  const completedLessons = allLessons.filter(lesson => lesson.progress > 0);
  const totalProgress = allLessons.length > 0 
    ? Math.round((completedLessons.length / allLessons.length) * 100) 
    : 0;

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>Learning Progress</CardTitle>
        <CardDescription>Track your journey in learning sign language</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm font-medium">Overall Progress</span>
              <span className="text-sm font-medium">{totalProgress}%</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary" 
                style={{ width: `${totalProgress}%` }}
              ></div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Lesson Categories</h3>
            
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <h4 className="font-medium mb-2">Alphabet</h4>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Completed</span>
                    <span>{alphabet.filter(l => l.progress > 0).length} of {alphabet.length}</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary" 
                      style={{ width: `${alphabet.length > 0 ? (alphabet.filter(l => l.progress > 0).length / alphabet.length) * 100 : 0}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              
              <div className="border rounded-lg p-4">
                <h4 className="font-medium mb-2">Numbers</h4>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Completed</span>
                    <span>{numbers.filter(l => l.progress > 0).length} of {numbers.length}</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary" 
                      style={{ width: `${numbers.length > 0 ? (numbers.filter(l => l.progress > 0).length / numbers.length) * 100 : 0}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              
              <div className="border rounded-lg p-4">
                <h4 className="font-medium mb-2">Common Phrases</h4>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Completed</span>
                    <span>{commonPhrases.filter(l => l.progress > 0).length} of {commonPhrases.length}</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary" 
                      style={{ width: `${commonPhrases.length > 0 ? (commonPhrases.filter(l => l.progress > 0).length / commonPhrases.length) * 100 : 0}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Quiz Performance</h3>
            <div className="border rounded-lg p-4">
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Quizzes Completed</span>
                  <span>{quizzes.length} of {quizzes.length}</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary" 
                    style={{ width: `${quizzes.length > 0 ? 100 : 0}%` }}
                  ></div>
                </div>
                {quizzes.length > 0 ? (
                  <div className="mt-4 space-y-2">
                    <h4 className="text-sm font-medium">Your Quiz Results:</h4>
                    <ul className="space-y-2">
                      {quizzes.map((quiz, index) => (
                        <li key={index} className="text-sm">
                          <div className="flex justify-between">
                            <span>{quiz['quiz-name']}</span>
                            <span className="font-medium">{quiz.score}%</span>
                          </div>
                          <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden mt-1">
                            <div 
                              className="h-full bg-primary" 
                              style={{ width: `${quiz.score}%` }}
                            ></div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 mt-2">Complete quizzes to track your performance</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressTab;
