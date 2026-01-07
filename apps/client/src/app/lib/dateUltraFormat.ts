import { format, isToday, isYesterday } from 'date-fns';

export const dateUltraFormat = (date: string) => {
  if (isToday(date)) {
    return format(date, 'hh:mm a');
  }
  if (isYesterday(date)) {
    return 'Yesterday';
  }
  return format(date, 'MMM d');
};
