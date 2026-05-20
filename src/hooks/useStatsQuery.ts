import { useQuery } from '@tanstack/react-query';

import { getAllStats } from '../services/fetchStats';

export const useStatsQuery = (email: string) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['studentStats', email],
    queryFn: () => getAllStats(email),
  });
  return { data, isLoading, isError };
};
