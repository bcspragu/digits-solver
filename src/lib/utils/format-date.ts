import { format, isToday } from 'date-fns';

export const formatDate = (date: Date): string => {
  const formatted = format(date, 'E do MMMM yyyy');

  const isTod = isToday(date);

  return isToday(date) ? `${formatted} – Today` : formatted;
};
