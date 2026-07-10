export type SemesterType = 'WINTER' | 'SUMMER';

export type Semester = {
  id: number;
  name: string;
  type: SemesterType;
  startDate: string;
  endDate: string;
};

export type CurrentSemesterResponse = Semester | null;

export type SemesterProgress = {
  totalWeeks: number;
  currentWeek: number;
  weeksLeft: number;
  percent: number;
};
