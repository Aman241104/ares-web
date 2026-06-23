export interface Company {
  name: string;
  industry: string;
  founded: string;
  headquarters: string;
  website: string;
  size: string;
  about: string;
  values: string[];
}

export interface Owner {
  id: string;
  name: string;
  title: string;
  from: string;
  experience: string;
  focusAreas: string;
  leadershipStyle: string;
  quote: string;
  company: Company;
  phone: string;
  email: string;
}

export interface Achievement {
  title: string;
  desc: string;
}

export interface WeeklyMember {
  name: string;
  industry: string;
  points: number;
}

export interface PerformanceStats {
  visitors: number;
  referrals: number;
  tyfcb: number;
  oneToOnes: number;
  attendance: number;
}

export interface Team {
  id: string;
  name: string;
  fullName: string;
  tagline: string;
  motto: string;
  color: string;
  colorName: string;
  icon: string;
  mascot: string;
  rank: number;
  points: number;
  weekPoints: number;
  business: string;
  referrals: number;
  meetings: number;
  winRate: string;
  members: number;
  owner: Owner;
  description: string;
  achievements: Achievement[];
  weeklyMembers: WeeklyMember[];
  performance: PerformanceStats;
}

export interface WeeklyEvent {
  week: number;
  dates: string;
  theme: string;
  description: string;
  events: ScheduleEvent[];
}

export interface ScheduleEvent {
  name: string;
  category: string;
  points: number;
  status: 'completed' | 'in-progress' | 'upcoming';
}

export interface SpecialEvent {
  name: string;
  desc: string;
  date: string;
  time: string;
  status: 'upcoming' | 'completed';
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image?: string;
}

export interface Partner {
  name: string;
  tier: string;
  tagline: string;
}

export interface Commissioner {
  name: string;
  role: string;
  desc: string;
}

export interface RuleSection {
  section: string;
  rules: string[];
}
