
export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  videoTimestamp?: number; // For video-specific questions
  explanation?: string;
}

export interface Quiz {
  id: string;
  lessonId: string;
  title: string;
  description: string;
  questions: QuizQuestion[];
}

export const quizzes: Quiz[] = [
  {
    id: "alphabet-1-quiz",
    lessonId: "alphabet-1",
    title: "Letters A-E Quiz",
    description: "Test your knowledge of the first five letters of the sign language alphabet",
    questions: [
      {
        id: "q1",
        question: "What is the correct hand position for the letter 'A'?",
        options: [
          "Closed fist with thumb alongside",
          "Open palm",
          "Peace sign",
          "Thumbs up"
        ],
        correctAnswer: "Closed fist with thumb alongside",
        videoTimestamp: 15,
        explanation: "The letter 'A' is signed by making a fist with your thumb alongside, not wrapped around your fingers."
      },
      {
        id: "q2",
        question: "Which finger is extended for the letter 'D'?",
        options: [
          "Index finger",
          "Middle finger",
          "Ring finger",
          "Pinky finger"
        ],
        correctAnswer: "Index finger",
        videoTimestamp: 45,
        explanation: "The letter 'D' is signed by extending your index finger straight up while keeping other fingers curved."
      }
    ]
  }
];
