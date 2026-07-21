import { useQuery } from '@tanstack/react-query';

import { getStudentEnrollments } from '../../services/fetchEnrollment';

export const useEnrollmentQuery = (email: string) => {
  const { data, isError, isLoading, refetch } = useQuery({
    queryKey: ['enrollments', email],
    queryFn: () => getStudentEnrollments(email),
  });

  return { enrollments: data, isError, isLoading, refetch };
};
