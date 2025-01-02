import styles from "./header.module.scss";
import stylesLayout from "../../layout.module.scss";

export default function Header() {
    return (
        <header>
            <div className={stylesLayout.container}>
                <div className={styles.header}>
                    <img
                        className={styles.header__logo}
                        src={'/images/kgeu-logo.png'}
                        alt={'kgeu-logo'}
                    />

                    <h1 className={styles.header__title}>Retab</h1>
                </div>
            </div>
        </header>
    );
}
