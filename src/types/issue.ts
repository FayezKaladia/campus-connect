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
  'Administration',
  'Transport & Access',
  'Library & Resources',
  'Safety & Welfare',
  'Student Life',
  'Others',
] as const;

export const DEPARTMENTS = [
  'Computer Engineering',
  'Electronics Engineering',
  'Mechanical Engineering',
  'Civil Engineering',
  'Information Technology',
  'Applied Sciences',
  'Administration Office',
  'Library',
  'Hostel',
  'Canteen',
  'Sports Department',
  'Placement Cell',
  'Other',
] as const;

export type Category = typeof CATEGORIES[number];
export type Department = typeof DEPARTMENTS[number];
