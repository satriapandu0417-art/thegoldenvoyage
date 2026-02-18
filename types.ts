
export interface Cadet {
  id: number;
  name: string;
  role: string;
  quote: string;
  social: {
    instagram: string;
    linkedin: string;
  };
  image: string;
}

export interface Guardian {
  id: number;
  name: string;
  title: string;
  image: string;
  specialty: string;
}

export interface Memory {
  id: number;
  title: string;
  description: string;
  image: string;
  date: string;
}

export enum AppState {
  LOADING = 'LOADING',
  READY = 'READY',
  CONTENT = 'CONTENT'
}
