import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import PDFViewer from './PDFViewer';
import { openPDF, checkPDFExists } from '@/lib/pdfViewer';

const PDFTestPage: React.FC = () => {
  const [testResults, setTestResults] = useState<string[]>([]);

  const testPDFs = [
    {
      name: 'CV',
      document: {
        url: '/media/documents/cv.pdf'  // Wagtail documents path
      },
      file_type: 'PDF',
      file_size: '1.2 MB'
    },
    {
      name: 'Rules Document',
      document: {
        url: '/media/documents/rules-document.pdf'  // Wagtail documents path
      },
      file_type: 'PDF',
      file_size: '2.5 MB'
    },
    {
      name: 'Test Document',
      document: {
        id: 1  // Test with Wagtail document ID
      },
      file_type: 'PDF',
      file_size: '1.5 MB'
    }
  ];

  const testPDFAccess = async () => {
    const results: string[] = [];
    
    for (const pdf of testPDFs) {
      try {
        const exists = await checkPDFExists(pdf.document?.url || '');
        results.push(`${pdf.name}: ${exists ? '✅ Found' : '❌ Not Found'}`);
      } catch (error) {
        results.push(`${pdf.name}: ❌ Error - ${error}`);
      }
    }
    
    setTestResults(results);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>PDF Viewer Test Page</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">Test PDF Access</h3>
            <Button onClick={testPDFAccess} className="mb-4">
              Test PDF Files
            </Button>
            
            {testResults.length > 0 && (
              <div className="bg-gray-100 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Test Results:</h4>
                <ul className="space-y-1">
                  {testResults.map((result, index) => (
                    <li key={index} className="text-sm">{result}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Test PDF Viewers</h3>
            <div className="space-y-4">
              {testPDFs.map((pdf, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">{pdf.name}</h4>
                    <p className="text-sm text-gray-600">
                      {pdf.file_type} • {pdf.file_size}
                    </p>
                  </div>
                  <PDFViewer document={pdf} />
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Direct PDF Links</h3>
            <div className="space-y-2">
              <Button 
                variant="outline" 
                onClick={() => openPDF({ name: 'CV', document: { url: '/media/documents/cv.pdf' } })}
              >
                Open CV.pdf from Wagtail documents
              </Button>
              <Button 
                variant="outline" 
                onClick={() => window.open('/media/documents/cv.pdf', '_blank')}
              >
                Open CV.pdf directly (Wagtail path)
              </Button>
              <Button 
                variant="outline" 
                onClick={() => window.open('/media/rules/cv.pdf', '_blank')}
              >
                Open CV.pdf from rules folder (fallback)
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PDFTestPage;
