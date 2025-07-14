# 👓 Personhood `Context`

🔍 **AI-powered face recognition and person identification system** built with Convex

## 🚀 What it does

This application provides an intelligent pipeline for identifying people in uploaded images:

1. 📸 **Image Upload** - Accepts images via HTTP endpoint
2. 🤖 **Face Recognition** - Uses FaceCheck API to find similar faces across the web  
3. 🌐 **Web Analysis** - Analyzes top results using Exa API to extract context
4. 👤 **Name Extraction** - Identifies human names from relevant web pages
5. 📊 **Smart Ranking** - Filters and ranks results by relevance score

## 🛠️ Architecture

### HTTP Endpoints
- `POST /process` - Upload images for face recognition analysis

### Core Workflow
```
Image Upload → Face Recognition → Web Search → Name Extraction → Results
```

### Database Schema
- `received` - Stores uploaded image metadata
- `faceCheck` - Maps images to FaceCheck search IDs  
- `faceCheckUrls` - Stores recognition results with confidence scores

## 🔧 Setup

### Environment Variables
```bash
EXA_API_KEY=your_exa_api_key
FACECHECK_TOKEN=your_facecheck_token
```

### Dependencies
- **FaceCheck API** - Face recognition service
- **Exa API** - Web content analysis and extraction
- **Convex** - Backend infrastructure

## 📡 API Usage

Upload an image for analysis:
```bash
curl -X POST http://your-convex-site.convex.cloud/process \
  -F "image=@path/to/image.jpg"
```

## 🎯 Key Features

- ⚡ **Real-time Processing** - Instant image analysis pipeline
- 🎯 **Smart Filtering** - Excludes social media URLs for better results  
- 📈 **Confidence Scoring** - Ranks results by recognition confidence
- 🔒 **Secure Storage** - Images stored in Convex file storage
- 🌊 **Async Processing** - Non-blocking background operations

## 🏗️ Built With

- [Convex](https://convex.dev) - Backend framework
- [FaceCheck.id](https://facecheck.id) - Face recognition API
- [Exa](https://exa.ai) - Web search and extraction API
- TypeScript - Type-safe development 