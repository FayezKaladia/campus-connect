import { Issue } from '@/types/issue';
import { format } from 'date-fns';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Building2, Tag, Clock, CheckCircle2, Ticket } from 'lucide-react';

interface IssueDetailModalProps {
  issue: Issue | null;
  open: boolean;
  onClose: () => void;
  onResolve: (id: string) => void;
}

export function IssueDetailModal({
  issue,
  open,
  onClose,
  onResolve,
}: IssueDetailModalProps) {
  if (!issue) return null;

  const isResolved = issue.status === 'resolved';

  const handleResolve = () => {
    onResolve(issue.id);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <span className="font-mono text-primary">{issue.ticket_id}</span>
            <span
              className={`status-badge ${
                isResolved ? 'status-badge-resolved' : 'status-badge-unresolved'
              }`}
            >
              {issue.status}
            </span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 pt-2">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Building2 className="w-4 h-4" />
                <span>Department</span>
              </div>
              <p className="font-medium text-foreground">{issue.department}</p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Tag className="w-4 h-4" />
                <span>Category</span>
              </div>
              <p className="font-medium text-foreground">{issue.category}</p>
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>Submitted</span>
            </div>
            <p className="font-medium text-foreground">
              {format(new Date(issue.created_at), 'PPpp')}
            </p>
          </div>

          {issue.resolved_at && (
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="w-4 h-4" />
                <span>Resolved</span>
              </div>
              <p className="font-medium text-foreground">
                {format(new Date(issue.resolved_at), 'PPpp')}
              </p>
            </div>
          )}

          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              Description
            </p>
            <div className="rounded-lg bg-muted/50 p-4">
              <p className="text-foreground whitespace-pre-wrap">
                {issue.description}
              </p>
            </div>
          </div>

          {!isResolved && (
            <div className="pt-4 border-t">
              <Button onClick={handleResolve} className="w-full gap-2">
                <CheckCircle2 className="w-4 h-4" />
                Mark as Resolved
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
