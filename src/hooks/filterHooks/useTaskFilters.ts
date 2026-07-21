import { useState, useMemo } from 'react';
import { StudentAssignment } from '@appTypes/TaskTypes';

type FilterKey = 'svi' | 'aktivni' | 'predani' | 'kasne';

export const useTaskFilters = (assignments: StudentAssignment[] | undefined) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterKey>('svi');

  const { grouped, counts } = useMemo(() => {
    const now = new Date();
    const active: StudentAssignment[] = [];
    const submitted: StudentAssignment[] = [];
    const late: StudentAssignment[] = [];

    for (const item of assignments ?? []) {
      if (item.submission !== null) submitted.push(item);
      else if (new Date(item.dueDate) >= now) active.push(item);
      else late.push(item);
    }

    const all = assignments ?? [];
    return {
      grouped: { svi: all, aktivni: active, predani: submitted, kasne: late },
      counts: {
        svi: all.length,
        aktivni: active.length,
        predani: submitted.length,
        kasne: late.length,
      },
    };
  }, [assignments]);

  const filtered = useMemo(() => {
    const base = grouped[activeFilter];
    if (!searchQuery.trim()) return base;
    const q = searchQuery.toLowerCase();
    return base.filter(
      item => item.title.toLowerCase().includes(q) || item.subject.name.toLowerCase().includes(q),
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
