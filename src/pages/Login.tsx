import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Scale, IndianRupee, Gavel } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      await login(email, password);
      toast({
        title: "Welcome back!",
        description: "Successfully logged in to Legal Research System",
      });
    } catch (error) {
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "Please check your credentials",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Legal System Branding */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="relative">
              <Scale className="h-12 w-12 text-white mr-2" />
              <Gavel className="h-6 w-6 text-secondary absolute -bottom-1 -right-1" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Legal Research System
          </h1>
          <p className="text-white/80 text-sm">
            AI-Powered Indian Law Research & Analysis
          </p>
          <div className="flex items-center justify-center mt-2 text-secondary text-sm font-medium">
            <IndianRupee className="h-4 w-4 mr-1" />
            <span>Focused on Indian Jurisdiction</span>
          </div>
        </div>

        <Card className="card-legal shadow-legal-hover">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
            <CardDescription>
              Sign in to access your legal research dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="lawyer@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-legal"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-legal"
                  required
                />
              </div>
              <Button 
                type="submit" 
                className="btn-legal-primary w-full text-base"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Signing In...
                  </>
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>

            <div className="mt-6 space-y-4">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="w-full">
                  <Link to="/signup" className="flex items-center w-full justify-center">
                    Create Account
                  </Link>
                </Button>
                <Button variant="outline" className="w-full">
                  <Link to="/forgot-password" className="flex items-center w-full justify-center">
                    Forgot Password
                  </Link>
                </Button>
              </div>
            </div>

            {/* Demo Credentials */}
            <div className="mt-6 p-4 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground mb-2 font-medium">Demo Credentials:</p>
              <div className="text-xs space-y-1">
                <p><strong>Email:</strong> demo@legalresearch.in</p>
                <p><strong>Password:</strong> Any password</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <p className="text-center text-white/60 text-xs mt-8">
          Powered by AI • Compliant with Indian Legal Standards
        </p>
      </div>
    </div>
  );
};

export default Login;