'use client';

import styles from "./header.module.scss";
import stylesLayout from "../../layout.module.scss";
import Link from "next/link";

export default function Header() {

    return (
        <header>
            <div className={`${stylesLayout.container} ${stylesLayout.container_header}`}>
                <div className={styles.header}>
                    <Link href='/'>
                        <div className={styles.header__logoAndTitle}>
                            <img
                                className={styles.header__logo}
                                src={'/images/kgeu-logo.png'}
                                alt={'kgeu-logo'}
                            />

                            <span className={styles.header__title}>Retab</span>
                        </div>
                    </Link>

                    <div className={styles.header__links}>
                        <Link href={'/profile'}>
                            <span className={styles.header__link}>Личный кабинет</span>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}
