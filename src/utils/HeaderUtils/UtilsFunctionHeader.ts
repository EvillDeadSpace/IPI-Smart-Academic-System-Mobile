export const getInitials = (fullName: string): string =>
  fullName
    .split(' ')
    .map(word => word.charAt(0).toUpperCase())
    .join('');
