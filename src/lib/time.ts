export function getTimeTo(date: number | string | Date): string {
  date = new Date(date);

  const intervalInSec = (date.getTime() - Date.now()) / (1000 * 60);

  const hours = Math.trunc(intervalInSec / 60).toString();
  const minutes = Math.trunc(intervalInSec % 60).toString();

  if (hours == '0') {
    return `${minutes}min`;
  }

  return `${hours}h${minutes.padStart(2, '0')}`;
}

export function offsetToParis(date: number) {
  const p = new Intl.DateTimeFormat('fr-FR', {
    timeZone: 'Europe/Paris',
    dateStyle: 'short',
    timeStyle: 'medium',
  })
    .formatToParts(date)
    .reduce(
      (acc, { type, value }) => {
        if (type !== 'literal') acc[type] = parseInt(value, 10);
        return acc;
      },
      {} as Record<keyof Intl.DateTimeFormatPartTypesRegistry, number>
    );
  const parisAsCurrTZ = new Date(p.year, p.month - 1, p.day, p.hour, p.minute, p.second).getTime();

  let asTimeSec = date;
  const over = asTimeSec % 1000;
  asTimeSec -= over >= 0 ? over : 1000 + over;
  return parisAsCurrTZ - asTimeSec;
}

export function toParisDate(time: number): Date {
  return new Date(time + offsetToParis(time));
}

export function startOfDay(date: Date): Date {
  return new Date(date.setHours(0, 0, 0, 0));
}

export function endOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999);
}
