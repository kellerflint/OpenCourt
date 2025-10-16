import Navbar from "./components/Navbar.jsx"; 
import "./globals.css";

//layout page 

export const metadata = {
  title: "Open Court",
  description: "Find Open Pick Up Games",
  icons: {
    icon: "/favicon.ico", 
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {}
      <body>
        <Navbar /> 
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}