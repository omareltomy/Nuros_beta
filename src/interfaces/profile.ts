export interface IProfile {
  uid: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  languages?: string[];
  location?: string;
  role: string;
  specialty?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IProfileDto {
	code: number;
	profile: IProfile;
}

export interface IProfileFormData {
  data: IProfile;
	profileType: "caretaker" | "caregiver"
}
