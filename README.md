# 🌟 Portfolio - Phan Ngọc Thạch

Modern & responsive portfolio website built with Next.js 15, TypeScript, and Tailwind CSS.

[![Next.js](https://img.shields.io/badge/Next.js-15.5.3-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1.0-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.x-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)

## ✨ Features

- 🎨 **Modern UI/UX** - Clean and professional design with smooth animations
- 🌐 **Multi-language** - Vietnamese & English support
- 📱 **Fully Responsive** - Works perfectly on all devices
- 🎭 **Smooth Animations** - Intersection Observer with custom CSS keyframes
- 📧 **Contact System** - Integrated with Supabase for form submissions
- 💬 **Comments Section** - Real-time comments with Supabase
- 🎯 **Scroll Snapping** - Smooth section navigation
- ⚡ **Performance** - Built with Next.js 15 App Router & Turbopack

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 15.5.3 (App Router)
- **UI Library:** React 19.1.0
- **Language:** TypeScript 5.x
- **Styling:** Tailwind CSS v4
- **Animations:** Intersection Observer API + CSS Keyframes

### Backend
- **Database:** Supabase (PostgreSQL)
- **Client:** @supabase/supabase-js ^2.58.0
- **Authentication:** Row Level Security (RLS)

### Development Tools
- **Build Tool:** Turbopack (Next.js)
- **Linting:** ESLint 9
- **Package Manager:** npm

## 🚀 Getting Started

### Prerequisites
- Node.js 18.x or higher
- npm or yarn
- Supabase account (for database features)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Entidagreat/portfolio.git
cd portfolio
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup environment variables**

Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. **Setup database**

Run the SQL scripts in your Supabase SQL Editor:
- `contacts-setup.sql` - Contact form table
- `supabase-setup.sql` - Comments table

5. **Run development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

## 📁 Project Structure

```
portfolio/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API routes
│   │   │   ├── comments/      # Comments endpoints
│   │   │   └── contacts/      # Contacts endpoints
│   │   ├── globals.css        # Global styles & animations
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Home page
│   ├── components/            # React components
│   │   ├── HeroSection.tsx    # Landing section
│   │   ├── AboutSection.tsx   # About/Skills/Education
│   │   ├── ContactSection.tsx # Projects & contact form
│   │   ├── BankingSection.tsx # Payment methods
│   │   ├── CommentsSection.tsx # User comments
│   │   ├── AdminPanel.tsx     # Admin dashboard
│   │   └── navbar.tsx         # Navigation bar
│   ├── contexts/              # React contexts
│   │   └── LanguageContext.tsx # i18n state management
│   └── utils/                 # Utility functions
│       └── translation.ts     # Translation strings
├── public/                    # Static assets
│   ├── images/               # Images & logo
│   └── cv/                   # Resume files
├── contacts-setup.sql         # DB schema for contacts
├── supabase-setup.sql         # DB schema for comments
└── DATABASE_SETUP.md          # Database setup guide
```

## 🎯 Key Sections

1. **Hero** - Introduction with animated name and profile image
2. **About** - Tabbed interface (Skills, Education, Achievements, Personal Brand)
3. **Skills** - Technology showcase with skill categories
4. **Contact** - Project showcase and contact form
5. **Banking** - Payment methods display
6. **Comments** - User feedback section

## 🌐 Deployment

### Deploy on Vercel (Recommended)

1. Push your code to GitHub
2. Import project on [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy!

### Build for Production

```bash
npm run build
npm start
```

## 📝 Database Setup

See [DATABASE_SETUP.md](DATABASE_SETUP.md) for detailed instructions on:
- Creating Supabase tables
- Setting up Row Level Security (RLS)
- Configuring API access

## 🎨 Customization

### Change Colors
Edit `src/app/globals.css` to modify the color scheme.

### Add/Remove Sections
Modify `src/app/page.tsx` and update components in `src/components/`.

### Update Translations
Edit `src/utils/translation.ts` to add/modify translations.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Phan Ngọc Thạch**

- GitHub: [@Entidagreat](https://github.com/Entidagreat)
- Portfolio: [[thachpn](https://portfolio-thachpn.vercel.app/)]

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Database by [Supabase](https://supabase.com/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)

---

⭐ If you like this project, please give it a star on GitHub!
