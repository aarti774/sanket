
export interface DictionaryItem {
  id: string;
  word: string;
  category: "alphabet" | "number" | "common-phrase";
  description: string;
  videoUrl: string;
}

export const dictionaryItems: DictionaryItem[] = [
  // Alphabet Category
  {
    id: "alphabet-a",
    word: "A",
    category: "alphabet",
    description: "The letter A in sign language is formed by making a closed fist with your thumb on the side of your index finger.",
    videoUrl: "/videos/alphabet-1.mp4"
  },
  {
    id: "alphabet-b",
    word: "B",
    category: "alphabet",
    description: "The letter B is formed by holding your palm forward with fingers pointing up and thumb folded across the palm.",
    videoUrl: "/videos/alphabet-1.mp4"
  },
  {
    id: "alphabet-c",
    word: "C",
    category: "alphabet",
    description: "The letter C is formed by curving your fingers and thumb to form a C shape.",
    videoUrl: "/videos/alphabet-1.mp4"
  },
  
  // Numbers Category
  {
    id: "number-1",
    word: "1",
    category: "number",
    description: "The number 1 is signed by extending your index finger upward while keeping other fingers closed.",
    videoUrl: "/videos/numbers-1.mp4"
  },
  {
    id: "number-2",
    word: "2",
    category: "number",
    description: "The number 2 is signed by extending your index and middle fingers while keeping other fingers closed.",
    videoUrl: "/videos/numbers-1.mp4"
  },
  {
    id: "number-3",
    word: "3",
    category: "number",
    description: "The number 3 is signed by extending your thumb, index, and middle fingers.",
    videoUrl: "/videos/numbers-1.mp4"
  },
  
  // Common Phrases Category
  {
    id: "phrase-hello",
    word: "Hello",
    category: "common-phrase",
    description: "To sign 'hello', place your hand near your forehead with palm facing out, then move it outward and down.",
    videoUrl: "/videos/phrases-1.mp4"
  },
  {
    id: "phrase-thank-you",
    word: "Thank You",
    category: "common-phrase",
    description: "To sign 'thank you', touch your lips with your fingertips, then move your hand forward and down.",
    videoUrl: "/videos/phrases-1.mp4"
  },
  {
    id: "phrase-please",
    word: "Please",
    category: "common-phrase",
    description: "To sign 'please', rub your palm in a circular motion on your chest.",
    videoUrl: "/videos/phrases-1.mp4"
  }
];
