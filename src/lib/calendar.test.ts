import { describe, expect, it } from 'vitest';
import { extractCalEvents } from '$lib/calendar';

describe('calendar test', () => {
  it('should test extractCalEvents', () => {
    // noinspection SpellCheckingInspection
    const icalRaw = `BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nCATEGORIES:HYPERPLANNING\nDTSTAMP:20240613T182453Z\nLAST-MODIFIED:20240419T084451Z\nUID:Cours-144149-42-L016-Index-Education\nDTSTART:21240603T060000Z\nDTEND:21240603T180000Z\nSUMMARY;LANGUAGE=fr:Réservation de salles - - - pour la JE\nLOCATION;LANGUAGE=fr:L016\\, L017\nDESCRIPTION;LANGUAGE=fr:Matière : Réservation de salles\\nType : -\\nSalles :\n  L016\\, L017\\nMémo : pour la JE\\n\nX-ALT-DESC;FMTTYPE=text/html:Matière : Réservation de salles<br/>Type : -<b\n r/>Salles : L016\\, L017<br/>Mémo : pour la JE<br/>\nEND:VEVENT\nEND:VCALENDAR`;
    const events = extractCalEvents(icalRaw, 'L016');
    expect(events).toHaveLength(1);
    expect(events[0].start.toUTCString()).toBe('Sat, 03 Jun 2124 06:00:00 GMT'); // +100 years because of startOfWeek trim
  });
});
