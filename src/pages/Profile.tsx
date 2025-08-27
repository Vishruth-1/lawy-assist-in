import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import Navigation from '@/components/Navigation';
import { 
  User, 
  Mail, 
  Phone, 
  Building, 
  LogOut, 
  UserPlus, 
  Users,
  Moon,
  Sun,
  Edit,
  Save,
  Clock
} from 'lucide-react';

const Profile = () => {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    org: user?.org || '',
    phone: user?.phone || ''
  });

  const mockConnectedIdentities = [
    { id: '1', provider: 'Email', identifier: user?.email || '', primary: true },
    { id: '2', provider: 'Google', identifier: 'demo@gmail.com', primary: false },
  ];

  const [selectedIdentity, setSelectedIdentity] = useState(mockConnectedIdentities[0].id);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveProfile = async () => {
    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsEditing(false);
      toast({
        title: "Profile updated",
        description: "Your profile information has been saved successfully",
      });
    } catch (error) {
      toast({
        title: "Update failed",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
    // TODO: Implement actual theme switching logic
    toast({
      title: `${!isDarkMode ? 'Dark' : 'Light'} mode enabled`,
      description: "Theme preference will be saved to your settings",
    });
  };

  const handleAddAccount = () => {
    toast({
      title: "Add Account",
      description: "Account linking functionality would be implemented here",
    });
  };

  const handleSwitchAccount = (identityId: string) => {
    setSelectedIdentity(identityId);
    const identity = mockConnectedIdentities.find(i => i.id === identityId);
    toast({
      title: "Account switched",
      description: `Now using ${identity?.provider} account`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Page Header */}
      <div className="bg-gradient-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-foreground">Profile Settings</h1>
          <p className="text-muted-foreground mt-2">Manage your account information and preferences</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Basic Information */}
            <Card className="card-legal">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="flex items-center">
                      <User className="h-5 w-5 mr-2" />
                      Profile Information
                    </CardTitle>
                    <CardDescription>
                      Manage your personal information and contact details
                    </CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    {isEditing ? (
                      <>
                        <Save className="h-4 w-4 mr-1" />
                        Save
                      </>
                    ) : (
                      <>
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </>
                    )}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative">
                      <Mail className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="email"
                        value={formData.email}
                        disabled
                        className="pl-10"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">Email cannot be changed</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="org">Organization</Label>
                    <div className="relative">
                      <Building className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="org"
                        value={formData.org}
                        onChange={(e) => handleInputChange('org', e.target.value)}
                        disabled={!isEditing}
                        className="pl-10"
                        placeholder="Your organization"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="relative">
                      <Phone className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        disabled={!isEditing}
                        className="pl-10"
                        placeholder="+91 XXXXX XXXXX"
                      />
                    </div>
                  </div>
                </div>
                
                {isEditing && (
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleSaveProfile} className="btn-legal-primary">
                      Save Changes
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Account Management */}
            <Card className="card-legal">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  Account Management
                </CardTitle>
                <CardDescription>
                  Manage connected accounts and login methods
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Connected Identities */}
                <div>
                  <h4 className="font-medium text-foreground mb-3">Connected Accounts</h4>
                  <div className="space-y-3">
                    {mockConnectedIdentities.map((identity) => (
                      <div key={identity.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                            <Mail className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{identity.provider}</p>
                            <p className="text-sm text-muted-foreground">{identity.identifier}</p>
                            {identity.primary && (
                              <span className="text-xs text-primary">Primary Account</span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="radio"
                            name="activeAccount"
                            checked={selectedIdentity === identity.id}
                            onChange={() => handleSwitchAccount(identity.id)}
                            className="text-primary"
                          />
                          <span className="text-sm text-muted-foreground">Active</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-3">
                  <Button variant="outline" onClick={handleAddAccount} className="flex-1">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Add Account
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Users className="h-4 w-4 mr-2" />
                    Switch Account
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Quick Actions */}
          <div className="space-y-6">
            {/* Account Status */}
            <Card className="card-legal">
              <CardHeader>
                <CardTitle className="text-lg">Account Status</CardTitle>
              </CardHeader>  
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Plan</span>
                  <span className="font-medium text-foreground">{user?.role || 'User'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Status</span>
                  <span className="px-2 py-1 bg-legal-success/10 text-legal-success text-xs rounded-full">
                    Active
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Last Login</span>
                  <span className="text-sm text-foreground flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    Today
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Member Since</span>
                  <span className="text-sm text-foreground">Jan 2024</span>
                </div>
              </CardContent>
            </Card>

            {/* Theme Settings */}
            <Card className="card-legal">
              <CardHeader>
                <CardTitle className="text-lg">Appearance</CardTitle>
                <CardDescription className="text-sm">
                  Customize your interface appearance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {isDarkMode ? (
                      <Moon className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <Sun className="h-5 w-5 text-muted-foreground" />
                    )}
                    <div>
                      <p className="font-medium text-foreground">Dark Mode</p>
                      <p className="text-sm text-muted-foreground">
                        {isDarkMode ? 'Dark theme enabled' : 'Light theme enabled'}
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={isDarkMode}
                    onCheckedChange={handleThemeToggle}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="card-legal">
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <User className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add Account
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start text-destructive hover:text-destructive"
                  onClick={logout}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Log Out
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;