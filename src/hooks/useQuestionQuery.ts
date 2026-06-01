import { useQuery } from '@tanstack/react-query';

import { getAllQuestion } from '../services/fetchQuestions';

export const useQuestionQuery = (assignmentId: number) => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['questions', assignmentId],
    queryFn: () => getAllQuestion(assignmentId),
  });

  return { question: data, isLoading, isError, refetch };
};
