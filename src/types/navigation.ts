import { AssignmentDifficulty } from './TaskTypes';

export type RootStackParamList = {
  Home: undefined;
  Notifications: undefined;
  Tasks: undefined;
  TaskDetails: {
    id: number;
    title: string;
    dueDate: string;
    subject: { name: string };
    maxPoints: number;
    professorName: string;
    difficulty: AssignmentDifficulty;
    professorS3Path: string | null;
  };
  MainTabs: { screen: string } | undefined;
};
