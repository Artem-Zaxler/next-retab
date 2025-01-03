import "./globals.css";
import Header from "./layouts/header/header";
import Footer from "./layouts/footer/footer";
import styles from "./layout.module.scss";

const RootLayout = ({children}) => {
    return (
        <html lang="ru">
        <body>
        <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1" />
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

export default RootLayout;
