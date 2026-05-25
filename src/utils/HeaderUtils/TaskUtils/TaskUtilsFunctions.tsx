export function getGreeting() {
  const now = new Date();

  const hour = Number(
    new Intl.DateTimeFormat('bs-BA', {
      hour: 'numeric',
      hour12: false,
      timeZone: 'Europe/Sarajevo',
    }).format(now),
  );

  if (hour >= 5 && hour < 12) {
    return 'Dobro jutro';
  }

  if (hour >= 12 && hour < 18) {
    return 'Dobar dan';
  }

  if (hour >= 18 && hour < 22) {
    return 'Dobro veče';
  }

  return 'Laku noć';
}
