import { useQuery } from '@tanstack/react-query';
import { getRegisteredExams } from '@services/examService';

const HARDCODED_EMAIL = 'amar@amar.com';

export const useExamRegistrationQuery = (examId: number) => {
  const { data, isLoading } = useQuery({
    queryKey: ['examRegistrations', HARDCODED_EMAIL],
    queryFn: () => getRegisteredExams(HARDCODED_EMAIL),
  });

  const registration = data?.find(r => r.examId === examId);
  const registrationCode = registration
    ? `#PR-${new Date().getFullYear()}-${String(registration.id).padStart(4, '0')}`
    : null;

  return { registrationCode, isLoading };
};
