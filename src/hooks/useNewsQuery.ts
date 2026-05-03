import { useQuery } from '@tanstack/react-query';

import { getAllNews } from '../services/fetchNews';

export const useNewsQuery = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['news'],
    queryFn: getAllNews,
  });
  return { news: data, isLoading, isError };
};
