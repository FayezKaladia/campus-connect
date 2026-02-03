import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SubmissionForm } from '@/components/SubmissionForm';
import { TicketTracker } from '@/components/TicketTracker';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, MessageSquare, Shield, Search, Megaphone } from 'lucide-react';

export default function SubmitFeedback() {
  const [activeTab, setActiveTab] = useState('submit');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link to="/admin">
            <Button variant="ghost" size="sm" className="gap-2 text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-4 h-4" />
              Admin Dashboard
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 mb-6 shadow-lg">
            <Megaphone className="w-8 h-8 text-white" />
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-700 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Open Voice
          </h1>
          
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            Campus Feedback System
          </h2>
          
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Your voice matters. Share your concerns, suggestions, and ideas to help us build a better campus experience for everyone.
          </p>
        </div>

        {/* Main Tabs Container */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            {/* Tab Navigation */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-200 px-6 pt-6">
              <TabsList className="bg-white grid w-full grid-cols-2 p-1 rounded-lg shadow-sm border border-gray-200">
                <TabsTrigger 
                  value="submit"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-blue-700 data-[state=active]:text-white gap-2 font-semibold transition-all duration-200"
                >
                  <MessageSquare className="w-4 h-4" />
                  Submit Feedback
                </TabsTrigger>
                <TabsTrigger 
                  value="track"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-purple-700 data-[state=active]:text-white gap-2 font-semibold transition-all duration-200"
                >
                  <Search className="w-4 h-4" />
                  Track Status
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Submit Tab */}
            <TabsContent value="submit" className="p-8 space-y-6">
              <SubmissionForm />
            </TabsContent>

            {/* Track Tab */}
            <TabsContent value="track" className="p-8 space-y-6">
              <TicketTracker />
            </TabsContent>
          </Tabs>

          {/* Footer Info */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-t border-gray-200 px-8 py-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <Shield className="w-6 h-6 text-blue-600 mt-0.5" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 mb-1">
                  {activeTab === 'submit' ? 'Your Privacy is Protected' : 'Track With Confidence'}
                </p>
                <p className="text-sm text-gray-600">
                  {activeTab === 'submit' 
                    ? 'All submissions are completely anonymous. No personal information is collected or stored. Your feedback will be reviewed by the administration.'
                    : 'You can check your feedback status anytime using your unique ticket ID. No account or login required.'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
          <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-300">
            <div className="text-3xl mb-3">📋</div>
            <h3 className="font-semibold text-gray-900 mb-2">Clear & Structured</h3>
            <p className="text-sm text-gray-600">Organized feedback categories help us understand and prioritize your concerns better.</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-300">
            <div className="text-3xl mb-3">⚡</div>
            <h3 className="font-semibold text-gray-900 mb-2">Real-Time Tracking</h3>
            <p className="text-sm text-gray-600">Get instant updates on your feedback status with your unique ticket ID.</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-300">
            <div className="text-3xl mb-3">🔒</div>
            <h3 className="font-semibold text-gray-900 mb-2">100% Anonymous</h3>
            <p className="text-sm text-gray-600">Your identity is completely protected. We focus on your feedback, not your identity.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
