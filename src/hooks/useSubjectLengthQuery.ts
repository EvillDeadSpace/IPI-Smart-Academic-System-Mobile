import { useQuery } from '@tanstack/react-query';

import { getLengthSubject } from '../services/fetchStats';

export const useSubjectLengthQuery = (email: string) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['subjectLength', email],
    queryFn: () => getLengthSubject(email),
  });
  return { data, isLoading, isError };
};
