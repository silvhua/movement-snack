import "./globals.scss";

export const metadata = {
  title: "Movement Snack App",
  description: "Get stronger in just 30 seconds",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
          {children}
      </body>
    </html>
  );
}
