export type GameType = '30s' | '1m' | '2m' | '3m' | '5m';

export type GameIntegrationMode = 'html5' | 'api';

export interface GameItem {
  id: string;
  name: string;
  image: string;
  category: 'Popular' | 'Lottery' | 'Slots' | 'Sports' | 'Casino' | 'Rummy' | 'Fishing' | 'Original' | string;
  gamePath: string; // HTML5 relative path e.g. games/aviator/index.html or external API launch URL
  status: boolean;
  sortOrder: number;
  badge?: 'HOT' | 'NEW' | 'TOP' | 'LIVE' | 'FAST' | '' | string;
  provider?: string;
  rtp?: number;
  createdAt: number;
  
  // Game Integration System (HTML5 & API Support)
  integrationType?: GameIntegrationMode; // 'html5' (Local HTML Game) | 'api' (API Gaming Provider)
  apiProvider?: 'JILI' | 'PG Soft' | 'Pragmatic Play' | 'Evolution' | 'Spribe' | 'FastSpin' | 'CQ9' | 'JDB' | 'Custom API' | string;
  apiGameCode?: string; // e.g. jili_super_ace, pg_fortune_rabbit
  apiEndpoint?: string; // Base Provider Launch Endpoint
  apiAuthType?: 'direct_url' | 'token_session' | 'seamless_wallet' | string;
  apiAutoSession?: boolean; // Append &uid=...&token=...&currency=BDT automatically
}

export interface SavedWithdrawAccount {
  id: string;
  type: 'BKASH' | 'NAGAD' | 'ROCKET' | 'USDT';
  accountName: string;
  accountNumber: string;
  logo?: string;
}

export interface DepositChannel {
  channelId: string;
  channelName: string;
  paymentType: 'Nagad' | 'bKash' | 'Rocket' | 'USDT';
  logo?: string;
  currency: 'BDT' | 'USDT';
  minimumDeposit: number;
  maximumDeposit: number;
  paymentNumber: string;
  accountType: 'Agent' | 'Personal' | 'Merchant' | string;
  transferType?: 'Send Money' | 'Cash Out' | string;
  step1Image?: string;
  step2Image?: string;
  step1Title?: string;
  step2Title?: string;
  network?: 'TRC20' | 'BEP20' | 'ERC20' | string;
  requestPage: 'A' | 'B' | 'C' | 'D';
  transactionRequired: boolean;
  instructions: string;
  warningText?: string;
  successText?: string;
  title?: string;
  background?: string;
  walletAddress?: string;
  countdownMinutes?: number;
  buttonText?: string;
  enabled: boolean;
  sortOrder: number;
}

export interface UserTurnoverRecord {
  id: string;
  uid: string;
  sourceType: 'bonus' | 'deposit';
  sourceId: string;
  requiredAmount: number;
  completedAmount: number;
  remainingAmount: number;
  status: 'active' | 'completed';
  createdAt: number;
  completedAt?: number;
}

export interface SupportAgentProfile {
  agentId: string;
  agentName: string;
  profilePhoto: string;
  status: 'online' | 'busy' | 'offline';
  welcomeMessage?: string;
}

export interface SupportChat {
  chatId: string;
  userId: string;
  userUid: string;
  username: string;
  userPhone?: string;
  userEmail?: string;
  status: 'active' | 'closed';
  createdAt: number;
  closedAt?: number;
  agentId?: string;
  agentName?: string;
  agentPhoto?: string;
  lastMessage?: string;
  updatedAt: number;
}

export interface SupportMessage {
  id: string;
  chatId: string;
  senderId: string;
  senderType: 'user' | 'admin' | 'system';
  message: string;
  imageUrl?: string;
  timestamp: number;
  read: boolean;
}

export interface PaymentChannelConfig {
  id: string;
  name: string;
  type: 'nagad' | 'bkash' | 'rocket' | 'usdt';
  agentNumber: string;
  active: boolean;
  minAmount: number;
  maxAmount: number;
}

export interface BannerItem {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  buttonText: string;
  action: string;
  active: boolean;
  order: number;
}

export interface GameResultModalData {
  win: boolean;
  amount: number;
  period: string;
  gameName?: string;
  duration?: string; // e.g. "30s", "1Min", "3Min", "5Min"
  resultNumber?: number;
  resultBigSmall?: 'Big' | 'Small';
  resultColors?: ('green' | 'red' | 'violet')[];
  multiplierRate?: number;
  previousBalance?: number;
  newBalance?: number;
}

export interface AccountTransaction {
  id: string;
  uid: string;
  type: 'deposit' | 'withdrawal' | 'bet' | 'win' | 'referral_commission' | 'gift_code' | 'attendance' | 'vip_bonus' | 'admin_adjust' | 'move_in' | 'move_out' | 'deposit_in' | 'withdraw_out';
  amount: number;
  previousBalance: number;
  newBalance: number;
  description: string;
  refId?: string;
  createdAt: number;
}

export interface UserProfile {
  uid: string;
  numericUid?: string; // 6-digit numeric UID (e.g. 236313)
  username: string;
  email: string;
  boundEmail?: string; // Real bound Gmail / personal email
  emailVerified?: boolean;
  phone: string;
  country?: string; // 'Bangladesh' | 'Pakistan' | 'India'
  countryCode?: string; // '+880' | '+92' | '+91'
  phoneVerified?: boolean;
  password?: string;
  nickname: string;
  avatar?: string;
  profilePhoto?: string;
  balance: number;
  depositBalance?: number;
  withdrawBalance?: number;
  bonusBalance?: number;
  safeBalance: number;
  vipLevel: number;
  totalBets: number;
  totalWon?: number;
  totalLoss?: number;
  turnoverReq?: number; // Total required turnover
  turnoverDone?: number; // Completed turnover
  turnoverRequired?: number;
  turnoverCompleted?: number;
  referralBalance?: number;
  giftBonusBalance?: number;
  depositTurnoverReq?: number;
  giftTurnoverReq?: number;
  attendanceStreak?: number; // 1 to 7
  lastAttendanceDate?: string; // YYYY-MM-DD
  claimedAttendanceDays?: Record<number, boolean>;
  turnovers?: Record<string, TurnoverRecord>;
  levelUpBonusClaimed?: Record<number, boolean>;
  monthlyBonusClaimed?: Record<number, string>;
  savedWithdrawAccounts?: SavedWithdrawAccount[]; // Max 3 saved accounts
  exp?: number;
  inviteCode?: string;
  referCode?: string; // 10-digit numeric referral code (e.g. 1137623631)
  referralCode?: string; // 10-digit numeric referral code
  referredBy?: string | null;
  invitedBy?: string;
  role: 'user' | 'admin';
  status: 'active' | 'banned';
  createdAt: number;
  lastLogin?: number;
  paymentMethods?: Record<string, PaymentMethod>;
}

export interface PaymentMethod {
  id: string;
  type: 'BKASH' | 'NAGAD' | 'ROCKET' | 'USDT';
  accountName: string;
  accountNumber: string;
}

export interface GameHistoryItem {
  periodId: string;
  number: number;
  bigSmall: 'Big' | 'Small';
  colors: ('green' | 'red' | 'violet')[];
  timestamp: number;
}


export interface BetItem {
  id: string;
  uid: string;
  phone?: string;
  periodId?: string;
  gameType: GameType | string;
  gameName?: string;
  selectType?: 'color' | 'number' | 'size' | 'multiplier' | 'choice' | string;
  selectValue?: string; // 'green' | 'violet' | 'red' | '0'..'9' | 'Big' | 'Small' | multipliers | choices
  amount: number;
  multiplier?: number;
  totalAmount: number;
  status: 'pending' | 'won' | 'lost' | 'cancelled';
  winAmount?: number;
  resultNumber?: number;
  outcome?: string;
  createdAt: number;
}

export interface AviatorBetRecord {
  id: string;
  uid: string;
  username?: string;
  game: 'aviator' | 'aviatorX';
  roundId: string;
  betPanel: 1 | 2;
  amount: number;
  cashoutMultiplier?: number;
  crashMultiplier?: number;
  winAmount?: number;
  status: 'pending' | 'won' | 'lost' | 'cancelled';
  createdAt: number;
}

export interface DepositItem {
  id: string;
  orderId?: string;
  uid: string;
  phone: string;
  username?: string;
  amount: number;
  channel: string;
  method: 'nagad' | 'bkash' | 'rocket' | 'usdt' | string;
  agentNumber: string;
  txnId: string;
  status: 'pending' | 'completed' | 'rejected' | 'success' | 'failed';
  createdAt: number;
  processedAt?: number;
}

export interface WithdrawalItem {
  id: string;
  orderId?: string;
  uid: string;
  phone: string;
  amount: number;
  type: 'E-Wallet' | 'USDT';
  walletMethod: 'BKASH' | 'NAGAD' | 'ROCKET' | 'USDT';
  accountName?: string;
  accountNumber: string;
  status: 'pending' | 'completed' | 'rejected';
  rejectionReason?: string;
  remark?: string;
  createdAt: number;
  processedAt?: number;
  usdtAmount?: number;
  dollarRate?: number;
}

export interface SafeRecord {
  id: string;
  type: 'Transfer In' | 'Transfer Out';
  amount: number;
  rate: number;
  payout: number;
  timestamp: number;
}

export interface TurnoverRecord {
  id: string;
  sourceType: 'bonus' | 'deposit';
  sourceId: string;
  requiredAmount: number;
  completedAmount: number;
  remainingAmount: number;
  status: 'active' | 'completed';
  createdAt: number;
  completedAt?: number;
}

export interface AttendanceConfig {
  enabled: boolean;
  minDeposit: number; // e.g. 500
  totalDepositTarget: number; // e.g. 20000
  requiredDays: number; // e.g. 7
  rewards: number[]; // Day 1 to Day 7 rewards e.g. [20, 30, 50, 70, 100, 150, 300]
  turnoverMultiplier: number; // e.g. 1
  cooldownHours?: number; // e.g. 24
}

export interface VipLevelConfig {
  level: number; // 1 to 10
  name: string; // "VIP 1" ... "VIP 10"
  minRecharge: number; // Required cumulative deposit (৳)
  minBet: number; // Required cumulative turnover/EXP (৳) (Bet ৳1 = 1 EXP)
  levelUpBonus: number; // One-time level-up bonus (৳)
  weeklyBonus: number; // Weekly loyalty reward (৳)
  monthlyBonus: number; // Monthly VIP reward (৳)
  safeRate?: number; // Safe interest rate % (e.g. 0.1%, 0.2%)
  rebateRate: number; // Daily rebate rate % (e.g. 0.3%)
  heartLevelUp?: number; // Heart points for level up (e.g. 1, 8, 40)
  heartMonthly?: number; // Heart points for monthly (e.g. 2, 25, 110)
  enabled: boolean;
}

export interface ActivityBanner {
  id: string;
  title: string;
  subtitle?: string;
  imageUrl: string;
  badge?: string;
  actionType?: 'attendance' | 'gift' | 'deposit' | 'rebate' | 'url' | 'game' | 'none';
  targetGame?: string;
  linkUrl?: string;
  order: number;
  active: boolean;
  createdAt?: number;
}

export interface SystemSettings {
  nagadNumber: string;
  bkashNumber: string;
  rocketNumber: string;
  usdtAddress: string;
  minDeposit: number;
  maxDeposit: number;
  minWithdraw: number;
  maxWithdraw: number;
  usdtRate?: number; // 1 USDT in BDT, default 125
  minWithdrawUsdt?: number; // Minimum USDT withdrawal, default 10
  platformAnnouncement: string;
  activeAnnouncementTitle: string;
  showAnnouncement: boolean;
  appDownloadUrl?: string;
  appVersion?: string;
  forcedResults?: Record<string, number | null>;
  paymentChannels?: Record<string, PaymentChannelConfig>;
  depositCommissionRate?: number; // e.g. 5%
  turnoverCommissionRate?: number; // e.g. 0.03%
  attendance?: AttendanceConfig;
  vipLevels?: Record<number, VipLevelConfig>;
  activityBanners?: Record<string, ActivityBanner>;
  adminPin?: string;
  isMaintenanceMode?: boolean;
  maintenanceMessage?: string;
  signupBonusEnabled?: boolean;
  signupBonusAmount?: number;
  signupBonusTurnoverMultiplier?: number;
  imgbbApiKey?: string;
  gameCardImages?: {
    wingo?: string;
    k3?: string;
    fiveD?: string;
    trx?: string;
    aviator?: string;
    aviatorX?: string;
  };
  announcements?: Record<string, AnnouncementItem>;
  enabledGames?: {
    wingo?: boolean;
    k3?: boolean;
    fiveD?: boolean;
    trx?: boolean;
    aviator?: boolean;
    aviatorX?: boolean;
  };
  gameControls?: {
    k3Dice?: number[]; // Forced 3 dice, e.g. [3, 4, 4]
    fiveDNumbers?: number[]; // Forced 5 numbers, e.g. [2, 5, 7, 6, 6]
    trxWinningNumber?: number; // 0-9
    aviatorCrash?: number; // Forced crash multiplier e.g. 3.50
    aviatorXCrash?: number; // Forced crash multiplier e.g. 8.20
  };
}

export interface AnnouncementItem {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  link?: string;
  active: boolean;
  priority?: number;
  createdAt: number;
}

export interface GiftCodeItem {
  code: string;
  amount: number;
  rewardAmount?: number; // compatibility
  status: 'active' | 'inactive';
  createdAt: number;
  createdDate?: string;
  createdTime?: string;
  expiresAt?: number;
  maxClaims: number;
  claimCount: number;
  totalClaims?: number; // compatibility
  createdBy?: string;
  claimedUsers?: Record<string, boolean>;
}

export interface GiftClaimRecord {
  id: string;
  uid: string;
  code: string;
  amount: number;
  claimedAt: number;
  status: 'Claimed' | 'pending';
}

