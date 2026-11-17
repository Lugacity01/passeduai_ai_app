export interface User {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  displayId: string;
  role: string;
  schoolId: string | null;
  prepType: string | null;
  academicProfile: Record<string, unknown> | null;
  permissions: string[];
  hasSelectedDepartment: boolean;
  hasSelectedCourses: boolean;
  mock_enabled: boolean;
  mock_registered: boolean;
  aiCredits: number;
  hasSubscribedBefore: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface LoginResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface RefreshResponse {
  accessToken: string;
  refreshToken?: string;
}
