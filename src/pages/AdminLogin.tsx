import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Lock, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function AdminLogin() {
  const [adminId, setAdminId] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!adminId.trim() || !password.trim()) {
      setError('Please enter both Admin ID and Password');
      return;
    }

    setLoading(true);

    // Simulate authentication delay
    setTimeout(() => {
      // Demo: Accept any non-empty credentials
      const authData = {
        adminId,
        isAuthenticated: true,
        timestamp: new Date().toISOString(),
      };
      
      localStorage.setItem('adminAuth', JSON.stringify(authData));
      
      // Dispatch custom event to notify ProtectedRoute
      window.dispatchEvent(new CustomEvent('authChanged', { detail: authData }));

      toast({
        title: 'Login Successful',
        description: `Welcome back, ${adminId}!`,
      });

      navigate('/admin');
      setLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Lock className="w-6 h-6 text-primary" />
          </div>
          <CardTitle className="text-2xl">Admin Dashboard</CardTitle>
          <CardDescription>
            Enter your credentials to access the admin panel
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="adminId" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Admin ID
              </Label>
              <Input
                id="adminId"
                type="text"
                placeholder="Enter your admin ID"
                value={adminId}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAdminId(e.target.value)}
                disabled={loading}
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                disabled={loading}
                className="h-11"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-11 gap-2 font-medium"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Authenticating...
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  Sign In
                </>
              )}
            </Button>
          </form>

          <div className="pt-2 text-center text-sm text-muted-foreground">
            <p className="mb-2">Demo Credentials:</p>
            <div className="space-y-1 text-xs bg-muted p-3 rounded-lg">
              <p>Admin ID: <span className="font-mono font-medium text-foreground">admin</span></p>
              <p>Password: <span className="font-mono font-medium text-foreground">password</span></p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
