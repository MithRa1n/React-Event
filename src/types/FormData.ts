import type { EventImportanceType } from './importance';

export type FormData = {
  title: string;
  description: string;
  date: string;
  importance: EventImportanceType;
};