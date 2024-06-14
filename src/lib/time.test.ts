import { describe, expect, it } from 'vitest';
import { endOfDay, getTimeTo, offsetToParis, startOfDay, toParisDate } from '$lib/time';
import { endOfToday, startOfToday } from 'date-fns';

describe('time test', () => {
  // change TZ to UTC with globalSetup.ts
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
    expect(getTimeTo(new Date().getTime() + 60_000)).toBe('1min');
    expect(getTimeTo(new Date().getTime() + 3_660_000)).toBe('1h01');
  });
});
