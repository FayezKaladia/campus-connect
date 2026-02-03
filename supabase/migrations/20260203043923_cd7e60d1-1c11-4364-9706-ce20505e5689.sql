-- Create the issues table for campus feedback
CREATE TABLE public.issues (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  department TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('Academics', 'Infrastructure', 'Technology', 'Administration', 'Transport & Access', 'Library & Resources', 'Safety & Welfare', 'Student Life', 'Others')),
  description TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'unresolved' CHECK (status IN ('unresolved', 'resolved')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  resolved_at TIMESTAMP WITH TIME ZONE
);

-- Enable RLS but allow public access (anonymous feedback system)
ALTER TABLE public.issues ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (anonymous submissions)
CREATE POLICY "Anyone can submit feedback" 
ON public.issues 
FOR INSERT 
WITH CHECK (true);

-- Allow anyone to view all issues (public dashboard)
CREATE POLICY "Anyone can view issues" 
ON public.issues 
FOR SELECT 
USING (true);

-- Allow anyone to update issues (for resolving - in production, this would be admin-only)
CREATE POLICY "Anyone can update issues" 
ON public.issues 
FOR UPDATE 
USING (true);

-- Enable realtime for live updates
ALTER PUBLICATION supabase_realtime ADD TABLE public.issues;