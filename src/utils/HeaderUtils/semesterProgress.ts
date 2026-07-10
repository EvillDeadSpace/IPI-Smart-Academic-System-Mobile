import { Semester, SemesterProgress } from '@appTypes/semester';

// One week expressed in milliseconds: ms -> s -> min -> hour -> day -> week
const WEEK_MS = 1000 * 60 * 60 * 24 * 7;

export const getSemesterProgress = (semester: Semester): SemesterProgress => {
  // Turn the ISO date strings (and "now") into plain numbers (milliseconds)
  const start = new Date(semester.startDate).getTime();
  const end = new Date(semester.endDate).getTime();
  const now = Date.now();

  const totalMs = end - start; // how long the whole semester lasts
  const elapsedMs = now - start; // how much has passed since it started

  const totalWeeks = Math.ceil(totalMs / WEEK_MS);

  // Which week we are in now, clamped so it never goes below 0 or above total
  const currentWeek = Math.min(Math.max(Math.ceil(elapsedMs / WEEK_MS), 0), totalWeeks);

  const weeksLeft = totalWeeks - currentWeek;

  // How much of the semester has elapsed, clamped to the 0–100 range
  const percent = Math.min(Math.max(Math.round((elapsedMs / totalMs) * 100), 0), 100);

  return { totalWeeks, currentWeek, weeksLeft, percent };
};
