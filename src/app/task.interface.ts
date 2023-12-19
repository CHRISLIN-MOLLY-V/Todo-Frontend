export interface Task {
    id?: string|undefined;
    description: string;
    createdDate?: Date;
    completedDate?: Date;
    isCompleted?: boolean;
  }