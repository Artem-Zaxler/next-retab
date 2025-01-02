import "./globals.css";
import Header from "./layouts/header/header";
import Footer from "./layouts/footer/footer";

export default function RootLayout({children}) {
    return (
        <html lang="ru">
        <body>
        <Header />
        {children}
        <Footer />
        </body>
        </html>
    );
}
