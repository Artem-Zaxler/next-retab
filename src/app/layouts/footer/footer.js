import styles from "./footer.module.scss";
import stylesLayout from "../../layout.module.scss";

export default function Footer() {
    return (
        <footer>
            <div className={stylesLayout.container}>
                <div className={styles.footer}>
                    <h1 className={styles.footer__title}>Made by Retab Team</h1>
                </div>
            </div>
        </footer>
    );
}
