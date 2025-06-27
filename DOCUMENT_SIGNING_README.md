# Document Signing Implementation

This document outlines the implementation of the document signing functionality for the contract management application.

## Overview

The document signing system allows users to:

1. Create documents for signing
2. Send unique signing links to multiple parties
3. Capture signatures (drawn or typed) and text
4. Generate final signed PDFs with all signatures embedded

## Architecture

### Database Schema (Convex)

The system uses three main tables:

#### Documents Table

- `id`: Unique document identifier
- `originalPdfUrl`: URL to the original PDF file
- `status`: "pending" or "completed"
- `finalPdfUrl`: URL to the final signed PDF (optional)
- `createdBy`: User who created the document
- `title`: Document title
- `description`: Document description

#### Signers Table

- `id`: Unique signer identifier
- `documentId`: Reference to the document
- `email`: Signer's email address
- `signingToken`: Secure token for signing access
- `status`: "pending" or "signed"
- `signedAt`: Timestamp when signed
- `name`: Signer's name (optional)

#### SignatureData Table

- `id`: Unique signature data identifier
- `signerId`: Reference to the signer
- `pageNumber`: PDF page number (1-indexed)
- `type`: "signature", "text", or "date"
- `data`: Base64 image data or text string
- `positionX`, `positionY`: Position coordinates
- `width`, `height`: Element dimensions

### API Endpoints

#### Convex Functions (`convex/documents.ts`)

1. **`create`** - Create a new document and signers

   - Input: PDF URL, signers array, title, description
   - Output: Document ID and signing links

2. **`getById`** - Get document by ID
3. **`getSignerByToken`** - Validate signing token
4. **`getSignersByDocument`** - Get all signers for a document
5. **`getSignatureDataByDocument`** - Get all signature data
6. **`saveSignature`** - Save signature data and update status
7. **`getPendingDocuments`** - Get documents pending user's signature
8. **`getMyDocuments`** - Get documents created by current user
9. **`generateSignedPdf`** - Generate final signed PDF

#### Next.js API Routes

1. **`/api/documents/[documentId]/download`** - Download signed PDF
   - Merges all signatures onto the original PDF
   - Returns the final signed document

### Frontend Components

#### Signing Page (`/sign/[documentId]`)

- Route: `/sign/[documentId]?token=<signing_token>`
- Validates the signing token
- Shows document details and signing interface
- Prevents re-signing if already completed

#### SigningExperience Component

- PDF viewer (placeholder for now)
- Signature capture (draw or type)
- Date insertion
- Signature placement and management
- Submit functionality

#### Documents Dashboard (`/documents`)

- List of user's documents
- Create new documents
- View document status
- Download completed documents

## Usage Flow

### 1. Creating a Document

1. User navigates to `/documents`
2. Clicks "Create Document"
3. Fills in document details (title, description, PDF URL)
4. Adds signers with email addresses
5. System creates document and generates signing links
6. User can share the signing links with parties

### 2. Signing a Document

1. Signer clicks their unique signing link
2. System validates the token and loads document
3. Signer can see existing signatures from other parties
4. Signer adds their own signatures (draw or type)
5. Signer submits their signatures
6. System updates signer status and checks if all parties have signed
7. If all signed, document status becomes "completed"

### 3. Downloading Signed Document

1. User navigates to completed document
2. Clicks "Download" button
3. System generates final PDF with all signatures embedded
4. User receives the signed PDF

## Security Features

1. **Secure Tokens**: Each signer gets a unique, unguessable token
2. **Token Validation**: All signing operations validate the token
3. **One-time Signing**: Signers cannot modify their signatures after submission
4. **Status Tracking**: Clear tracking of who has signed and when

## Technical Implementation Details

### Signature Capture

- Canvas-based drawing for handwritten signatures
- Text input for typed signatures
- Automatic date insertion
- Position and size tracking

### PDF Generation

- Uses `pdf-lib` for PDF manipulation
- Embeds signature images as PNG
- Adds text signatures with proper positioning
- Maintains PDF quality and structure

### State Management

- Convex for real-time database operations
- React state for UI interactions
- Optimistic updates for better UX

## Future Enhancements

1. **PDF Viewer Integration**: Add actual PDF rendering in the signing interface
2. **Drag & Drop Positioning**: Allow users to drag signatures to exact positions
3. **Email Notifications**: Send email reminders to pending signers
4. **Audit Trail**: Track all signing activities and changes
5. **Template System**: Pre-defined signature positions for common documents
6. **Mobile Support**: Optimize signing experience for mobile devices
7. **Bulk Operations**: Create multiple documents at once
8. **Advanced Authentication**: Integration with digital certificates

## Setup Instructions

1. Ensure Convex is running: `npx convex dev`
2. The schema will be automatically updated with the new tables
3. Navigate to `/documents` to start using the signing functionality
4. Create a test document and try the signing flow

## Environment Variables

Make sure these are set in your environment:

- `NEXT_PUBLIC_APP_URL`: Your application's base URL for generating signing links
- `NEXT_PUBLIC_CONVEX_URL_SITE`: Convex site URL for file operations

## Dependencies

The implementation uses these key dependencies:

- `pdf-lib`: PDF manipulation and generation
- `convex`: Backend database and real-time functionality
- `react`: Frontend framework
- `tailwindcss`: Styling
- `lucide-react`: Icons
- `sonner`: Toast notifications

page-22
parayni->
sign->
height: 45.9
width: 137.7
x: 107.1
y: 529.5304347826087
reduce the x by some
{
by->
size: 15.3
x: 117.81
y: 632.6970434782609
title->
size: 15.3
x: 107.865
y: 605.9144347826086
witness->
size: 15.3
x: 120.105
y: 576.8361739130435
}

client->
sign->
height: 45.9
width: 137.7
x: 100.215
y: 368.0695652173913
{
by->
size: 15.3
x: 78.03
y: 474.29704347826095
title->
size: 15.3
x: 91.035
y: 442.92313043478265
witness->
size: 15.3
x: 100.685
y: 411.5492173913044
}
