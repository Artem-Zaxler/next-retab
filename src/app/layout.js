import "./globals.css";
import Header from "./layouts/header/header";

export default function RootLayout({children}) {
    return (
        <html lang="ru">
        <body>
        <Header />
        {children}

        </body>
        </html>
    );
}
