import "./globals.css";
import { Roboto } from "next/font/google";
import React from "react";
// import ReduxProvider from "@/app/ReduxProvider";
import dynamic from "next/dynamic";
const Header = dynamic(() => import("@/components/Header"), { ssr: false });
const ReduxProvider = dynamic(() => import("@/app/ReduxProvider"), {
  ssr: false,
});

const roboto = Roboto({
  weight: ["300", "400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

// const metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({ children }) {
  return (
    <React.StrictMode>
      <html lang="en">
        <body className={roboto.className} suppressHydrationWarning={true}>
          <ReduxProvider>
            <Header />
            {children}
          </ReduxProvider>
        </body>
      </html>
    </React.StrictMode>
  );
}
