export const formatDate = (iso: string): string => {
  const diff = Math.floor((Date.now() - new Date(iso).getTime()) / 60000);
  if (diff < 1) return 'upravo';
  if (diff < 60) return `prije ${diff} min`;
  const hours = Math.floor(diff / 60);
  if (hours < 24) return `prije ${hours} h`;
  return `prije ${Math.floor(hours / 24)} d`;
};
