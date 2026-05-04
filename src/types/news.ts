export type newsType = {
  id: number;
  tagName: 'partnerships' | 'events' | 'achievements' | 'announcements';
  title: string;
  content: string;
  likes: number;
  calendarNews: boolean;
  eventDate: string | null;
  online: boolean;
  createdAt: string;
  updatedAt: string;
};

// For NotificationSliderBar
export type Props = {
  data: {
    id: string;
    title: string;
    count: number;
  };
  onFilterChange: (filter: string) => void;
  activeTab: boolean;
};
