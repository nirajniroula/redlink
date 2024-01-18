import { Contact, PhoneNumber } from 'react-native-contacts';

export interface AppUser {
  userId?: string;
  phoneNumber: string;
  bloodGroup?: string;
  firstName?: string;
  lastName?: string;
  country?: string;
  location?: string;
  imageUrl?: string;
  thumbnailUrl?: string;
  email?: string;
  emailVerified?: boolean;
  bloodGroupVerified?: boolean;
  bloodGroupDocUrl?: string;
}
export interface FirebaseAuthUser {
  multiFactor: MultiFactor;
  metadata: Metadata;
  photoURL: any;
  phoneNumber: string;
  tenantId: any;
  displayName: any;
  emailVerified: boolean;
  isAnonymous: boolean;
  uid: string;
  email: any;
  providerData: ProviderDaum[];
  providerId: string;
}

export interface MultiFactor {
  enrolledFactors: any[];
}

export interface Metadata {
  lastSignInTime: number;
  creationTime: number;
}

export interface ProviderDaum {
  email: any;
  providerId: string;
  photoURL: any;
  phoneNumber: string;
  displayName: string;
  uid: string;
}

export type LocationType = {
  lat: number;
  long: number;
  city: string;
  province: string;
};

export interface RLPhoneNumbersType extends PhoneNumber {
  normalizedNumber?: string;
}
export interface RLContactType extends Contact {
  phoneNumbers: RLPhoneNumbersType[];
  bloodGroup?: string;
}
