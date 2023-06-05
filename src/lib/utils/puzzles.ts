import { puzzles } from '$lib/constants/puzzles';

const cr = 864e5;
const startDate = new Date('4/10/2023');

export const getPuzzleDate = (idx: number): Date => {
  const date = new Date(startDate);
  date.setDate(date.getDate() + idx);

  return date;
};

const getDaysSinceStart = (): number => {
  const today = new Date().setHours(0, 0, 0, 0);
  const difference = today - startDate.setHours(0, 0, 0, 0);

  const numDays = Math.round(difference / cr);

  return numDays >= 0 ? numDays : 0;
};

export const getTodaysPuzzleIndex = (): number => {
  const daysSinceStart = getDaysSinceStart();
  return daysSinceStart % puzzles.length;
};

export const getAllPuzzles = () => puzzles;
