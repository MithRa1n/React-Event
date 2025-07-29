export const EventImportance = {
  NORMAL: 'normal',
  IMPORTANT: 'important',
  CRITICAL: 'critical'
} as const;

export type EventImportanceType = typeof EventImportance[keyof typeof EventImportance];

export const ImportanceConfig = {
  [EventImportance.NORMAL]: {
    label: 'Normal',
    color: '#059669',
    bgClass: 'border-l-green-500 bg-green-50',
    priority: 1
  },
  [EventImportance.IMPORTANT]: {
    label: 'Important',
    color: '#ea580c',
    bgClass: 'border-l-orange-500 bg-orange-50',
    priority: 2
  },
  [EventImportance.CRITICAL]: {
    label: 'Critical',
    color: '#dc2626',
    bgClass: 'border-l-red-500 bg-red-50',
    priority: 3
  }
} as const;

export const ImportanceUtils = {
  getLabel: (importance: EventImportanceType): string => 
    ImportanceConfig[importance].label,
    
  getColor: (importance: EventImportanceType): string => 
    ImportanceConfig[importance].color,
    
  getBgClass: (importance: EventImportanceType): string => 
    ImportanceConfig[importance].bgClass,
    
  getPriority: (importance: EventImportanceType): number => 
    ImportanceConfig[importance].priority,
    
  getAllOptions: () => Object.values(EventImportance),
  
  sortByPriority: (a: EventImportanceType, b: EventImportanceType): number => 
    ImportanceUtils.getPriority(b) - ImportanceUtils.getPriority(a)
};
