import { useQuery } from '@tanstack/react-query';

import { getExams } from '../services/examService';

export const useExamQuery = (month: number, year: number) => {
  const { isLoading, isError, data } = useQuery({
    queryKey: ['exam', month, year],
    queryFn: () => getExams(month, year),
  });

  return { exam: data ?? [], isLoading, isError };
};
