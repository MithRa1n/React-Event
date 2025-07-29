import type { EventImportanceType } from './importance';

export type EventData = {
  id?: string;
  title: string;
  description: string;
  date: string;
  importance: EventImportanceType;
  userId: string;
};