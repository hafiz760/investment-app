export type SessionStatus = 'pending' | 'running' | 'paused' | 'completed' | 'failed';
export type MessageRole = 'user' | 'assistant' | 'system';

export interface ExecutionMetadata {
  startedAt?: string;
  completedAt?: string;
  duration?: number;
  errorMessage?: string;
}

export interface Screenshot {
  stepIndex: number;
  url: string;
  timestamp: string;
}

export interface Session {
  _id: string;
  userId: string;
  workflowId?: string;
  title: string;
  status: SessionStatus;
  currentStep?: any;
  steps: any[];
  executionMetadata: ExecutionMetadata;
  browserSessionId?: string;
  streamUrl?: string;
  screenshots: Screenshot[];
  metadata?: any;
  createdAt: string;
  updatedAt: string;
}

export interface MessageMetadata {
  screenshots?: string[];
  steps?: any[];
  executionResult?: any;
  needsInput?: boolean;
  inputType?: string;
}

export interface ChatMessage {
  _id: string;
  sessionId: string;
  role: MessageRole;
  content: string;
  metadata?: MessageMetadata;
  createdAt: string;
}

export interface SendMessageDto {
  message: string;
}
