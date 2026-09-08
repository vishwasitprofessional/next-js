export interface User {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  password?: string;
  type: string;
  status: number;
  created_at: string;
  updated_at: string;
}

export interface CreateUserRequest {
  name: string;
  email: string;
  phone?: string;
  password: string;
  type?: string;
  status?: number;
}

export interface UpdateUserRequest {
  name: string;
  email: string;
  phone?: string;
  password?: string;
  type?: string;
  status?: number;
}