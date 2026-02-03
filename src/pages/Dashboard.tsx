import { useState, useMemo } from 'react';
import { useIssues } from '@/hooks/useIssues';
import { DashboardHeader } from '@/components/DashboardHeader';
import { IssueCard } from '@/components/IssueCard';
import { IssueFilters } from '@/components/IssueFilters';
import { IssueSearch } from '@/components/IssueSearch';
import { IssueDetailModal } from '@/components/IssueDetailModal';
import { Issue } from '@/types/issue';
import { AlertCircle, CheckCircle2, Loader2, Inbox, Building2, FileText } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function Dashboard() {
  const { issues, loading, resolveIssue } = useIssues();
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAndSortedIssues = useMemo(() => {
    let filtered = [...issues];

    // Search by ticket_id
    if (searchQuery) {
      filtered = filtered.filter((issue) =>
        issue.ticket_id.toUpperCase().includes(searchQuery.toUpperCase())
      );
    }

    // Filter by category
    if (categoryFilter !== 'all') {
      filtered = filtered.filter((issue) => issue.category === categoryFilter);
    }

    // Sort by date
    filtered.sort((a, b) => {
      const dateA = new Date(a.created_at).getTime();
      const dateB = new Date(b.created_at).getTime();
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });

    return filtered;
  }, [issues, sortOrder, categoryFilter, searchQuery]);

  const unresolvedIssues = filteredAndSortedIssues.filter(
    (issue) => issue.status === 'unresolved'
  );
  const resolvedIssues = filteredAndSortedIssues.filter(
    (issue) => issue.status === 'resolved'
  );

  const totalUnresolved = issues.filter((i) => i.status === 'unresolved').length;
  const totalResolved = issues.filter((i) => i.status === 'resolved').length;
  
  // Get unique departments affected
  const departmentsAffected = new Set(issues.map(issue => issue.department)).size;

  if (loading) {
    return (
      <div className="page-container flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading issues...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <DashboardHeader
        unresolvedCount={totalUnresolved}
        resolvedCount={totalResolved}
      />

      <main className="content-container py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Total Issues */}
          <Card className="bg-card">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Total Issues</p>
                  <p className="text-3xl font-bold text-foreground">{issues.length}</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Unresolved Issues */}
          <Card className="bg-card">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Unresolved Issues</p>
                  <p className="text-3xl font-bold text-foreground">{totalUnresolved}</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-status-unresolved-badge/10 flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-status-unresolved-badge" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Resolved Issues */}
          <Card className="bg-card">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Resolved Issues</p>
                  <p className="text-3xl font-bold text-foreground">{totalResolved}</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-status-resolved-badge/10 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-status-resolved-badge" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Departments Affected */}
          <Card className="bg-card">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Departments Affected</p>
                  <p className="text-3xl font-bold text-foreground">{departmentsAffected}</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <IssueSearch searchQuery={searchQuery} onSearchChange={setSearchQuery} />
          <IssueFilters
            sortOrder={sortOrder}
            onSortChange={setSortOrder}
            categoryFilter={categoryFilter}
            onCategoryChange={setCategoryFilter}
          />
        </div>

        {searchQuery && filteredAndSortedIssues.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <Inbox className="w-8 h-8 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold text-foreground mb-2">
              No Issue Found
            </h2>
            <p className="text-muted-foreground max-w-md">
              No issue found with ID "{searchQuery}". Check the ID and try again.
            </p>
          </div>
        ) : issues.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <Inbox className="w-8 h-8 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold text-foreground mb-2">
              No Issues Yet
            </h2>
            <p className="text-muted-foreground max-w-md">
              When students submit feedback, it will appear here in real-time.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Unresolved Section */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-status-unresolved-badge flex items-center justify-center">
                  <AlertCircle className="w-4 h-4 text-white" />
                </div>
                <h2 className="text-lg font-bold text-foreground">
                  Unresolved Issues
                  <span className="text-sm font-normal text-muted-foreground ml-2">
                    ({unresolvedIssues.length})
                  </span>
                </h2>
              </div>

              {unresolvedIssues.length === 0 ? (
                <div className="rounded-lg border border-dashed p-12 text-center">
                  <p className="text-muted-foreground">
                    No unresolved issues{categoryFilter !== 'all' ? ' in this category' : ''}
                  </p>
                </div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {unresolvedIssues.map((issue) => (
                    <IssueCard
                      key={issue.id}
                      issue={issue}
                      onClick={() => setSelectedIssue(issue)}
                    />
                  ))}
                </div>
              )}
            </section>

            {/* Resolved Section */}
            {resolvedIssues.length > 0 && (
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-status-resolved-badge flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  </div>
                  <h2 className="text-lg font-bold text-foreground">
                    Resolved Issues
                    <span className="text-sm font-normal text-muted-foreground ml-2">
                      ({resolvedIssues.length})
                    </span>
                  </h2>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {resolvedIssues.map((issue) => (
                    <IssueCard
                      key={issue.id}
                      issue={issue}
                      onClick={() => setSelectedIssue(issue)}
                    />
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </main>

      <IssueDetailModal
        issue={selectedIssue}
        open={!!selectedIssue}
        onClose={() => setSelectedIssue(null)}
        onResolve={resolveIssue}
      />
    </div>
  );
}
