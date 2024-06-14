import { describe, expect, it } from 'vitest';
import { endOfDay, getTimeTo, offsetToParis, startOfDay, toParisDate } from '$lib/time';
import { endOfToday, startOfToday } from 'date-fns';

describe('time test', () => {
  // TZ set to UTC for tests in globalSetup.ts
  it('should log timezone offset', async () => {
    console.log('timezone offset:', new Date().getTimezoneOffset());
  });

  it('(UTC TZ) should test offsetToParis & nowParis', () => {
    const now = Date.now();
    const offset = 120 * 60_000; // 120 (s to ms) offset works in summer, 60 in winter time
    expect(offsetToParis(now)).toBe(offset);
    expect(toParisDate(now)).toEqual(new Date(now + offset));
  });
  // it('(Paris TZ) should test offsetToParis & nowParis', () => {
  //   const now = Date.now();
  //   expect(offsetToParis(now)).toBe(0);
  //   expect(toParisDate(now)).toEqual(new Date(now));
  // });

  it('should test startOfDay', () => {
    expect(startOfDay(new Date())).toEqual(startOfToday());
  });

  it('should test endOfDay', () => {
    expect(endOfDay(new Date())).toEqual(endOfToday());
  });

  it('should test getTimeTo', () => {
    expect(getTimeTo(Date.now() + 60_000)).toBe('1min');
    expect(getTimeTo(Date.now() + 3_660_000)).toBe('1h01');
    expect(getTimeTo(Date.now() + 86_400_000)).toBe('24h00');
  });
});
