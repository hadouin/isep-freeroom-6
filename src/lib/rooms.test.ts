import { describe, expect, it } from 'vitest';
import { getRoom, roomStatus } from '$lib/rooms';

describe('rooms test', () => {
  it('should test getRoom', async () => {
    expect((await getRoom('L012'))?.roomId).toBe('L012');
  });

  it('should test roomStatus', () => {
    const justBefore = new Date('2024-06-12T09:59:59.000Z');
    const start = new Date('2024-06-12T10:00:00.000Z');
    const end = new Date('2024-06-12T14:00:00.000Z');
    const justAfter = new Date('2024-06-12T14:00:01.000Z');
    const event = { id: '', title: '', resourceIds: [], start, end };
    expect(roomStatus(start, [event])).toEqual({ isFree: false, currentEvent: event });
    expect(roomStatus(end, [event])).toEqual({ isFree: false, currentEvent: event });
    expect(roomStatus(justBefore, [event])).toEqual({ isFree: true, currentEvent: event });
    expect(roomStatus(justAfter, [event])).toEqual({ isFree: true, currentEvent: undefined });
  });
});
