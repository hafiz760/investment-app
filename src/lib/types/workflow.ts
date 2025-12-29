export interface Workflow {
  id: string;
  userId: string;
  name: string;
  description?: string;
  category?: string;
  icon?: string;
  isTemplate: boolean;
  isPublic: boolean;
  steps: any[];
  triggerType?: string;
  triggerConfig?: any;
  version: number;
  tags: string[];
  executionCount: number;
  lastExecutedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateWorkflowDto {
  name: string;
  description?: string;
  category?: string;
  icon?: string;
  isTemplate?: boolean;
  isPublic?: boolean;
  steps: any[];
  triggerType?: string;
  triggerConfig?: any;
  tags?: string[];
}

export interface UpdateWorkflowDto {
  name?: string;
  description?: string;
  category?: string;
  icon?: string;
  isTemplate?: boolean;
  isPublic?: boolean;
  steps?: any[];
  triggerType?: string;
  triggerConfig?: any;
  tags?: string[];
}
