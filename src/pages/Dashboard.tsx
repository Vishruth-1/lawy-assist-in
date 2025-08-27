import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import Navigation from '@/components/Navigation';
import { 
  Upload, 
  Search, 
  FileText, 
  User, 
  Settings, 
  Scale,
  IndianRupee,
  BookOpen,
  Shield
} from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const navigationCards = [
    {
      title: 'Upload Documents',
      description: 'Upload and manage your legal documents for AI analysis',
      icon: Upload,
      route: '/documents',
      color: 'from-blue-500 to-blue-600',
    },
    {
      title: 'AI Legal Search',
      description: 'Search through Indian legal database using natural language',
      icon: Search,
      route: '/ai-legal-search',
      color: 'from-emerald-500 to-emerald-600',
    },
    {
      title: 'Contract Analysis',
      description: 'Analyze contracts for risks and compliance issues',
      icon: FileText,
      route: '/contract-analysis',
      color: 'from-orange-500 to-orange-600',
    },
    {
      title: 'Profile',
      description: 'Manage your account settings and preferences',
      icon: User,
      route: '/profile',
      color: 'from-purple-500 to-purple-600',
    },
    {
      title: 'Settings',
      description: 'Configure AI models, privacy, and system preferences',
      icon: Settings,
      route: '/settings',
      color: 'from-gray-500 to-gray-600',
    },
  ];

  const handleNavigation = (route: string) => {
    navigate(route);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, {user?.name?.split(' ')[0]}
          </h2>
          <p className="text-muted-foreground text-lg">
            Access your legal research tools and manage your legal documents with AI-powered insights.
          </p>
        </div>

        {/* Quick Stats Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="card-legal text-center">
            <CardContent className="pt-6">
              <BookOpen className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">Indian Law</div>
              <p className="text-sm text-muted-foreground">Jurisdiction Focus</p>
            </CardContent>
          </Card>
          <Card className="card-legal text-center">
            <CardContent className="pt-6">
              <Shield className="h-8 w-8 text-legal-success mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">AI Powered</div>
              <p className="text-sm text-muted-foreground">Advanced Analysis</p>
            </CardContent>
          </Card>
          <Card className="card-legal text-center">
            <CardContent className="pt-6">
              <Scale className="h-8 w-8 text-secondary mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">Compliant</div>
              <p className="text-sm text-muted-foreground">Legal Standards</p>
            </CardContent>
          </Card>
        </div>

        {/* Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {navigationCards.map((card, index) => {
            const IconComponent = card.icon;
            return (
              <Card 
                key={index} 
                className="card-legal hover:shadow-legal-hover cursor-pointer transition-all duration-300 hover:scale-[1.02]"
                onClick={() => handleNavigation(card.route)}
              >
                <CardHeader>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${card.color} flex items-center justify-center mb-4`}>
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{card.title}</CardTitle>
                  <CardDescription className="text-base">
                    {card.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    className="btn-legal-primary w-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNavigation(card.route);
                    }}
                  >
                    Access Tool
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Recent Activity Section */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-foreground mb-6">Getting Started</h3>
          <Card className="card-legal">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold mb-3 text-foreground">Quick Start Guide</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      Upload your legal documents for AI analysis
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      Use natural language to search Indian legal database
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      Analyze contracts for compliance and risks
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      Generate legal arguments with AI assistance
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-3 text-foreground">Indian Law Coverage</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-secondary rounded-full mr-3"></div>
                      Constitution of India
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-secondary rounded-full mr-3"></div>
                      Indian Penal Code (IPC)
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-secondary rounded-full mr-3"></div>
                      Contract Act, Companies Act
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-secondary rounded-full mr-3"></div>
                      Supreme Court & High Court Judgments
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;