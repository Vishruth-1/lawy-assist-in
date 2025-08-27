import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import Navigation from '@/components/Navigation';
import { 
  Upload, 
  FileText, 
  Search, 
  Eye, 
  Trash2,
  Download,
  Filter,
  Calendar,
  FileCheck
} from 'lucide-react';

// Mock data for demonstration
const mockDocuments = [
  {
    id: '1',
    title: 'Contract Agreement - Tech Services',
    filename: 'tech_services_contract.pdf',
    type: 'PDF',
    size: '2.4 MB',
    uploadedAt: '2024-01-15',
    jurisdiction: 'India',
    status: 'processed'
  },
  {
    id: '2',
    title: 'Supreme Court Judgment - Privacy Rights',
    filename: 'sc_privacy_judgment.pdf',
    type: 'PDF',
    size: '1.8 MB',
    uploadedAt: '2024-01-14',
    jurisdiction: 'India',
    status: 'processed'
  },
  {
    id: '3',
    title: 'High Court Order - Commercial Dispute',
    filename: 'hc_commercial_order.docx',
    type: 'DOCX',
    size: '980 KB',
    uploadedAt: '2024-01-13',
    jurisdiction: 'India',
    status: 'processing'
  }
];

const Documents = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [documents, setDocuments] = useState(mockDocuments);
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
      
      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please upload files smaller than 10MB",
          variant: "destructive",
        });
        return;
      }
      
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast({
        title: "No file selected",
        description: "Please select a file to upload",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const newDoc = {
        id: Date.now().toString(),
        title: selectedFile.name.replace(/\.[^/.]+$/, ""),
        filename: selectedFile.name,
        type: selectedFile.type.includes('pdf') ? 'PDF' : selectedFile.type.includes('word') ? 'DOCX' : 'TXT',
        size: `${(selectedFile.size / 1024 / 1024).toFixed(1)} MB`,
        uploadedAt: new Date().toISOString().split('T')[0],
        jurisdiction: 'India',
        status: 'processing'
      };
      
      setDocuments([newDoc, ...documents]);
      setSelectedFile(null);
      
      toast({
        title: "Upload successful!",
        description: "Document uploaded and processing started",
      });
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleView = (docId: string) => {
    // TODO: Implement document preview modal
    toast({
      title: "Opening document",
      description: "Document preview would open here",
    });
  };

  const handleViewFullText = (docId: string) => {
    // TODO: Implement full text view
    toast({
      title: "Loading full text",
      description: "Full document text would load here",
    });
  };

  const handleDelete = (docId: string) => {
    setDocuments(documents.filter(doc => doc.id !== docId));
    toast({
      title: "Document deleted",
      description: "Document has been removed",
    });
  };

  const filteredDocuments = documents.filter(doc =>
    doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.filename.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Page Header */}
      <div className="bg-gradient-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-foreground">Document Management</h1>
          <p className="text-muted-foreground mt-2">Upload, manage, and analyze your legal documents</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Upload Section */}
        <Card className="card-legal mb-8">
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <Upload className="h-6 w-6 mr-2" />
              Upload Documents
            </CardTitle>
            <CardDescription>
              Upload PDF, DOCX, or TXT files for AI analysis and indexing (Max 10MB)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                <input
                  type="file"
                  accept=".pdf,.docx,.txt"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <Upload className="h-12 w-12 text-primary mx-auto mb-4" />
                  <p className="text-lg font-medium text-foreground mb-2">
                    Click to select or drag and drop
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
                  <Button 
                    onClick={handleUpload}
                    className="btn-legal-primary"
                    disabled={isUploading}
                  >
                    {isUploading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Processing...
                      </>
                    ) : (
                      'Upload & Process'
                    )}
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Documents List */}
        <Card className="card-legal">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-xl">Previously Uploaded Documents</CardTitle>
                <CardDescription>
                  Search and manage your document library
                </CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search documents..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {filteredDocuments.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-lg font-medium text-muted-foreground mb-2">
                  {documents.length === 0 ? 'No documents uploaded yet' : 'No documents match your search'}
                </p>
                <p className="text-muted-foreground">
                  {documents.length === 0 ? 'Upload your first document to get started' : 'Try adjusting your search terms'}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredDocuments.map((doc) => (
                  <div key={doc.id} className="border border-border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <FileText className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">{doc.title}</h3>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                            <span>{doc.type}</span>
                            <span>{doc.size}</span>
                            <span className="flex items-center">
                              <Calendar className="h-3 w-3 mr-1" />
                              {doc.uploadedAt}
                            </span>
                            <span className="flex items-center">
                              <span className="w-2 h-2 bg-secondary rounded-full mr-1"></span>
                              {doc.jurisdiction}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                          doc.status === 'processed' 
                            ? 'bg-legal-success/10 text-legal-success' 
                            : 'bg-secondary/10 text-secondary'
                        }`}>
                          {doc.status === 'processed' ? (
                            <>
                              <FileCheck className="h-3 w-3 mr-1 inline" />
                              Processed
                            </>
                          ) : (
                            <>
                              <div className="animate-spin h-3 w-3 border border-secondary border-t-transparent rounded-full mr-1 inline-block"></div>
                              Processing
                            </>
                          )}
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleView(doc.id)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewFullText(doc.id)}
                        >
                          <FileText className="h-4 w-4 mr-1" />
                          Full Text
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(doc.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Documents;