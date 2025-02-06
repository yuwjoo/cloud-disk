import type { ApiRegisterRequest } from '@/types/api/auth';

export interface RegisterFormData extends ApiRegisterRequest {
  confirmPassword: string;
}
