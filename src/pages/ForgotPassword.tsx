import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Scale, IndianRupee, Gavel, ArrowLeft } from 'lucide-react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsSubmitted(true);
      toast({
        title: "Reset link sent!",
        description: "Check your email for password reset instructions",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send reset link. Please try again.",
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
            <CardTitle className="text-2xl font-bold">
              {isSubmitted ? 'Check Your Email' : 'Reset Password'}
            </CardTitle>
            <CardDescription>
              {isSubmitted 
                ? 'We\'ve sent password reset instructions to your email address'
                : 'Enter your email address and we\'ll send you a link to reset your password'
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!isSubmitted ? (
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
                <Button 
                  type="submit" 
                  className="btn-legal-primary w-full text-base"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Sending Reset Link...
                    </>
                  ) : (
                    'Send Reset Link'
                  )}
                </Button>
              </form>
            ) : (
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-legal-success rounded-full flex items-center justify-center mx-auto">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <p className="text-muted-foreground">
                  If an account with that email exists, you'll receive password reset instructions shortly.
                </p>
                <Button 
                  onClick={() => setIsSubmitted(false)}
                  variant="outline" 
                  className="w-full"
                >
                  Send Another Link
                </Button>
              </div>
            )}

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">Remember your password?</span>
                </div>
              </div>

              <div className="mt-4">
                <Button variant="outline" className="w-full">
                  <Link to="/login" className="flex items-center w-full justify-center">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Sign In
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <p className="text-center text-white/60 text-xs mt-8">
          Need help? Contact our support team for assistance
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;