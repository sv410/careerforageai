
# CareerForge AI

A modern AI-powered career development platform built with Next.js, TypeScript, and Tailwind CSS. This application helps users navigate their career journey with intelligent insights and personalized recommendations.

## 🚀 Features

- **AI-Powered Career Insights** - Get personalized career recommendations and insights
- **Modern UI/UX** - Built with shadcn/ui components and Tailwind CSS
- **Authentication System** - Secure user authentication and protected routes
- **File Upload** - Upload and manage career-related documents
- **Responsive Design** - Works seamlessly across all devices
- **Dark/Light Mode** - Toggle between themes for better user experience
- **Dashboard** - Comprehensive user dashboard with career analytics

## 🛠️ Tech Stack

- **Framework:** Next.js 15+ with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **State Management:** React Hooks
- **Authentication:** Next.js middleware-based auth
- **Package Manager:** PNPM

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/sv410/careerforageai.git
cd careerforageai
```

2. Install dependencies:
```bash
pnpm install
```

3. Run the development server:
```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Project Structure

```
careerforageai/
├── app/                    # Next.js App Router
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Dashboard pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── middleware.ts      # Route protection
│   └── page.tsx           # Home page
├── components/            # Reusable components
│   ├── ui/               # shadcn/ui components
│   ├── auth-provider.tsx
│   ├── file-upload.tsx
│   ├── protected-route.tsx
│   ├── theme-provider.tsx
│   └── theme-toggle.tsx
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── public/               # Static assets
└── styles/               # Additional styles
```

## 🚀 Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

## 🎨 UI Components

This project uses [shadcn/ui](https://ui.shadcn.com/) for consistent and beautiful UI components:

- Accordion, Alert Dialog, Avatar
- Button, Card, Calendar
- Dialog, Dropdown Menu, Form
- Input, Select, Table, Tabs
- Toast notifications
- And many more...

## 🔐 Authentication

The application includes a complete authentication system with:
- Protected routes using Next.js middleware
- Auth provider for state management
- Login/logout functionality
- Route-based access control

## 📱 Responsive Design

Built with mobile-first approach using Tailwind CSS breakpoints:
- Mobile: 320px+
- Tablet: 768px+
- Desktop: 1024px+
- Large Desktop: 1280px+

## 🌙 Theme Support

Includes built-in dark/light mode toggle with:
- System preference detection
- Persistent theme selection
- Smooth transitions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**sv410**
- GitHub: [@sv410](https://github.com/sv410)
- Repository: [careerforageai](https://github.com/sv410/careerforageai)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [shadcn/ui](https://ui.shadcn.com/) for beautiful UI components
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [Vercel](https://vercel.com/) for hosting and deployment

---

Made with ❤️ for the future of career development# careerforageai
