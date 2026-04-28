# Golf Rewards Platform

A high-performance full-stack MVP built for the Digital Heroes technical assessment.

## Features Implemented
- **Rolling 5 Logic:** System automatically displays only the 5 most recent scores using Supabase query modifiers.
- **Duplicate Prevention:** Prevents multiple score entries for the same date per user.
- **Modern UI:** Built with Next.js and Tailwind CSS, following a premium dark/light aesthetic.
- **Clean Architecture:** Uses App Router and logical path separation.

## Setup Instructions
1. Clone the repository.
2. Install dependencies: `npm install`.
3. Set environment variables in Vercel/Local:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Build the project: `npm run build`.

## Tech Stack
- Framework: Next.js 14
- Database: Supabase
- Styling: Tailwind CSS