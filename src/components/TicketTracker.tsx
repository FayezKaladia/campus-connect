import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, Search, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { Issue } from '@/types/issue';

export function TicketTracker() {
  const [ticketId, setTicketId] = useState('');
  const [loading, setLoading] = useState(false);
  const [issue, setIssue] = useState<Issue | null>(null);
  const [searched, setSearched] = useState(false);
  const { toast } = useToast();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!ticketId.trim()) {
      toast({
        title: 'Required',
        description: 'Please enter a ticket ID.',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    setSearched(true);

    try {
      const { data, error } = await supabase
        .from('issues')
        .select('*')
        .eq('ticket_id', ticketId.trim().toUpperCase())
        .single();

      if (error || !data) {
        toast({
          title: 'Ticket Not Found',
          description: 'No ticket found with this ID. Please check and try again.',
          variant: 'destructive',
        });
        setIssue(null);
      } else {
        setIssue(data as Issue);
      }
    } catch (error) {
      console.error('Error fetching ticket:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch ticket information. Please try again.',
        variant: 'destructive',
      });
      setIssue(null);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'resolved' 
      ? 'bg-status-resolved/10 text-status-resolved-badge border-status-resolved/20'
      : 'bg-yellow-50 text-yellow-700 border-yellow-200';
  };

  const getStatusIcon = (status: string) => {
    return status === 'resolved' ? (
      <CheckCircle2 className="w-5 h-5 text-status-resolved-badge" />
    ) : (
      <Clock className="w-5 h-5 text-yellow-600" />
    );
  };

  const getStatusLabel = (status: string) => {
    return status === 'resolved' ? 'Resolved' : 'Pending';
  };

  const formatDate = (date: string | null) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <Search className="w-7 h-7 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Track Your Feedback
        </h2>
        <p className="text-muted-foreground">
          Enter your ticket ID to check the status of your submitted feedback.
        </p>
      </div>

      <form onSubmit={handleSearch} className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="Enter your ticket ID (e.g., OV-001001)"
            value={ticketId}
            onChange={(e) => setTicketId(e.target.value.toUpperCase())}
            className="h-11 font-mono text-sm"
            disabled={loading}
          />
          <Button
            type="submit"
            disabled={loading}
            className="gap-2 px-6"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Searching...
              </>
            ) : (
              <>
                <Search className="w-4 h-4" />
                Search
              </>
            )}
          </Button>
        </div>
      </form>

      {searched && issue && (
        <div className="bg-card rounded-xl border p-6 space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Ticket #{issue.ticket_id}
              </h3>
              <div className="space-y-1 text-sm text-muted-foreground">
                <p>
                  <span className="font-medium">Department:</span> {issue.department}
                </p>
                <p>
                  <span className="font-medium">Category:</span> {issue.category}
                </p>
                <p>
                  <span className="font-medium">Submitted:</span> {formatDate(issue.created_at)}
                </p>
                {issue.resolved_at && (
                  <p>
                    <span className="font-medium">Resolved:</span> {formatDate(issue.resolved_at)}
                  </p>
                )}
              </div>
            </div>
            <div
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${getStatusColor(
                issue.status
              )}`}
            >
              {getStatusIcon(issue.status)}
              <span className="font-semibold">{getStatusLabel(issue.status)}</span>
            </div>
          </div>

          <div className="bg-muted/50 rounded-lg p-4">
            <p className="text-sm font-medium text-foreground mb-2">Description</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {issue.description}
            </p>
          </div>

          {issue.status === 'resolved' && (
            <div className="flex items-start gap-3 p-4 rounded-lg bg-status-resolved/10 border border-status-resolved/20">
              <CheckCircle2 className="w-5 h-5 text-status-resolved-badge flex-shrink-0 mt-0.5" />
              <div className="text-sm text-status-resolved-badge">
                <p className="font-medium">Your feedback has been resolved!</p>
                <p className="text-xs mt-1">
                  Thank you for bringing this to our attention. The issue has been addressed.
                </p>
              </div>
            </div>
          )}

          {issue.status === 'unresolved' && (
            <div className="flex items-start gap-3 p-4 rounded-lg bg-yellow-50 border border-yellow-200">
              <Clock className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-yellow-700">
                <p className="font-medium">Your feedback is being reviewed</p>
                <p className="text-xs mt-1">
                  Thank you for your patience. We are actively working on resolving this issue.
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {searched && !issue && !loading && (
        <div className="bg-card rounded-xl border p-6 text-center">
          <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
          <p className="text-foreground font-medium mb-1">Ticket Not Found</p>
          <p className="text-sm text-muted-foreground">
            Please check your ticket ID and try again. Ticket IDs follow the format: OV-XXXXXX
          </p>
        </div>
      )}
    </div>
  );
}
