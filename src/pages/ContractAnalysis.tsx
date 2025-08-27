import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { 
  FileText, 
  Upload, 
  AlertTriangle, 
  CheckCircle, 
  Download,
  Shield,
  AlertCircle,
  XCircle,
  Info
} from 'lucide-react';

// Mock analysis results for demonstration
const mockAnalysisResult = {
  extracted_clauses: {
    indemnity: {
      present: true,
      content: "Each party shall indemnify the other against any claims arising from their respective performance under this agreement.",
      risk_level: "low"
    },
    arbitration: {
      present: true,
      content: "Any disputes shall be resolved through arbitration in Mumbai under the Arbitration and Conciliation Act, 2015.",
      risk_level: "low"
    },
    governing_law: {
      present: true,
      content: "This agreement shall be governed by the laws of India.",
      risk_level: "low"
    },
    termination: {
      present: true,
      content: "Either party may terminate this agreement with 30 days written notice.",
      risk_level: "medium"
    },
    confidentiality: {
      present: false,
      content: null,
      risk_level: "high"
    },
    limitation_of_liability: {
      present: true,
      content: "In no event shall either party's liability exceed the total amount paid under this agreement.",
      risk_level: "medium"
    },
    intellectual_property: {
      present: false,
      content: null,
      risk_level: "high"
    },
    data_protection: {
      present: true,
      content: "Both parties agree to comply with applicable data protection laws including the Personal Data Protection Act.",
      risk_level: "low"
    }
  },
  missing_clauses: [
    "Confidentiality clause",
    "Intellectual Property rights",
    "Force Majeure provisions",
    "Assignment restrictions"
  ],
  risks: [
    {
      severity: "high",
      description: "Missing confidentiality clause may lead to data breaches",
      recommendation: "Add comprehensive confidentiality and non-disclosure provisions"
    },
    {
      severity: "high", 
      description: "No intellectual property rights specified",
      recommendation: "Clearly define IP ownership and licensing terms"
    },
    {
      severity: "medium",
      description: "Termination clause lacks specific grounds",
      recommendation: "Include specific termination triggers and procedures"
    }
  ],
  recommendations: [
    "Add confidentiality and non-disclosure provisions",
    "Define intellectual property ownership clearly",
    "Include force majeure clause for unforeseen circumstances",
    "Add assignment and subcontracting restrictions",
    "Specify governing jurisdiction for disputes"
  ]
};

const ContractAnalysis = () => {
  const [activeTab, setActiveTab] = useState('upload');
  const [contractText, setContractText] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
      if (!allowedTypes.includes(file.type)) {
        toast({
          title: "Invalid file type",
          description: "Please upload PDF, DOCX, or TXT files only",
          variant: "destructive",
        });
        return;
      }
      
      setSelectedFile(file);
    }
  };

  const handleAnalyze = async () => {
    if (activeTab === 'upload' && !selectedFile) {
      toast({
        title: "No file selected",
        description: "Please select a contract file to analyze",
        variant: "destructive",
      });
      return;
    }

    if (activeTab === 'text' && !contractText.trim()) {
      toast({
        title: "No text provided",
        description: "Please paste contract text to analyze",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 4000));
      setAnalysisResult(mockAnalysisResult);
      toast({
        title: "Analysis complete",
        description: "Contract has been analyzed for risks and compliance",
      });
    } catch (error) {
      toast({
        title: "Analysis failed",
        description: "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleDownloadReport = (format: 'markdown' | 'json') => {
    // TODO: Implement actual download functionality
    toast({
      title: "Download started",
      description: `Report will be downloaded as ${format.toUpperCase()}`,
    });
  };

  const getRiskIcon = (level: string) => {
    switch (level) {
      case 'high':
        return <XCircle className="h-5 w-5 text-destructive" />;
      case 'medium':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'low':
        return <CheckCircle className="h-5 w-5 text-legal-success" />;
      default:
        return <Info className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'high':
        return 'border-destructive/20 bg-destructive/5';
      case 'medium':
        return 'border-yellow-200 bg-yellow-50';
      case 'low':
        return 'border-legal-success/20 bg-legal-success/5';
      default:
        return 'border-border bg-muted/5';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-primary shadow-legal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-white">Contract Analysis</h1>
          <p className="text-white/80 mt-2">AI-powered contract analysis for risks, compliance, and recommendations</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Input Section */}
        <Card className="card-legal mb-8">
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <FileText className="h-6 w-6 mr-2" />
              Contract Input
            </CardTitle>
            <CardDescription>
              Upload a contract document or paste text for AI analysis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="upload">Document Upload</TabsTrigger>
                <TabsTrigger value="text">Raw Text Paste</TabsTrigger>
              </TabsList>
              
              <TabsContent value="upload" className="space-y-4">
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                  <input
                    type="file"
                    accept=".pdf,.docx,.txt"
                    onChange={handleFileSelect}
                    className="hidden"
                    id="contract-upload"
                  />
                  <label htmlFor="contract-upload" className="cursor-pointer">
                    <Upload className="h-12 w-12 text-primary mx-auto mb-4" />
                    <p className="text-lg font-medium text-foreground mb-2">
                      Click to select contract file
                    </p>
                    <p className="text-muted-foreground">
                      PDF, DOCX, TXT files up to 10MB
                    </p>
                  </label>
                </div>
                
                {selectedFile && (
                  <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 text-primary mr-2" />
                      <div>
                        <p className="font-medium">{selectedFile.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {(selectedFile.size / 1024 / 1024).toFixed(1)} MB
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="text" className="space-y-4">
                <Textarea
                  placeholder="Paste your contract text here for analysis..."
                  value={contractText}
                  onChange={(e) => setContractText(e.target.value)}
                  rows={12}
                  className="w-full"
                />
                <p className="text-sm text-muted-foreground">
                  {contractText.length.toLocaleString()} characters
                </p>
              </TabsContent>
            </Tabs>
            
            <div className="mt-6">
              <Button 
                onClick={handleAnalyze}
                className="btn-legal-primary w-full"
                disabled={isAnalyzing}
              >
                {isAnalyzing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Analyzing Contract...
                  </>
                ) : (
                  <>
                    <Shield className="h-4 w-4 mr-2" />
                    Analyze Contract
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Analysis Results */}
        {analysisResult && (
          <div className="space-y-8">
            {/* Clause Analysis */}
            <Card className="card-legal">
              <CardHeader>
                <CardTitle>Extracted Clauses</CardTitle>
                <CardDescription>
                  Analysis of key contractual clauses and their risk levels
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(analysisResult.extracted_clauses).map(([clauseType, clause]: [string, any]) => (
                    <div key={clauseType} className={`p-4 rounded-lg border ${getRiskColor(clause.risk_level)}`}>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-foreground capitalize">
                          {clauseType.replace('_', ' ')}
                        </h4>
                        <div className="flex items-center space-x-1">
                          {getRiskIcon(clause.risk_level)}
                          <span className="text-sm font-medium capitalize">{clause.risk_level}</span>
                        </div>
                      </div>
                      {clause.present ? (
                        <p className="text-sm text-muted-foreground">{clause.content}</p>
                      ) : (
                        <p className="text-sm text-destructive font-medium">Missing from contract</p>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Risk Analysis */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="card-legal">
                <CardHeader>
                  <CardTitle className="flex items-center text-red-600">
                    <AlertTriangle className="h-5 w-5 mr-2" />
                    Risk Flags
                  </CardTitle>
                  <CardDescription>
                    Identified risks and compliance issues
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analysisResult.risks.map((risk: any, index: number) => (
                      <div key={index} className={`p-4 rounded-lg border ${getRiskColor(risk.severity)}`}>
                        <div className="flex items-start space-x-3">
                          {getRiskIcon(risk.severity)}
                          <div className="flex-1">
                            <p className="font-medium text-foreground mb-1">{risk.description}</p>
                            <p className="text-sm text-muted-foreground">{risk.recommendation}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="card-legal">
                <CardHeader>
                  <CardTitle className="flex items-center text-blue-600">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Recommendations
                  </CardTitle>
                  <CardDescription>
                    Suggested improvements and additions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {analysisResult.recommendations.map((recommendation: string, index: number) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-sm text-muted-foreground">{recommendation}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Missing Clauses */}
            <Card className="card-legal">
              <CardHeader>
                <CardTitle className="flex items-center text-yellow-600">
                  <AlertCircle className="h-5 w-5 mr-2" />
                  Missing Clauses
                </CardTitle>
                <CardDescription>
                  Important clauses not found in the contract
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                  {analysisResult.missing_clauses.map((clause: string, index: number) => (
                    <div key={index} className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <p className="text-sm font-medium text-yellow-800">{clause}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Download Section */}
            <Card className="card-legal">
              <CardHeader>
                <CardTitle>Export Analysis Report</CardTitle>
                <CardDescription>
                  Download the complete analysis report in your preferred format
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-4">
                  <Button 
                    onClick={() => handleDownloadReport('markdown')}
                    variant="outline"
                    className="flex-1"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download Markdown
                  </Button>
                  <Button 
                    onClick={() => handleDownloadReport('json')}
                    variant="outline"
                    className="flex-1"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download JSON
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContractAnalysis;