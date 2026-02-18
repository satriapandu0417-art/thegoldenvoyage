
import { Cadet, Guardian, Memory } from './types';

export const GUARDIANS: Guardian[] = [
  { id: 1, name: "Admiral Harrison", title: "Chief Instructor", specialty: "Strategy & Tactics", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800" },
  { id: 2, name: "Commander Sterling", title: "Field Operations", specialty: "Leadership", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800" },
  { id: 3, name: "Captain Vance", title: "Navigation Master", specialty: "Cartography", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=800" },
  { id: 4, name: "Lieutenant Thorne", title: "Technical Officer", specialty: "Engineering", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800" },
  { id: 5, name: "Warrant Officer Blackwood", title: "Discipline Master", specialty: "Honor Code", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800" },
  { id: 6, name: "Dr. Elena Rossi", title: "Batch Mentor", specialty: "Counseling", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800" },
  { id: 7, name: "Chief Petty Officer Kane", title: "Drill Instructor", specialty: "Physical Excellence", image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=800" },
  { id: 8, name: "Master Chief Reynolds", title: "Logistics Lead", specialty: "Operational Flow", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800" },
];

export const CADETS: Cadet[] = Array.from({ length: 67 }, (_, i) => ({
  id: i + 1,
  name: `Cadet ${['James', 'Sarah', 'Leo', 'Mia', 'Alex', 'Chloe', 'Ryan', 'Zoe'][i % 8]} ${String.fromCharCode(65 + (i % 26))}.`,
  role: i === 0 ? "Battalion Commander" : "Naval Officer",
  quote: "Through the roughest seas, we find our strongest selves.",
  social: {
    instagram: "@cadet_2026",
    linkedin: "in/cadet2026"
  },
  image: `https://picsum.photos/400/500?random=${i + 10}`
}));

export const INITIAL_MEMORIES: Memory[] = [
  { id: 1, title: "The First Maiden Voyage", description: "Our very first day on the deck, full of hope and salt.", image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1200", date: "JAN 2024" },
  { id: 2, title: "Midnight Drills", description: "Testing our limits under the moonlight.", image: "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?q=80&w=1200", date: "MAR 2024" },
  { id: 3, title: "Storm Survivors", description: "The day we learned that brothers never let go.", image: "https://images.unsplash.com/photo-1498311536277-7030829bb149?q=80&w=1200", date: "JUN 2024" },
  { id: 4, title: "Golden Hour Graduation", description: "The sunset that marked our new beginning.", image: "https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=1200", date: "DEC 2025" },
  { id: 5, title: "Naval Ball 2025", description: "Elegance meets discipline for one night only.", image: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?q=80&w=1200", date: "OCT 2025" },
];

export const COLORS = {
  NAVY: '#0a0f27',
  GOLD: '#d4af37',
  MIDNIGHT: '#1c2541',
  WHITE: '#ffffff'
};
