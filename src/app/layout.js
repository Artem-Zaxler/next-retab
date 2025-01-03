import "./globals.css";
import Header from "./layouts/header/header";
import Footer from "./layouts/footer/footer";
import styles from "./layout.module.scss";

export default function RootLayout({children}) {

    return (
        <html lang="ru">
        <body>
        <Header/>
        <main>
            <div className={`${styles.container} ${styles.container_mainPage}`}>
                {children}
            </div>
        </main>
        <Footer/>
        </body>
        </html>
    );
}
