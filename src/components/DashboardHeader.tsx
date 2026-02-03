import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MessageSquarePlus, LayoutDashboard, LogOut } from 'lucide-react';

interface DashboardHeaderProps {
  unresolvedCount: number;
  resolvedCount: number;
}

export function DashboardHeader({ unresolvedCount, resolvedCount }: DashboardHeaderProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    navigate('/');
  };

  return (
    <header className="bg-card border-b sticky top-0 z-10">
      <div className="content-container py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <LayoutDashboard className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Open-Voice Dashboard</h1>
                <p className="text-sm text-muted-foreground">Live Campus Feedback Monitor</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 text-sm">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-status-unresolved-badge"></span>
                <span className="text-muted-foreground">
                  <span className="font-semibold text-foreground">{unresolvedCount}</span> Unresolved
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-status-resolved-badge"></span>
                <span className="text-muted-foreground">
                  <span className="font-semibold text-foreground">{resolvedCount}</span> Resolved
                </span>
              </div>
            </div>
            
            <Link to="/">
              <Button size="sm" className="gap-2">
                <MessageSquarePlus className="w-4 h-4" />
                Submit Feedback
              </Button>
            </Link>

            <Button
              size="sm"
              variant="ghost"
              className="gap-2 text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
