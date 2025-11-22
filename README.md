# Sherlock Holmes Investigation System

A modern web application that leverages AI to conduct property investigations in the style of Sherlock Holmes. Built with Next.js, TypeScript, and integrated with multiple AI providers for intelligent analysis.

## 🕵️ Features

- **AI-Powered Investigation**: Utilizes Exa search and Groq models for intelligent property analysis
- **Code Execution**: Integrated with E2B for secure code execution environments
- **Modern UI**: Built with Tailwind CSS for a responsive, professional interface
- **TypeScript**: Full type safety for robust development
- **RESTful API**: Server-side API routes for secure backend operations

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, PostCSS
- **AI Integration**: 
  - Exa API (for web search)
  - Groq SDK (for AI analysis)
  - Model Context Protocol (MCP) SDK
- **Code Execution**: E2B API
- **Environment**: dotenv for configuration management

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn package manager
- API keys for AI services (see Environment Variables below)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd SherlockHolmes
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```
Edit `.env.local` with your actual API keys.

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📝 Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
EXA_API_KEY=your_exa_api_key_here
GROQ_API_KEY=your_groq_api_key_here
E2B_API_KEY=your_e2b_api_key_here
```

### Required API Keys

- **Exa API**: For intelligent web search and evidence gathering
- **Groq API**: For fast AI-powered analysis and email generation
- **E2B API**: Secure code execution environment with MCP integration

## 📁 Project Structure

```
SherlockHolmes/
├── components/          # React components
│   ├── PropertyForm.tsx    # Property input form
│   └── ResultsDisplay.tsx  # Investigation results display
├── pages/              # Next.js pages and API routes
│   ├── api/               # Backend API endpoints
│   │   └── investigate.ts  # Investigation API handler
│   ├── _app.tsx           # Next.js app configuration
│   └── index.tsx          # Main application page
├── styles/             # Global styles
├── .env.example        # Environment variable template
├── .gitignore          # Git ignore file
├── package.json        # Project dependencies and scripts
├── tailwind.config.js  # Tailwind CSS configuration
└── tsconfig.json       # TypeScript configuration
```

## 🎯 Usage

1. **Property Investigation**: Enter property details in the investigation form
2. **AI Analysis**: The system analyzes the property using multiple AI models
3. **Results Display**: View comprehensive investigation results with insights
4. **Code Execution**: Optional code analysis through secure E2B environments

## 🧪 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔍 Built With

- [Next.js](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Exa](https://exa.ai/) - Intelligent web search
- [Groq](https://groq.com/) - Fast AI inference
- [E2B](https://e2b.dev/) - Code execution platform

---

*Elementary, my dear Watson!* 🕵️♂️
