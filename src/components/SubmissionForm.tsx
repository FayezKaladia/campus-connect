import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { CATEGORIES, DEPARTMENTS } from '@/types/issue';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Send, Building2, Tag, FileText, CheckCircle2, Copy, Ticket } from 'lucide-react';

interface SubmissionSuccess {
  ticketId: string;
}

export function SubmissionForm() {
  const [department, setDepartment] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<SubmissionSuccess | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!department || !category || !description.trim()) {
      toast({
        title: 'Missing Fields',
        description: 'Please fill in all required fields.',
        variant: 'destructive',
      });
      return;
    }

    setSubmitting(true);

    try {
      const { data, error } = await supabase
        .from('issues')
        .insert({
          department,
          category,
          description: description.trim(),
        })
        .select('ticket_id')
        .single();

      if (error) throw error;

      setSuccess({ ticketId: data.ticket_id });

      // Reset form
      setDepartment('');
      setCategory('');
      setDescription('');
    } catch (error) {
      console.error('Error submitting feedback:', error);
      toast({
        title: 'Submission Failed',
        description: 'There was an error submitting your feedback. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleCopyTicketId = () => {
    if (success?.ticketId) {
      navigator.clipboard.writeText(success.ticketId);
      toast({
        title: 'Copied!',
        description: 'Ticket ID copied to clipboard.',
      });
    }
  };

  const handleNewSubmission = () => {
    setSuccess(null);
  };

  if (success) {
    return (
      <div className="text-center py-6 space-y-6">
        <div className="w-16 h-16 rounded-full bg-status-resolved/50 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8 text-status-resolved-badge" />
        </div>
        
        <div>
          <h3 className="text-xl font-semibold text-foreground mb-2">
            Feedback Submitted Successfully!
          </h3>
          <p className="text-muted-foreground">
            Your feedback has been recorded anonymously.
          </p>
        </div>

        <div className="bg-muted/50 rounded-lg p-4 space-y-2">
          <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
            <Ticket className="w-4 h-4" />
            Your Ticket ID
          </p>
          <div className="flex items-center justify-center gap-2">
            <span className="text-2xl font-mono font-bold text-primary">
              {success.ticketId}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopyTicketId}
              className="h-8 w-8 p-0"
            >
              <Copy className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Save this ID to check the status of your feedback later.
          </p>
        </div>

        <Button onClick={handleNewSubmission} variant="outline" className="gap-2">
          Submit Another Feedback
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium text-foreground">
          <Building2 className="w-4 h-4 text-muted-foreground" />
          Department <span className="text-destructive">*</span>
        </label>
        <Select value={department} onValueChange={setDepartment}>
          <SelectTrigger className="h-11">
            <SelectValue placeholder="Select department" />
          </SelectTrigger>
          <SelectContent>
            {DEPARTMENTS.map((dept) => (
              <SelectItem key={dept} value={dept}>
                {dept}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium text-foreground">
          <Tag className="w-4 h-4 text-muted-foreground" />
          Category <span className="text-destructive">*</span>
        </label>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="h-11">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {CATEGORIES.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium text-foreground">
          <FileText className="w-4 h-4 text-muted-foreground" />
          Description <span className="text-destructive">*</span>
        </label>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe the issue or suggestion clearly and concisely..."
          className="min-h-[150px] resize-none"
        />
        <p className="text-xs text-muted-foreground">
          Your feedback is completely anonymous and will be reviewed by the administration.
        </p>
      </div>

      <Button
        type="submit"
        className="w-full h-11 gap-2"
        disabled={submitting}
      >
        {submitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Submitting...
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            Submit Feedback
          </>
        )}
      </Button>
    </form>
  );
}
