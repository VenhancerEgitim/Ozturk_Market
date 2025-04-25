export interface User { 
  email: string;
  token: string;
  name?: string;
}

export interface UserState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
} 