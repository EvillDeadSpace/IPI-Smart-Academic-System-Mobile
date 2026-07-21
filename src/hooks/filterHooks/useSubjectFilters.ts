import { useMemo, useState } from 'react';
import { SubjectEnrollment } from '@appTypes/SubjectTypes';

type FilterKey = 'tekuca_godina' | 'prenosni' | 'obavezni' | 'izborni';

export const useSubjectFilters = (enrollments: SubjectEnrollment[] | undefined) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterKey>('tekuca_godina');

  const { grouped, counts } = useMemo(() => {
    const all = enrollments ?? [];

    const currentYear = all.reduce((max, e) => (e.academicYear > max ? e.academicYear : max), '');

    const tekuca_godina = all.filter(e => e.academicYear === currentYear);
    const prenosni = all.filter(e => e.academicYear !== currentYear);
    const obavezni = all.filter(e => !e.subject.isElective);
    const izborni = all.filter(e => e.subject.isElective);

    return {
      grouped: { tekuca_godina, prenosni, obavezni, izborni },
      counts: {
        tekuca_godina: tekuca_godina.length,
        prenosni: prenosni.length,
        obavezni: obavezni.length,
        izborni: izborni.length,
      },
    };
  }, [enrollments]);

  const filtered = useMemo(() => {
    const base = grouped[activeFilter];
    if (!searchQuery.trim()) return base;
    const q = searchQuery.toLowerCase();
    return base.filter(
      e => e.subject.name.toLowerCase().includes(q) || e.subject.code.toLowerCase().includes(q),
    );
  }, [grouped, activeFilter, searchQuery]);

  return {
    filtered,
    counts,
    activeFilter,
    setActiveFilter: (filter: string) => setActiveFilter(filter as FilterKey),
    searchQuery,
    setSearchQuery,
  };
};
