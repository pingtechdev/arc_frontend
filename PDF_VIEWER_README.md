# PDF Viewer Implementation

This document explains how the PDF viewing functionality works in the ARC Frontend application.

## 🎯 Overview

The PDF viewer allows users to view and download PDF documents from the Rules Documents section. It supports multiple fallback mechanisms to ensure PDFs are accessible.

## 📁 File Structure

```
src/
├── lib/
│   ├── pdfViewer.ts          # Core PDF viewing utilities
│   └── mediaConfig.ts        # Media file configuration
├── components/
│   ├── PDFViewer.tsx         # Enhanced PDF viewer component
│   ├── RulesSection.tsx      # Rules section with PDF integration
│   └── PDFTestPage.tsx       # Test page for PDF functionality
```

## 🔧 How It Works

### 1. PDF URL Resolution

The system tries to find PDFs in this order:

1. **Wagtail Document URL** - Direct URL from Wagtail CMS API
2. **Wagtail Document ID** - Fetches document URL via API (`/api/v2/documents/{id}/`)
3. **CMS File URL** - File path from CMS
4. **Wagtail Documents Folder** - `/media/documents/{filename}.pdf` (primary)
5. **Rules Folder Fallback** - `/media/rules/{filename}.pdf` (secondary)
6. **Multiple Fallback URLs** - Tries different server configurations

### 2. Media Configuration

```typescript
// Default configuration
const MEDIA_CONFIG = {
  BASE_URL: 'http://localhost:8000',  // CMS server URL
  DOCUMENTS_PATH: '/media/documents/', // Wagtail documents path
  RULES_PATH: '/media/rules/',        // Rules PDFs path (fallback)
  WAGTAIL_API_BASE: '/api/v2/',       // Wagtail API base
  DOCUMENTS_API: '/api/v2/documents/', // Wagtail documents API
  FALLBACK_URLS: [                    // Fallback URLs to try
    '/media/documents/',              // Primary: Wagtail documents
    '/media/rules/',                  // Secondary: Rules folder
    'http://localhost:8000/media/documents/',
    'http://localhost:8000/media/rules/',
    'https://your-cms-domain.com/media/documents/',
    'https://your-cms-domain.com/media/rules/'
  ]
};
```

### 3. PDF Viewer Component

The `PDFViewer` component provides:

- **View Button** - Opens PDF in new tab
- **Download Button** - Downloads PDF file
- **Loading State** - Shows loading spinner while checking
- **Error Handling** - Displays error if PDF not found

## 🚀 Usage

### Basic Usage

```tsx
import PDFViewer from '@/components/PDFViewer';

// Wagtail document from CMS
const document = {
  name: 'CV',
  document: {
    url: 'http://localhost:8000/documents/cv.pdf',  // Wagtail document URL
    id: 1  // Wagtail document ID
  },
  file_type: 'PDF',
  file_size: '1.2 MB'
};

<PDFViewer document={document} />
```

### Advanced Usage

```tsx
import { openPDF, getPDFUrl, fetchWagtailDocument, getWagtailDocumentUrl } from '@/lib/pdfViewer';

// Open PDF programmatically
await openPDF(document);

// Get PDF URL
const pdfUrl = getPDFUrl(document);

// Fetch document from Wagtail API
const doc = await fetchWagtailDocument(documentId);

// Get document URL from Wagtail API
const url = await getWagtailDocumentUrl(documentId);
```

## 📂 Media Files Structure

### Wagtail CMS Structure

Documents uploaded through Wagtail CMS will be stored in:

```
media/documents/
├── cv.pdf
├── rules-document.pdf
└── other-pdfs.pdf
```

### Fallback Structure

For fallback files, organize like this:

```
media/
└── rules/
    ├── cv.pdf
    ├── rules-document.pdf
    └── other-pdfs.pdf
```

## 🔧 Configuration

### Environment Variables

Set these in your `.env.local` file:

```env
VITE_CMS_API_URL=http://localhost:8000
```

### CMS Configuration

Ensure your Django CMS serves media files:

```python
# settings.py
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

# urls.py
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
```

## 🧪 Testing

### Test Page

Use the `PDFTestPage` component to test PDF functionality:

```tsx
import PDFTestPage from '@/components/PDFTestPage';

// Add to your routes or use directly
<PDFTestPage />
```

### Manual Testing

1. **Check PDF Access**: The test page will verify if PDFs are accessible
2. **Test Viewing**: Click the eye icon to open PDFs in new tabs
3. **Test Download**: Click the download icon to download PDFs
4. **Check Fallbacks**: Test with different server configurations

## 🐛 Troubleshooting

### Common Issues

1. **PDF Not Found**
   - Check if file exists in `media/documents/` folder (Wagtail documents)
   - Check if file exists in `media/rules/` folder (fallback)
   - Verify filename matches exactly (case-sensitive)
   - Check CMS media serving configuration

2. **CORS Errors**
   - Ensure CMS allows CORS for your frontend domain
   - Check `CORS_ALLOWED_ORIGINS` in Django settings

3. **Network Errors**
   - Verify `VITE_CMS_API_URL` is correct
   - Check if CMS server is running
   - Test direct URL access in browser

### Debug Steps

1. **Check Console**: Look for error messages in browser console
2. **Test Direct URLs**: Try accessing PDF URLs directly
3. **Check Network Tab**: See if requests are failing
4. **Verify File Exists**: Check if PDF files are in the correct location

## 🔒 Security

- PDFs open in new tabs with `noopener,noreferrer` for security
- File downloads use proper MIME types
- Error messages don't expose sensitive information

## 📈 Performance

- PDF existence is checked before opening
- Multiple fallback URLs are tried efficiently
- Loading states provide user feedback
- Error handling prevents crashes

## 🎨 Customization

### Styling

The PDF viewer uses Tailwind CSS classes:

```tsx
className="hover:bg-red-50 hover:text-red-600 transition-colors"
```

### Icons

Uses Lucide React icons:

- `Eye` - View PDF
- `Download` - Download PDF
- `AlertCircle` - Error state

## 📝 Notes

- **Primary**: PDFs uploaded through Wagtail CMS are stored in `media/documents/` folder
- **Fallback**: PDFs can also be placed in `media/rules/` folder as fallback
- Filenames are automatically cleaned (spaces to hyphens, lowercase)
- The system tries multiple fallback URLs for reliability
- Wagtail document IDs can be used to fetch documents via API
- All operations are asynchronous for better user experience
