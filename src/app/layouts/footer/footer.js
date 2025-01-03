import styles from "./footer.module.scss";
import stylesLayout from "../../layout.module.scss";

export default function Footer() {
    return (
        <footer>
            <div className={`${stylesLayout.container} ${stylesLayout.container_footer}`}>
                <div className={styles.footer}>
                    <span className={styles.footer__title}>Made by Retab Team</span>
                </div>
            </div>
        </footer>
    );
}
