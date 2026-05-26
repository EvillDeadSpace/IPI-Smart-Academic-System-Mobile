import { QuickAccessItemsType } from '../types/QuickAccessTypes';
import { AssignmentDifficulty } from '../types/TaskTypes';

export const horizontalItems: { id: string; title: string; count: number }[] = [
  { id: '1', title: 'Sve', count: 6 },
  { id: '2', title: 'Nepročitane', count: 3 },
  { id: '3', title: 'Akademske', count: 4 },
  { id: '4', title: 'Novosti', count: 2 },
];

export const QuickAccessItems: QuickAccessItemsType[] = [
  {
    id: 'zadaci',
    title: 'Zadaci',
    icon: 'document-text-outline',
    color: 'blue',
    subtitle: '3 aktivna',
  },
  {
    id: 'skolarina',
    title: 'Školarina',
    icon: 'wallet-outline',
    color: 'green',
    subtitle: 'rok za 7 dana',
  },
  {
    id: 'zavrsni-rad',
    title: 'Završni rad',
    icon: 'school-outline',
    color: 'purple',
    subtitle: '45% kompletirano',
  },
  { id: 'ispiti', title: 'Ispiti', icon: 'calendar-outline', color: 'red', subtitle: '2 aktivna' },
];

export const filterPills: { id: string; label: string }[] = [
  { id: 'svi', label: 'Svi' },
  { id: 'aktivni', label: 'Aktivni' },
  { id: 'predani', label: 'Predani' },
  { id: 'kasne', label: 'Kasne' },
];

export type CardVariant = 'active' | 'urgent' | 'late' | 'submitted' | 'graded';

export const difficultyLabel: Record<AssignmentDifficulty, string> = {
  LAGAN: 'Lagan',
  SREDNJE: 'Srednje',
  TESKO: 'Teško',
};

export const difficultyColor: Record<AssignmentDifficulty, string> = {
  LAGAN: '#16a34a',
  SREDNJE: '#f59e0b',
  TESKO: '#dc2626',
};

export const difficultyDots: Record<AssignmentDifficulty, number> = {
  LAGAN: 1,
  SREDNJE: 2,
  TESKO: 3,
};

export const DIFFICULTY_CONFIG: Record<
  AssignmentDifficulty,
  { label: string; dots: number; time: string; color: string }
> = {
  LAGAN: { label: 'Lagan', dots: 1, time: '~1h rada', color: '#4CAF50' },
  SREDNJE: { label: 'Srednje', dots: 2, time: '~3h rada', color: '#FF9800' },
  TESKO: { label: 'Teško', dots: 3, time: '~5h rada', color: '#F44336' },
};
