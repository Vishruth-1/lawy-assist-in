import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { 
  Settings as SettingsIcon, 
  Brain, 
  Shield, 
  Bell, 
  Save,
  RotateCcw,
  Sun,
  Moon,
  Globe,
  Zap,
  Lock,
  Mail,
  Database
} from 'lucide-react';

const Settings = () => {
  const { toast } = useToast();
  const [hasChanges, setHasChanges] = useState(false);
  
  // Settings state
  const [settings, setSettings] = useState({
    general: {
      theme: 'light',
      defaultPage: 'dashboard',
      language: 'english'
    },
    ai: {
      modelProvider: 'openai',
      modelName: 'gpt-4',
      temperature: 0.7,
      maxTokens: 2048,
      topKRetrieval: 5,
      citeStyle: 'indian-standard',
      indianLawFilter: true
    },
    privacy: {
      dataRetentionDays: 90,
      allowPromptLogging: true,
      consentDocumentStorage: true
    },
    notifications: {
      emailAlerts: true,
      analysisCompletion: true,
      systemUpdates: false
    }
  });

  const handleSettingChange = (section: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [key]: value
      }
    }));
    setHasChanges(true);
  };

  const handleSaveSettings = async () => {
    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setHasChanges(false);
      toast({
        title: "Settings saved",
        description: "Your preferences have been updated successfully",
      });
    } catch (error) {
      toast({
        title: "Save failed",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  const handleResetToDefaults = () => {
    setSettings({
      general: {
        theme: 'light',
        defaultPage: 'dashboard',
        language: 'english'
      },
      ai: {
        modelProvider: 'openai',
        modelName: 'gpt-4',
        temperature: 0.7,
        maxTokens: 2048,
        topKRetrieval: 5,
        citeStyle: 'indian-standard',
        indianLawFilter: true
      },
      privacy: {
        dataRetentionDays: 90,
        allowPromptLogging: true,
        consentDocumentStorage: true
      },
      notifications: {
        emailAlerts: true,
        analysisCompletion: true,
        systemUpdates: false
      }
    });
    setHasChanges(true);
    toast({
      title: "Reset to defaults",
      description: "All settings have been reset to default values",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-primary shadow-legal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-white">Settings</h1>
              <p className="text-white/80 mt-2">Customize your Legal Research System experience</p>
            </div>
            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={handleResetToDefaults}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset to Defaults
              </Button>
              <Button
                onClick={handleSaveSettings}
                disabled={!hasChanges}
                className="btn-legal-secondary"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Settings
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="general" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="general" className="flex items-center space-x-2">
              <SettingsIcon className="h-4 w-4" />
              <span>General</span>
            </TabsTrigger>
            <TabsTrigger value="ai" className="flex items-center space-x-2">
              <Brain className="h-4 w-4" />
              <span>AI/Model</span>
            </TabsTrigger>
            <TabsTrigger value="privacy" className="flex items-center space-x-2">
              <Shield className="h-4 w-4" />
              <span>Privacy/Data</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center space-x-2">
              <Bell className="h-4 w-4" />
              <span>Notifications</span>
            </TabsTrigger>
          </TabsList>

          {/* General Settings */}
          <TabsContent value="general">
            <Card className="card-legal">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <SettingsIcon className="h-5 w-5 mr-2" />
                  General Settings
                </CardTitle>
                <CardDescription>
                  Configure basic application preferences and appearance
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Theme Selection */}
                  <div className="space-y-2">
                    <Label className="flex items-center">
                      {settings.general.theme === 'dark' ? (
                        <Moon className="h-4 w-4 mr-2" />
                      ) : (
                        <Sun className="h-4 w-4 mr-2" />
                      )}
                      Theme
                    </Label>
                    <Select
                      value={settings.general.theme}
                      onValueChange={(value) => handleSettingChange('general', 'theme', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Light Mode</SelectItem>
                        <SelectItem value="dark">Dark Mode</SelectItem>
                        <SelectItem value="system">System Default</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Default Page */}
                  <div className="space-y-2">
                    <Label>Default Page After Login</Label>
                    <Select
                      value={settings.general.defaultPage}
                      onValueChange={(value) => handleSettingChange('general', 'defaultPage', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dashboard">Dashboard</SelectItem>
                        <SelectItem value="documents">Documents</SelectItem>
                        <SelectItem value="ai-legal-search">AI Legal Search</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Language */}
                  <div className="space-y-2">
                    <Label className="flex items-center">
                      <Globe className="h-4 w-4 mr-2" />
                      Language
                    </Label>
                    <Select
                      value={settings.general.language}
                      onValueChange={(value) => handleSettingChange('general', 'language', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="hindi">हिन्दी (Hindi)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* AI/Model Settings */}
          <TabsContent value="ai">
            <Card className="card-legal">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Brain className="h-5 w-5 mr-2" />
                  AI & Model Configuration
                </CardTitle>
                <CardDescription>
                  Configure AI model settings and retrieval parameters
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Model Provider */}
                  <div className="space-y-2">
                    <Label>Model Provider</Label>
                    <Select
                      value={settings.ai.modelProvider}
                      onValueChange={(value) => handleSettingChange('ai', 'modelProvider', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="openai">OpenAI</SelectItem>
                        <SelectItem value="anthropic">Anthropic</SelectItem>
                        <SelectItem value="local">Local Model</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Model Name */}
                  <div className="space-y-2">
                    <Label>Model Name</Label>
                    <Select
                      value={settings.ai.modelName}
                      onValueChange={(value) => handleSettingChange('ai', 'modelName', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gpt-4">GPT-4</SelectItem>
                        <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                        <SelectItem value="claude-3">Claude 3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Temperature */}
                  <div className="space-y-2">
                    <Label>Temperature: {settings.ai.temperature}</Label>
                    <Input
                      type="range"
                      min="0"
                      max="2"
                      step="0.1"
                      value={settings.ai.temperature}
                      onChange={(e) => handleSettingChange('ai', 'temperature', parseFloat(e.target.value))}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Conservative</span>
                      <span>Creative</span>
                    </div>
                  </div>

                  {/* Max Tokens */}
                  <div className="space-y-2">
                    <Label>Max Tokens</Label>
                    <Input
                      type="number"
                      value={settings.ai.maxTokens}
                      onChange={(e) => handleSettingChange('ai', 'maxTokens', parseInt(e.target.value))}
                      min="512"
                      max="4096"
                    />
                  </div>

                  {/* Top-K Retrieval */}
                  <div className="space-y-2">
                    <Label>Top-K Retrieval for FAISS</Label>
                    <Input
                      type="number"
                      value={settings.ai.topKRetrieval}
                      onChange={(e) => handleSettingChange('ai', 'topKRetrieval', parseInt(e.target.value))}
                      min="1"
                      max="20"
                    />
                    <p className="text-xs text-muted-foreground">Number of documents to retrieve (default: 5)</p>
                  </div>

                  {/* Citation Style */}
                  <div className="space-y-2">
                    <Label>Citation Style</Label>
                    <Select
                      value={settings.ai.citeStyle}
                      onValueChange={(value) => handleSettingChange('ai', 'citeStyle', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="indian-standard">Indian Standard</SelectItem>
                        <SelectItem value="supreme-court">Supreme Court Format</SelectItem>
                        <SelectItem value="high-court">High Court Format</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Indian Law Filter */}
                <div className="flex items-center justify-between p-4 bg-secondary/10 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Zap className="h-5 w-5 text-secondary" />
                    <div>
                      <p className="font-medium text-foreground">Indian Law Strict Filter</p>
                      <p className="text-sm text-muted-foreground">
                        Restrict results to Indian legal sources only (Locked ON)
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={settings.ai.indianLawFilter}
                    disabled={true}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Privacy & Data Settings */}
          <TabsContent value="privacy">
            <Card className="card-legal">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  Privacy & Data Settings
                </CardTitle>
                <CardDescription>
                  Control how your data is stored and processed
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-6">
                  {/* Data Retention */}
                  <div className="space-y-2">
                    <Label className="flex items-center">
                      <Database className="h-4 w-4 mr-2" />
                      Data Retention (Days)
                    </Label>
                    <Input
                      type="number"
                      value={settings.privacy.dataRetentionDays}
                      onChange={(e) => handleSettingChange('privacy', 'dataRetentionDays', parseInt(e.target.value))}
                      min="30"
                      max="365"
                      className="max-w-xs"
                    />
                    <p className="text-xs text-muted-foreground">
                      Documents and analysis results will be deleted after this period
                    </p>
                  </div>

                  {/* Prompt Logging */}
                  <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Lock className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium text-foreground">Allow Prompt/Response Logging</p>
                        <p className="text-sm text-muted-foreground">
                          Enable logging of AI interactions for improvement purposes
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={settings.privacy.allowPromptLogging}
                      onCheckedChange={(value) => handleSettingChange('privacy', 'allowPromptLogging', value)}
                    />
                  </div>

                  {/* Document Storage Consent */}
                  <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Shield className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium text-foreground">Consent for Storing Documents</p>
                        <p className="text-sm text-muted-foreground">
                          Allow system to store uploaded documents for analysis
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={settings.privacy.consentDocumentStorage}
                      onCheckedChange={(value) => handleSettingChange('privacy', 'consentDocumentStorage', value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Settings */}
          <TabsContent value="notifications">
            <Card className="card-legal">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="h-5 w-5 mr-2" />
                  Notification Preferences
                </CardTitle>
                <CardDescription>
                  Configure how and when you receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  {/* Email Alerts */}
                  <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Mail className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium text-foreground">Email Alerts</p>
                        <p className="text-sm text-muted-foreground">
                          Receive important notifications via email
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={settings.notifications.emailAlerts}
                      onCheckedChange={(value) => handleSettingChange('notifications', 'emailAlerts', value)}
                    />
                  </div>

                  {/* Analysis Completion */}
                  <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Brain className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium text-foreground">Analysis Completion Alerts</p>
                        <p className="text-sm text-muted-foreground">
                          Get notified when document analysis is complete
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={settings.notifications.analysisCompletion}
                      onCheckedChange={(value) => handleSettingChange('notifications', 'analysisCompletion', value)}
                    />
                  </div>

                  {/* System Updates */}
                  <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Zap className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium text-foreground">System Updates</p>
                        <p className="text-sm text-muted-foreground">
                          Receive notifications about system updates and new features
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={settings.notifications.systemUpdates}
                      onCheckedChange={(value) => handleSettingChange('notifications', 'systemUpdates', value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Settings;