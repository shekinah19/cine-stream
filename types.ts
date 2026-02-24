export interface Movie {
  id: number;
  title: string;
  description: string;
  thumbnailUrl: string;
  coverUrl: string;
  videoUrl: string; // URL for the video stream
  genre: string;
  rating: string; // e.g., "98% Recommandé"
  year: number;
  duration: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
}