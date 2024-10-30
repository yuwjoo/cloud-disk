import type { ApiRegisterRequest } from '@/types/api/common/auth';

export interface RegisterFormData extends ApiRegisterRequest {
  confirmPassword: string;
}
