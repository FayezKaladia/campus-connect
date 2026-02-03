import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Issue } from '@/types/issue';
import { useToast } from '@/hooks/use-toast';

export function useIssues() {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchIssues = async () => {
    try {
      const { data, error } = await supabase
        .from('issues')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setIssues(data as Issue[]);
    } catch (error) {
      console.error('Error fetching issues:', error);
      toast({
        title: 'Error',
        description: 'Failed to load issues',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const resolveIssue = async (id: string) => {
    try {
      const { error } = await supabase
        .from('issues')
        .update({ status: 'resolved', resolved_at: new Date().toISOString() })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: 'Issue Resolved',
        description: 'The issue has been marked as resolved.',
      });
    } catch (error) {
      console.error('Error resolving issue:', error);
      toast({
        title: 'Error',
        description: 'Failed to resolve issue',
        variant: 'destructive',
      });
    }
  };

  useEffect(() => {
    fetchIssues();

    // Subscribe to realtime changes
    const channel = supabase
      .channel('issues-realtime')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'issues',
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setIssues((prev) => [payload.new as Issue, ...prev]);
          } else if (payload.eventType === 'UPDATE') {
            setIssues((prev) =>
              prev.map((issue) =>
                issue.id === payload.new.id ? (payload.new as Issue) : issue
              )
            );
          } else if (payload.eventType === 'DELETE') {
            setIssues((prev) =>
              prev.filter((issue) => issue.id !== payload.old.id)
            );
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { issues, loading, resolveIssue, refetch: fetchIssues };
}
