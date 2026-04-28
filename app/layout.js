export const metadata = {
  title: 'Golf Rewards Platform',
  description: 'Track scores and support charities',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body className="bg-slate-50 antialiased">{children}</body>
    </html>
  );
}