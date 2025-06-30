import "./globals.css";

export const metadata = {
  title: "Sander Aesthetics",
  description: "Redefining Beauty, One Treatment at a Time",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
