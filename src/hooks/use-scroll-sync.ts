import { createContext, useContext, type Context } from 'react';

export interface ScrollState {
  progress: number;        // 0–1 overall page scroll
  activeSection: string;   // current section id
  sectionVisibility: Map<string, number>; // id → 0–1 visibility ratio
}

export const ScrollContext: Context<ScrollState> = createContext<ScrollState>({
  progress: 0,
  activeSection: 'hero',
  sectionVisibility: new Map(),
});

export const useScrollSync = () => useContext(ScrollContext);
