interface RegistrationData {
  id: number;
  email: string;
  key: string;
  name: string;
  secret: string;
}

export interface UserMe {
  email: string;
  name: string;
  id: null | number;
}

export interface RegisterState {
  registrationData: RegistrationData;
  userMe: UserMe;
  isRegistered: boolean;
  loading: "idle" | "pending";
  error: number | null;
  currentRequestId?: string;
}

export interface RegisterData {
  email: string;
  name: string;
  secret: string;
}

export interface Meta {
  requestId: string;
}
