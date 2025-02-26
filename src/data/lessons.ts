
interface Lesson {
  id: string;
  title: string;
  description: string;
  progress: number;
  videoUrl?: string;
}

export const alphabet: Lesson[] = [
  {
    id: "alphabet-1",
    title: "Letters A-E",
    description: "Learn the basic hand signs for letters A through E",
    progress: 0,
    videoUrl: "/videos/alphabet-1.mp4",
  },
  {
    id: "alphabet-2",
    title: "Letters F-J",
    description: "Master the hand signs for letters F through J",
    progress: 0,
    videoUrl: "/videos/alphabet-2.mp4",
  },
  {
    id: "alphabet-3",
    title: "Letters K-O",
    description: "Practice signing letters K through O",
    progress: 0,
    videoUrl: "/videos/alphabet-3.mp4",
  },
  {
    id: "alphabet-4",
    title: "Letters P-T",
    description: "Learn to sign letters P through T",
    progress: 0,
    videoUrl: "/videos/alphabet-4.mp4",
  },
  {
    id: "alphabet-5",
    title: "Letters U-Z",
    description: "Complete the alphabet with letters U through Z",
    progress: 0,
    videoUrl: "/videos/alphabet-5.mp4",
  },
];

export const numbers: Lesson[] = [
  {
    id: "numbers-1",
    title: "Numbers 1-20",
    description: "Learn to sign basic numbers from 1 to 20",
    progress: 0,
    videoUrl: "/videos/numbers-1.mp4",
  },
  {
    id: "numbers-2",
    title: "Numbers 21-50",
    description: "Practice signing numbers from 21 to 50",
    progress: 0,
    videoUrl: "/videos/numbers-2.mp4",
  },
  {
    id: "numbers-3",
    title: "Numbers 51-100",
    description: "Master signing numbers from 51 to 100",
    progress: 0,
    videoUrl: "/videos/numbers-3.mp4",
  },
];

export const commonPhrases: Lesson[] = [
  {
    id: "phrases-1",
    title: "Greetings",
    description: "Learn basic greetings and introductions",
    progress: 0,
    videoUrl: "/videos/phrases-1.mp4",
  },
  {
    id: "phrases-2",
    title: "Common Questions",
    description: "Master frequently asked questions in sign language",
    progress: 0,
    videoUrl: "/videos/phrases-2.mp4",
  },
  {
    id: "phrases-3",
    title: "Daily Conversations",
    description: "Practice everyday conversational phrases",
    progress: 0,
    videoUrl: "/videos/phrases-3.mp4",
  },
  {
    id: "phrases-4",
    title: "Emergency Phrases",
    description: "Important phrases for emergency situations",
    progress: 0,
    videoUrl: "/videos/phrases-4.mp4",
  },
];
