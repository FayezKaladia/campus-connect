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
import { Loader2, Send, Building2, Tag, FileText, CheckCircle2, Copy, Ticket, ArrowRight, Sparkles } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface SubmissionSuccess {
  ticketId: string;
}

// Department color mapping for professional appearance
const departmentColors: { [key: string]: { bg: string; icon: string; border: string } } = {
  'Computer Engineering': { bg: 'from-blue-50 to-blue-100/50', icon: '💻', border: 'border-blue-200' },
  'Electronics Engineering': { bg: 'from-purple-50 to-purple-100/50', icon: '⚡', border: 'border-purple-200' },
  'Mechanical Engineering': { bg: 'from-orange-50 to-orange-100/50', icon: '⚙️', border: 'border-orange-200' },
  'Civil Engineering': { bg: 'from-green-50 to-green-100/50', icon: '🏗️', border: 'border-green-200' },
  'Information Technology': { bg: 'from-indigo-50 to-indigo-100/50', icon: '🖥️', border: 'border-indigo-200' },
  'CSE - AI & Machine Learning': { bg: 'from-pink-50 to-pink-100/50', icon: '🤖', border: 'border-pink-200' },
  'CSE - Internet of Things': { bg: 'from-cyan-50 to-cyan-100/50', icon: '🌐', border: 'border-cyan-200' },
  'CSE - Cybersecurity': { bg: 'from-red-50 to-red-100/50', icon: '🔒', border: 'border-red-200' },
  'CSE - Cloud Computing': { bg: 'from-sky-50 to-sky-100/50', icon: '☁️', border: 'border-sky-200' },
  'Applied Sciences': { bg: 'from-teal-50 to-teal-100/50', icon: '🔬', border: 'border-teal-200' },
};

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
      <div className="text-center py-8 space-y-6">
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center animate-bounce shadow-lg">
            <CheckCircle2 className="w-10 h-10 text-white" />
          </div>
        </div>
        
        <div>
          <h3 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
            Feedback Submitted Successfully!
          </h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            Your feedback has been recorded anonymously and will be reviewed by our administration team.
          </p>
        </div>

        <Card className="bg-gradient-to-br from-green-50 to-emerald-50/50 border-green-200 p-6 space-y-4">
          <div className="space-y-2">
            <p className="text-sm font-semibold text-green-900 flex items-center justify-center gap-2">
              <Ticket className="w-4 h-4" />
              Your Unique Ticket ID
            </p>
            <div className="flex items-center justify-center gap-3">
              <div className="bg-white border-2 border-green-300 rounded-lg px-4 py-3">
                <span className="text-3xl font-mono font-bold text-green-700">
                  {success.ticketId}
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopyTicketId}
                className="h-10 w-10 p-0 hover:bg-green-200 hover:text-green-700"
              >
                <Copy className="w-5 h-5" />
              </Button>
            </div>
            <p className="text-xs text-green-700 font-medium">
              ✓ Save this ID to track your feedback status anytime
            </p>
          </div>
        </Card>

        <div className="space-y-3">
          <Button 
            onClick={handleNewSubmission} 
            className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 gap-2 font-semibold"
          >
            <ArrowRight className="w-4 h-4" />
            Submit Another Feedback
          </Button>
          <p className="text-xs text-muted-foreground">
            You can submit multiple feedbacks about different issues
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Header with icon */}
      <div className="flex items-center gap-3 p-4 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
        <Sparkles className="w-5 h-5 text-blue-600" />
        <p className="text-sm font-semibold text-blue-900">
          Share your feedback to help us improve the campus experience
        </p>
      </div>

      {/* Department Selection */}
      <div className="space-y-3">
        <label className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Building2 className="w-4 h-4 text-blue-600" />
          Select Your Department <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
          {DEPARTMENTS.map((dept) => {
            const colors = departmentColors[dept] || departmentColors['Computer Engineering'];
            const isSelected = department === dept;
            return (
              <button
                key={dept}
                type="button"
                onClick={() => setDepartment(dept)}
                className={`p-3 rounded-lg border-2 transition-all duration-200 text-left ${
                  isSelected
                    ? `${colors.border} bg-gradient-to-br ${colors.bg} border-current shadow-md scale-105`
                    : `border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300`
                }`}
              >
                <div className="flex items-start gap-2">
                  <span className="text-xl">{colors.icon}</span>
                  <span className={`font-semibold text-sm leading-tight ${isSelected ? 'text-gray-900' : 'text-gray-700'}`}>
                    {dept}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Category Selection */}
      <div className="space-y-3">
        <label className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Tag className="w-4 h-4 text-purple-600" />
          Feedback Category <span className="text-red-500">*</span>
        </label>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="h-11 border-2 border-gray-200 hover:border-purple-300 focus:border-purple-500 transition-colors">
            <SelectValue placeholder="Select the issue category" />
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

      {/* Description */}
      <div className="space-y-3">
        <label className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <FileText className="w-4 h-4 text-orange-600" />
          Detailed Description <span className="text-red-500">*</span>
        </label>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Please describe your feedback clearly. What is the issue? Where did it occur? How did it impact you?"
          className="min-h-[120px] resize-none border-2 border-gray-200 hover:border-orange-300 focus:border-orange-500 transition-colors rounded-lg p-4 text-sm"
        />
        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            ✓ Your feedback is completely anonymous
          </p>
          <p className="text-xs text-muted-foreground">
            {description.length}/500 characters
          </p>
        </div>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        className="w-full h-12 bg-gradient-to-r from-gradient-blue via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 gap-2 font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-200"
        disabled={submitting}
      >
        {submitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Submitting Your Feedback...
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            Submit Feedback
          </>
        )}
      </Button>

      {/* Info Banner */}
      <div className="rounded-lg bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 p-4">
        <p className="text-xs text-amber-900 leading-relaxed">
          <span className="font-semibold">💡 Tip:</span> Be specific and descriptive in your feedback. The more details you provide, the faster we can address your concerns.
        </p>
      </div>
    </form>
  );
}
