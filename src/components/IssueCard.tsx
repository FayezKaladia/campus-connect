import { Issue } from '@/types/issue';
import { formatDistanceToNow } from 'date-fns';
import { Clock, Building2, Tag, Ticket } from 'lucide-react';

interface IssueCardProps {
  issue: Issue;
  onClick: () => void;
}

export function IssueCard({ issue, onClick }: IssueCardProps) {
  const isResolved = issue.status === 'resolved';
  
  return (
    <button
      onClick={onClick}
      className={`issue-card w-full text-left cursor-pointer ${
        isResolved ? 'issue-card-resolved' : 'issue-card-unresolved'
      }`}
    >
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <Ticket className="w-4 h-4 text-primary flex-shrink-0" />
            <span className="font-mono font-semibold text-primary text-sm">
              {issue.ticket_id}
            </span>
          </div>
          <div className="flex items-center gap-2 mb-1">
            <Building2 className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            <span className="font-medium text-foreground truncate text-sm">
              {issue.department}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Tag className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            <span className="text-sm text-muted-foreground">{issue.category}</span>
          </div>
        </div>
        <span
          className={`status-badge flex-shrink-0 ${
            isResolved ? 'status-badge-resolved' : 'status-badge-unresolved'
          }`}
        >
          {issue.status}
        </span>
      </div>
      
      <p className="text-sm text-foreground/80 line-clamp-2 mb-3">
        {issue.description}
      </p>
      
      <div className="flex items-center gap-1 text-xs text-muted-foreground">
        <Clock className="w-3.5 h-3.5" />
        <span>
          {formatDistanceToNow(new Date(issue.created_at), { addSuffix: true })}
        </span>
      </div>
    </button>
  );
}
