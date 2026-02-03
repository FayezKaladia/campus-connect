-- Add a sequence for ticket numbers
CREATE SEQUENCE public.ticket_id_seq START 1001;

-- Add ticket_id column to issues table
ALTER TABLE public.issues 
ADD COLUMN ticket_id TEXT NOT NULL DEFAULT 'OV-' || LPAD(nextval('public.ticket_id_seq')::text, 6, '0');

-- Create index for fast ticket_id lookups
CREATE INDEX idx_issues_ticket_id ON public.issues(ticket_id);