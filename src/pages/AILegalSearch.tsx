import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { 
  Search, 
  FileText, 
  Copy, 
  Star,
  Calendar,
  MapPin,
  AlertCircle,
  BookOpen,
  Scale,
  Gavel
} from 'lucide-react';

// Mock search results for demonstration
const mockSearchResults = [
  {
    id: '1',
    title: 'Supreme Court Judgment on Right to Privacy',
    source: 'Supreme Court of India',
    snippet: 'The right to privacy is protected as an intrinsic part of the right to life and personal liberty under Article 21 and as a part of the freedoms guaranteed by Part III of the Constitution...',
    score: 0.95,
    jurisdiction: 'India',
    date: '2017-08-24',
    citationPointers: ['Article 21', 'Right to Privacy', 'Fundamental Rights']
  },
  {
    id: '2',
    title: 'Contract Act 1872 - Section 73 Analysis',
    source: 'Legal Document',
    snippet: 'When a contract has been broken, the party who suffers by such breach is entitled to receive, from the party who has broken the contract, compensation for any loss or damage...',
    score: 0.88,
    jurisdiction: 'India',
    date: '1872-04-25',
    citationPointers: ['Section 73', 'Breach of Contract', 'Compensation']
  },
  {
    id: '3',
    title: 'Delhi High Court - Data Protection Guidelines',
    source: 'Delhi High Court',
    snippet: 'Personal data protection requires adherence to principles of lawfulness, fairness, transparency, purpose limitation, data minimization, accuracy, storage limitation...',
    score: 0.82,
    jurisdiction: 'India',
    date: '2023-03-15',
    citationPointers: ['Data Protection', 'Privacy Rights', 'Delhi HC']
  }
];

const AILegalSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [argumentPrompt, setArgumentPrompt] = useState('');
  const [searchResults, setSearchResults] = useState<typeof mockSearchResults>([]);
  const [generatedArguments, setGeneratedArguments] = useState<any>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [isGeneratingArguments, setIsGeneratingArguments] = useState(false);
  const { toast } = useToast();

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      toast({
        title: "Enter search query",
        description: "Please enter a search query to continue",
        variant: "destructive",
      });
      return;
    }

    setIsSearching(true);
    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSearchResults(mockSearchResults);
      toast({
        title: "Search completed",
        description: `Found ${mockSearchResults.length} relevant documents`,
      });
    } catch (error) {
      toast({
        title: "Search failed",
        description: "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsSearching(false);
    }
  };

  const handleGenerateArguments = async () => {
    if (!argumentPrompt.trim()) {
      toast({
        title: "Enter argument prompt",
        description: "Please enter a prompt to generate legal arguments",
        variant: "destructive",
      });
      return;
    }

    setIsGeneratingArguments(true);
    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const mockArguments = {
        issue: "Analysis of privacy rights under Indian constitutional law",
        rules_authorities: [
          "Article 21 of the Constitution of India - Right to Life and Personal Liberty",
          "K.S. Puttaswamy v. Union of India (2017) - Right to Privacy as Fundamental Right",
          "Maneka Gandhi v. Union of India (1978) - Expanded interpretation of Article 21",
          "Information Technology Act, 2000 - Digital privacy framework"
        ],
        application: "The right to privacy has evolved from being an implied right to an explicitly recognized fundamental right. The Supreme Court in Puttaswamy case established privacy as an intrinsic part of Article 21, creating binding precedent for all lower courts and government authorities.",
        conclusion: "Privacy rights in India are constitutionally protected and must be balanced against legitimate state interests through the test of proportionality.",
        citations: [
          "Justice K.S. Puttaswamy (Retd.) and Anr. vs Union Of India And Ors, (2017) 10 SCC 1",
          "Maneka Gandhi vs Union Of India, (1978) 1 SCC 248",
          "Constitution of India, Article 21"
        ]
      };
      
      setGeneratedArguments(mockArguments);
      toast({
        title: "Arguments generated",
        description: "Legal arguments have been structured with Indian authorities",
      });
    } catch (error) {
      toast({
        title: "Generation failed",
        description: "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingArguments(false);
    }
  };

  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Citation has been copied to your clipboard",
    });
  };

  const handleViewFullText = (resultId: string) => {
    toast({
      title: "Opening full text",
      description: "Full document would open in modal/new page",
    });
  };

  const handleCiteDocument = (resultId: string) => {
    const result = searchResults.find(r => r.id === resultId);
    if (result) {
      const citation = `${result.title}, ${result.source}, ${result.date}`;
      handleCopyToClipboard(citation);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-primary shadow-legal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-white">AI Legal Search</h1>
          <p className="text-white/80 mt-2">Search Indian legal database using natural language queries</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Indian Law Banner */}
        <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-4 mb-8">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-secondary mr-2" />
            <span className="font-medium text-secondary">Results filtered to Indian Law</span>
            <div className="ml-auto flex items-center text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 mr-1" />
              <span>Jurisdiction: India (Locked)</span>
            </div>
          </div>
        </div>

        {/* Search Section */}
        <Card className="card-legal mb-8">
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <Search className="h-6 w-6 mr-2" />
              Legal Document Search
            </CardTitle>
            <CardDescription>
              Search through Indian legal documents, cases, and statutes using natural language
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex space-x-4">
                <Input
                  placeholder="Enter your legal query (e.g., 'privacy rights under Article 21')"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1"
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
                <Button 
                  onClick={handleSearch}
                  className="btn-legal-primary"
                  disabled={isSearching}
                >
                  {isSearching ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Searching...
                    </>
                  ) : (
                    <>
                      <Search className="h-4 w-4 mr-2" />
                      Search
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <Card className="card-legal mb-8">
            <CardHeader>
              <CardTitle>Search Results</CardTitle>
              <CardDescription>
                Found {searchResults.length} relevant documents from Indian legal sources
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {searchResults.map((result) => (
                  <div key={result.id} className="border border-border rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-foreground mb-2">{result.title}</h3>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                          <span className="flex items-center">
                            <BookOpen className="h-4 w-4 mr-1" />
                            {result.source}
                          </span>
                          <span className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {result.date}
                          </span>
                          <span className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {result.jurisdiction}
                          </span>
                          <span className="flex items-center">
                            <Star className="h-4 w-4 mr-1 text-secondary" />
                            {(result.score * 100).toFixed(0)}% relevance
                          </span>
                        </div>
                        <p className="text-muted-foreground leading-relaxed">{result.snippet}</p>
                        <div className="flex flex-wrap gap-2 mt-3">
                          {result.citationPointers.map((pointer, index) => (
                            <span key={index} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                              {pointer}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewFullText(result.id)}
                      >
                        <FileText className="h-4 w-4 mr-1" />
                        Full Text
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleCiteDocument(result.id)}
                      >
                        <Copy className="h-4 w-4 mr-1" />
                        Cite
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Legal Arguments Generation */}
        <Card className="card-legal">
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <Gavel className="h-6 w-6 mr-2" />
              Legal Arguments Generator
            </CardTitle>
            <CardDescription>
              Generate structured legal arguments based on Indian law and authorities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Argument Prompt (Indian Law)
                </label>
                <Textarea
                  placeholder="Enter your legal argument prompt (e.g., 'Analyze the constitutional validity of data protection requirements under Article 21')"
                  value={argumentPrompt}
                  onChange={(e) => setArgumentPrompt(e.target.value)}
                  rows={4}
                  className="w-full"
                />
              </div>
              
              <Button 
                onClick={handleGenerateArguments}
                className="btn-legal-secondary"
                disabled={isGeneratingArguments}
              >
                {isGeneratingArguments ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Generating Arguments...
                  </>
                ) : (
                  <>
                    <Scale className="h-4 w-4 mr-2" />
                    Generate Legal Arguments
                  </>
                )}
              </Button>

              {/* Generated Arguments Display */}
              {generatedArguments && (
                <div className="mt-8 p-6 bg-gradient-card rounded-lg border border-border">
                  <h3 className="text-xl font-bold text-foreground mb-6 flex items-center">
                    <Gavel className="h-5 w-5 mr-2 text-secondary" />
                    Generated Legal Arguments
                  </h3>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Issue</h4>
                      <p className="text-muted-foreground">{generatedArguments.issue}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Rules/Authorities (India)</h4>
                      <ul className="space-y-2">
                        {generatedArguments.rules_authorities.map((rule: string, index: number) => (
                          <li key={index} className="flex items-start">
                            <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span className="text-muted-foreground">{rule}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Application</h4>
                      <p className="text-muted-foreground">{generatedArguments.application}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Conclusion</h4>
                      <p className="text-muted-foreground">{generatedArguments.conclusion}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Cited Sources</h4>
                      <div className="space-y-2">
                        {generatedArguments.citations.map((citation: string, index: number) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                            <span className="text-sm text-muted-foreground">{citation}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleCopyToClipboard(citation)}
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AILegalSearch;