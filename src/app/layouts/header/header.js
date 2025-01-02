import styles from "./header.module.scss";

export default function Header() {
    return (
        <header className={styles.header}>
            <img
                className={styles.header__logo}
                src={'/kgeu-logo.png'}
                alt={'kgeu-logo'}
            />

            <h1 className={styles.header__title}>Retab</h1>
        </header>
    );
}
