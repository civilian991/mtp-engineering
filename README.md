# MTP Engineering Consultancy Website

A modern, bilingual corporate website for MTP Engineering Consultancy built with Next.js 15.5, TypeScript, and Tailwind CSS.

## Features

- **Bilingual Support**: Full English/Arabic support with RTL layout
- **Project Portfolio**: Dynamic filtering system for showcasing projects
- **Career Management**: Job listings and application system
- **Contact Forms**: Multi-purpose inquiry management
- **Admin Dashboard**: Content management system for all site content
- **Performance Optimized**: Built for Lighthouse score >90
- **SEO Ready**: Complete meta tags, sitemap, and structured data
- **Responsive Design**: Mobile-first approach with adaptive layouts

## Tech Stack

- **Framework**: Next.js 15.5 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 3.4
- **Database**: Supabase (PostgreSQL)
- **Icons**: Lucide React
- **Font**: Inter (Google Fonts)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account (for production)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/mtp-engineering/website.git
cd mtp-engineering
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Configure your environment variables:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Project Structure

```
mtp-engineering/
├── app/
│   ├── [locale]/          # Localized routes
│   │   ├── layout.tsx      # Main layout with i18n
│   │   ├── page.tsx        # Homepage
│   │   ├── projects/       # Projects portfolio
│   │   ├── careers/        # Job listings
│   │   └── contact/        # Contact page
│   ├── admin/              # Admin dashboard
│   │   ├── login/          # Admin authentication
│   │   ├── dashboard/      # Overview dashboard
│   │   ├── projects/       # Project management
│   │   ├── careers/        # Career management
│   │   └── inquiries/      # Inquiry management
│   └── api/                # API routes
├── components/
│   ├── ui/                 # Reusable UI components
│   └── layout/             # Layout components
├── lib/
│   ├── i18n.ts            # Internationalization config
│   ├── dictionary.ts       # Translation loader
│   └── dictionaries/       # JSON translation files
├── public/                 # Static assets
└── supabase/              # Database schema
```

## Available Scripts

```bash
# Development
npm run dev          # Start development server

# Build
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run typecheck    # Run TypeScript checks

# Database
npm run db:migrate   # Run database migrations
npm run db:seed      # Seed database with sample data
```

## Admin Access

The admin dashboard is accessible at `/admin`.

Demo credentials:
- Email: admin@mtp.com
- Password: admin123

**Important**: Change these credentials in production!

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Configure environment variables
4. Deploy

### Manual Deployment

1. Build the application:
```bash
npm run build
```

2. Start the production server:
```bash
npm run start
```

### Environment Variables

Production environment variables needed:

- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key
- `DATABASE_URL`: PostgreSQL connection string
- `NEXTAUTH_SECRET`: Secret for authentication (generate with `openssl rand -base64 32`)
- `NEXTAUTH_URL`: Your production URL

## Database Setup

1. Create a new Supabase project
2. Run the schema migration:
```bash
npm run db:migrate
```

3. (Optional) Seed with sample data:
```bash
npm run db:seed
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Performance

The website is optimized for performance with:

- Server-side rendering (SSR)
- Static site generation (SSG) where applicable
- Image optimization with Next.js Image
- Font optimization
- Code splitting
- Lazy loading
- Minification and compression

Target metrics:
- Lighthouse Performance: >90
- Lighthouse Accessibility: >95
- Lighthouse Best Practices: >95
- Lighthouse SEO: 100

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

This project is proprietary software for MTP Engineering Consultancy.

## Support

For support, email support@mtp.com.sa or create an issue in the repository.

---

Built with ❤️ by MTP Engineering Team