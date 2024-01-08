export interface User {
    multiFactor: MultiFactor
    metadata: Metadata
    photoURL: any
    phoneNumber: string
    tenantId: any
    displayName: any
    emailVerified: boolean
    isAnonymous: boolean
    uid: string
    email: any
    providerData: ProviderDaum[]
    providerId: string
  }
  
  export interface MultiFactor {
    enrolledFactors: any[]
  }
  
  export interface Metadata {
    lastSignInTime: number
    creationTime: number
  }
  
  export interface ProviderDaum {
    email: any
    providerId: string
    photoURL: any
    phoneNumber: string
    displayName: string
    uid: string
  }