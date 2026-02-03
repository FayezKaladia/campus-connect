import { Link } from 'react-router-dom';
import { SubmissionForm } from '@/components/SubmissionForm';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MessageSquare, Shield } from 'lucide-react';

export default function SubmitFeedback() {
  return (
    <div className="page-container">
      <header className="bg-card border-b">
        <div className="content-container py-4">
          <Link to="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </header>

      <main className="content-container">
        <div className="max-w-xl mx-auto py-8">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="w-7 h-7 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Submit Anonymous Feedback
            </h1>
            <p className="text-muted-foreground">
              Share your concerns, suggestions, or complaints about campus facilities and services.
            </p>
          </div>

          <div className="bg-card rounded-xl border p-6 sm:p-8">
            <SubmissionForm />
          </div>

          <div className="mt-6 flex items-start gap-3 p-4 rounded-lg bg-muted/50">
            <Shield className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
            <div className="text-sm text-muted-foreground">
              <p className="font-medium text-foreground mb-1">Your Privacy is Protected</p>
              <p>
                All submissions are completely anonymous. No personal information is collected or stored.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
