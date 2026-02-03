import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SubmissionForm } from '@/components/SubmissionForm';
import { TicketTracker } from '@/components/TicketTracker';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, MessageSquare, Shield, Search } from 'lucide-react';

export default function SubmitFeedback() {
  const [activeTab, setActiveTab] = useState('submit');

  return (
    <div className="page-container">
      <header className="bg-card border-b">
        <div className="content-container py-4">
          <Link to="/admin">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Admin Dashboard
            </Button>
          </Link>
        </div>
      </header>

      <main className="content-container">
        <div className="max-w-2xl mx-auto py-8">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="w-7 h-7 text-primary" />
            </div>
            <h1>Open Voice</h1>
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Anonymous Feedback System
            </h1>
            <p className="text-muted-foreground">
              Share your concerns, suggestions, or complaints about campus facilities and services.
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="submit" className="gap-2">
                <MessageSquare className="w-4 h-4" />
                Submit Feedback
              </TabsTrigger>
              <TabsTrigger value="track" className="gap-2">
                <Search className="w-4 h-4" />
                Track Status
              </TabsTrigger>
            </TabsList>

            <TabsContent value="submit" className="space-y-6">
              <div className="bg-card rounded-xl border p-6 sm:p-8">
                <SubmissionForm />
              </div>

              <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                <Shield className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                <div className="text-sm text-muted-foreground">
                  <p className="font-medium text-foreground mb-1">Your Privacy is Protected</p>
                  <p>
                    All submissions are completely anonymous. No personal information is collected or stored.
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="track" className="space-y-6">
              <div className="bg-card rounded-xl border p-6 sm:p-8">
                <TicketTracker />
              </div>

              <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                <Shield className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                <div className="text-sm text-muted-foreground">
                  <p className="font-medium text-foreground mb-1">Track With Confidence</p>
                  <p>
                    You can check your feedback status anytime using your unique ticket ID. No account needed.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
