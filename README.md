# 🔮 MbotixTECH Generator

A premium, privacy-focused Gmail dot trick generator built with modern web technologies. Create thousands of email aliases instantly for testing, development, or managing multiple accounts.

![Project Preview](https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop)

## ✨ Features

- **🎨 Premium UI/UX**: Glassmorphism design with smooth animations and a "Cyberpunk/Nebula" aesthetic.
- **⚡ Blazing Fast**: Generates up to 1,000,000 emails in seconds using optimized algorithms.
- **🛡️ Privacy First**: All generation happens client-side. No data ever leaves your browser.
- **🔧 Advanced Methods**:
  - **Dot Trick**: Randomly inserts dots (e.g., `m.b.o.t.doe@gmail.com`).
  - **Plus Trick**: Appends numeric suffixes (e.g., `mbotixtech+666@gmail.com`).
  - **Case Randomization**: Mixes uppercase/lowercase for username and domain.
- **💾 Smart Persistence**:
  - **History**: Automatically saves generated emails.
  - **Templates**: Save your favorite configuration presets.
- **📦 Bulk Export**: Generate massive lists and export to `.txt` instantly.

## 🛠️ Tech Stack

- **Core**: [React 18](https://reactjs.org/) + [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/gmail-dottrick.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

## 📂 Project Structure

```
src/
├── components/
│   ├── features/    # Core logic components (Generator, History)
│   ├── ui/          # Reusable UI primitives (Button, Card, Input)
│   └── Layout.tsx   # Main layout wrapper
├── hooks/           # Custom React hooks (useEmailGenerator)
├── types/           # TypeScript definitions
├── App.tsx          # Main application entry
└── main.tsx         # DOM renderer
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.