export interface Issue {
  id: string;
  ticket_id: string;
  department: string;
  category: string;
  description: string;
  status: 'unresolved' | 'resolved';
  created_at: string;
  resolved_at: string | null;
}

export const CATEGORIES = [
  'Academics',
  'Infrastructure',
  'Technology',
  'Curriculum',
  'Facilities',
  'Safety & Welfare',
] as const;

export const DEPARTMENTS = [
  'Computer Engineering',
  'Electronics Engineering',
  'Mechanical Engineering',
  'Civil Engineering',
  'Information Technology',
  'CSE - AI & Machine Learning',
  'CSE - Internet of Things',
  'CSE - Cybersecurity',
  'CSE - Cloud Computing',
  'Applied Sciences',
] as const;

export type Category = typeof CATEGORIES[number];
export type Department = typeof DEPARTMENTS[number];
