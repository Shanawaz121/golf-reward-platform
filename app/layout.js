import './globals.css';

export const metadata = {
  title: 'Golf Rewards Platform',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}