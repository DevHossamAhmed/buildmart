import "./globals.css";
import TopLoaderProvider from "@/components/TopLoaderProvider";

export const metadata = {
  title: "Buildmart",
  icons: {
    icon: "/assets/images/logo.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="mdl-js">
      <body>
        <TopLoaderProvider />

        {children}
      </body>
    </html>
  );
}
