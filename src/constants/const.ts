import { QuickAccessItemsType } from '../types/QuickAccessTypes';
import { TaskCardTypes } from '../types/TaskTypes';

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
