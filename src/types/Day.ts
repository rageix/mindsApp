export interface IDay {
  id: string;
  dayOfWeek: number;
  dayOfMonth: number;
  year: number;
  isToday: boolean;
  isCurrentMonth: boolean;
}
