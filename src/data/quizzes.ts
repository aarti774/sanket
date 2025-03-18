
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
  },
  {
    id: "alphabet-2-quiz",
    lessonId: "alphabet-2",
    title: "Letters F-J Quiz",
    description: "Test your knowledge of letters F through J in sign language",
    questions: [
      {
        id: "q1",
        question: "How is the letter 'F' formed in sign language?",
        options: [
          "Thumb and index finger form a circle, other fingers extended",
          "Index and thumb touch, other fingers extended",
          "Three fingers extended upward",
          "All fingers folded except thumb"
        ],
        correctAnswer: "Index and thumb touch, other fingers extended",
        videoTimestamp: 10,
        explanation: "For the letter 'F', the index finger and thumb touch, while the other three fingers are extended."
      },
      {
        id: "q2",
        question: "Which direction does the pinky point for the letter 'J'?",
        options: [
          "Upward",
          "Downward",
          "It traces a 'J' shape",
          "To the side"
        ],
        correctAnswer: "It traces a 'J' shape",
        videoTimestamp: 55,
        explanation: "The letter 'J' is signed by starting with the pinky extended and tracing a 'J' shape in the air."
      }
    ]
  },
  {
    id: "alphabet-3-quiz",
    lessonId: "alphabet-3",
    title: "Letters K-O Quiz",
    description: "Test your knowledge of letters K through O in sign language",
    questions: [
      {
        id: "q1",
        question: "What is the correct position for letter 'K'?",
        options: [
          "Index and middle finger extended upward, thumb between them",
          "Index finger and thumb extended in 'L' shape",
          "All fingers folded into palm",
          "Pinky extended, all other fingers closed"
        ],
        correctAnswer: "Index and middle finger extended upward, thumb between them",
        videoTimestamp: 12,
        explanation: "The letter 'K' is formed with the index and middle fingers extended upward with the thumb between them."
      }
    ]
  },
  {
    id: "alphabet-4-quiz",
    lessonId: "alphabet-4",
    title: "Letters P-T Quiz",
    description: "Test your knowledge of letters P through T in sign language",
    questions: [
      {
        id: "q1",
        question: "Which letter is formed by pointing the index finger downward?",
        options: [
          "P",
          "Q",
          "R",
          "T"
        ],
        correctAnswer: "P",
        videoTimestamp: 20,
        explanation: "The letter 'P' is formed by pointing the index finger downward while the other fingers are extended."
      }
    ]
  },
  {
    id: "alphabet-5-quiz",
    lessonId: "alphabet-5",
    title: "Letters U-Z Quiz",
    description: "Test your knowledge of letters U through Z in sign language",
    questions: [
      {
        id: "q1",
        question: "How is the letter 'Z' signed?",
        options: [
          "Index finger traces a 'Z' shape",
          "All fingers closed except pinky",
          "Thumb and pinky extended, other fingers closed",
          "Hand flat with palm facing forward"
        ],
        correctAnswer: "Index finger traces a 'Z' shape",
        videoTimestamp: 30,
        explanation: "The letter 'Z' is signed by tracing the shape of a 'Z' with the index finger."
      }
    ]
  },
  {
    id: "numbers-1-quiz",
    lessonId: "numbers-1",
    title: "Numbers 1-20 Quiz",
    description: "Test your knowledge of signing numbers from 1 to 20",
    questions: [
      {
        id: "q1",
        question: "How many fingers are extended for the number 5?",
        options: [
          "Five fingers spread apart",
          "Closed fist",
          "Only the thumb",
          "Four fingers without the thumb"
        ],
        correctAnswer: "Five fingers spread apart",
        videoTimestamp: 25,
        explanation: "The number 5 is signed by extending all five fingers spread apart."
      }
    ]
  },
  {
    id: "numbers-2-quiz",
    lessonId: "numbers-2",
    title: "Numbers 21-50 Quiz",
    description: "Test your knowledge of signing numbers from 21 to 50",
    questions: [
      {
        id: "q1",
        question: "How is the number 25 signed?",
        options: [
          "Sign for 2, then sign for 5",
          "Sign for 20, then sign for 5",
          "All fingers extended twice",
          "Two hands showing 10 and 15"
        ],
        correctAnswer: "Sign for 20, then sign for 5",
        videoTimestamp: 40,
        explanation: "The number 25 is signed by first signing 20, then signing 5."
      }
    ]
  },
  {
    id: "numbers-3-quiz",
    lessonId: "numbers-3",
    title: "Numbers 51-100 Quiz",
    description: "Test your knowledge of signing numbers from 51 to 100",
    questions: [
      {
        id: "q1",
        question: "How is the number 75 signed?",
        options: [
          "Sign for 70, then sign for 5",
          "Sign for 7 and 5 together",
          "Both hands showing 7 and 5",
          "Seven fingers then five fingers"
        ],
        correctAnswer: "Sign for 70, then sign for 5",
        videoTimestamp: 35,
        explanation: "The number 75 is signed by first signing 70, then signing 5."
      }
    ]
  },
  {
    id: "phrases-1-quiz",
    lessonId: "phrases-1",
    title: "Greetings Quiz",
    description: "Test your knowledge of basic greetings in sign language",
    questions: [
      {
        id: "q1",
        question: "How do you sign 'Hello' in ASL?",
        options: [
          "Wave your open hand",
          "Touch your forehead and then move outward",
          "Place your hand over your heart",
          "Tap your chin twice"
        ],
        correctAnswer: "Wave your open hand",
        videoTimestamp: 10,
        explanation: "The greeting 'Hello' is typically signed with a friendly wave of the open hand."
      }
    ]
  },
  {
    id: "phrases-2-quiz",
    lessonId: "phrases-2",
    title: "Common Questions Quiz",
    description: "Test your knowledge of how to ask common questions in sign language",
    questions: [
      {
        id: "q1",
        question: "What is the sign for 'How are you?'",
        options: [
          "Point at the other person and raise eyebrows",
          "Palms up, moving from waist level outward",
          "Tap your chest and then point",
          "Touch your chin and then move hand forward"
        ],
        correctAnswer: "Palms up, moving from waist level outward",
        videoTimestamp: 20,
        explanation: "The question 'How are you?' is signed with palms up and hands moving outward from the waist level."
      }
    ]
  },
  {
    id: "phrases-3-quiz",
    lessonId: "phrases-3",
    title: "Daily Conversations Quiz",
    description: "Test your knowledge of everyday conversational phrases in sign language",
    questions: [
      {
        id: "q1",
        question: "How do you sign 'Thank you'?",
        options: [
          "Touch fingers to lips and move hand forward",
          "Thumbs up gesture",
          "Flat hand on chest moving in circle",
          "Two hands pressed together"
        ],
        correctAnswer: "Touch fingers to lips and move hand forward",
        videoTimestamp: 15,
        explanation: "The phrase 'Thank you' is signed by touching the fingers to the lips and then moving the hand forward."
      }
    ]
  },
  {
    id: "phrases-4-quiz",
    lessonId: "phrases-4",
    title: "Emergency Phrases Quiz",
    description: "Test your knowledge of important emergency phrases in sign language",
    questions: [
      {
        id: "q1",
        question: "What is the sign for 'Help'?",
        options: [
          "Closed fist thumbs up",
          "One hand on top of the other, both palms up, pushing upward",
          "Waving both hands frantically",
          "Pointing to yourself then others"
        ],
        correctAnswer: "One hand on top of the other, both palms up, pushing upward",
        videoTimestamp: 25,
        explanation: "The word 'Help' is signed by placing one hand (palm up) on top of the other (palm up) and pushing upward."
      }
    ]
  }
];
