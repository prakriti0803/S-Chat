// Types reflecting the SOW and Firebase Database Structure

export type Role = "donor" | "creator" | "moderator";

export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  createdAt: number | Date;
  role: Role;
  isBannedGlobally: boolean;
}

export interface CreatorSettings {
  minDonationAmount: number;
  alertStyle: string; // e.g., "Crystal Prism", "Neon Shield"
  brandColor: string;
  alertSoundUrl: string;
  obsOverlayToken: string;
  modDelaySeconds: number; // 5-second buffer feature
}

export interface Creator extends User {
  youtubeChannelId: string;
  youtubeChannelName: string;
  youtubeAvatar: string;
  razorpayAccountId: string; // BYOG Account Setup
  onboardingCompleted: boolean;
  settings: CreatorSettings;
}

export type TransactionStatus = "pending" | "captured" | "failed" | "refunded";
export type AlertStatus = "pending" | "approved" | "rejected" | "played";

export interface Transaction {
  id: string;
  creatorId: string;
  donorId: string;
  amount: number;
  currency: string;
  message: string;
  razorpayOrderId: string;
  razorpayPaymentId?: string;
  status: TransactionStatus;
  appmodFee: number; // 5% Webasthetic Fee
  creatorAmount: number; // 95% routed to Creator
  createdAt: number | Date;
  alertStatus: AlertStatus; // tied to 5-second buffer and mod actions
}

export interface ModerationRules {
  creatorId: string;
  blacklistedWords: string[];
  bannedUsers: string[]; // specific to this creator
  activeModerators: string[]; // uid list of moderators
  autoFilterTtsSpam: boolean; // MVP future readiness
}
