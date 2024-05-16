export interface Event {
  id: string;
  resourceIds: string[];
  allDay: boolean;
  start: Date;
  end: Date;
  title: string;
  editable: boolean;
  startEditable: boolean;
  durationEditable: boolean;
  display: 'auto' | 'background';
  backgroundColor: string;
  textColor: string;
  extendedProps: Object;
}

export interface PlainEvent {
  id: string;
  resourceIds: string[];
  title: string;
  start: Date | string;
  end: Date | string;
  allDay?: boolean;
  editable?: boolean;
  startEditable?: boolean;
  durationEditable?: boolean;
  display?: 'auto' | 'background';
  backgroundColor?: string;
  textColor?: string;
  extendedProps?: Object;
}
