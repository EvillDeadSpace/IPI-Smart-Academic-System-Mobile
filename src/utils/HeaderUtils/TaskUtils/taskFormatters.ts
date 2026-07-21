import { CardVariant } from '../../../constants/const';
import { StudentAssignment } from '../../../types/TaskTypes';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec'];
const DAYS = ['Ned', 'Pon', 'Uto', 'Sri', 'Čet', 'Pet', 'Sub'];

// "14:05" — used inside formatDate when the deadline is today or tomorrow
export const formatTime = (date: Date): string => {
  const h = String(date.getHours()).padStart(2, '0');
  const m = String(date.getMinutes()).padStart(2, '0');
  return `${h}:${m}`;
};

// "Danas, 14:05" / "Sutra, 09:00" / "Pon, 3. Jun"
export const formatDate = (iso: string): string => {
  const date = new Date(iso);
  const diff = Math.ceil((date.getTime() - Date.now()) / (1000 * 60 * 60 * 24));

  if (diff === 0) return `Danas, ${formatTime(date)}`;
  if (diff === 1) return `Sutra, ${formatTime(date)}`;
  return `${DAYS[date.getDay()]}, ${date.getDate()}. ${MONTHS[date.getMonth()]}`;
};

// Time remaining until deadline: "za 3h" / "za 2 dana"
export const formatTimeLeft = (iso: string): string => {
  const diffMs = new Date(iso).getTime() - Date.now();
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const days = Math.floor(hours / 24);
  if (hours < 24) return `za ${hours}h`;
  return `za ${days} dana`;
};

// How many days past the deadline: "Kasni 2 dana"
export const formatDaysLate = (iso: string): string => {
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / (1000 * 60 * 60 * 24));
  return `Kasni ${days} ${days === 1 ? 'dan' : 'dana'}`;
};

// Short date for submission/grade timestamps: "3. Jun"
export const formatShortDate = (iso: string | null): string => {
  if (!iso) return '';
  const date = new Date(iso);
  return `${date.getDate()}. ${MONTHS[date.getMonth()]}`;
};

// Truncates a string to max chars with "..." — used for displaying submission file names
export const truncate = (str: string | null, max: number): string => {
  if (!str) return '';
  return str.length > max ? str.slice(0, max) + '...' : str;
};

// Determines the card variant based on submission status and deadline
export const getVariant = (item: StudentAssignment): CardVariant => {
  if (item.submission?.status === 'GRADED') return 'graded';
  if (item.submission?.status === 'PENDING') return 'submitted';

  const now = Date.now();
  const due = new Date(item.dueDate).getTime();

  if (due < now) return 'late';
  if (due - now < 24 * 60 * 60 * 1000) return 'urgent';
  return 'active';
};

// calculateTimeLeft fucntion how back me hours, minuts and secund from number
export function calculateTimeLeft(dueDate: string) {
  const diff = new Date(dueDate).getTime() - Date.now();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return { hours, minutes, seconds };
}

// calculated Time Ago from question on QA screen,
export const formatTimeAgo = (dateStr: string) => {
  const diff = Date.now() - new Date(dateStr).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 60) return `prije ${minutes}min`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `prije ${hours}h`;
  const days = Math.floor(hours / 24);
  if (days === 1) return 'juče';
  return `prije ${days} dana`;
};
