'use client';

import { useEffect, useState } from 'react';
import styles from "./header.module.scss";
import stylesLayout from "../../layout.module.scss";
import Link from "next/link";
import useMedia from "../../../hooks/useMedia";

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { isMobile } = useMedia();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    useEffect(() => {
        console.log(isMobile)
    }, [isMobile]);

    return (
        <header>
            <div
                className={`${stylesLayout.container} ${stylesLayout.container_header}
                    ${isScrolled ? stylesLayout.container_header_scrolled : ''}`}
            >
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
                    {isMobile ? (
                        <>
                            <div className={styles.header__burger} onClick={toggleMenu}>
                                <span className={styles.header__burgerLine}></span>
                                <span className={styles.header__burgerLine}></span>
                                <span className={styles.header__burgerLine}></span>
                            </div>
                            {isMenuOpen && (
                                <div className={styles.header__mobileMenu}>
                                    <Link href={'/profile'}>
                                        <span className={styles.header__link}>Личный кабинет</span>
                                    </Link>
                                    <Link href={'/'}>
                                        <span className={styles.header__link}>Расписание</span>
                                    </Link>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className={styles.header__links}>
                            <Link href={'/profile'}>
                                <span className={styles.header__link}>Личный кабинет</span>
                            </Link>
                            <Link href={'/'}>
                                <span className={styles.header__link}>Расписание</span>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;
