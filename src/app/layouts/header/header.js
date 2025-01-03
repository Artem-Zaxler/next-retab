'use client';

import React, {useEffect, useState} from 'react';
import styles from "./header.module.scss";
import stylesLayout from "../../layout.module.scss";
import Link from "next/link";
import useMedia from "../../../hooks/useMedia";
import Image from 'next/image';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const {isMobile} = useMedia();

    useEffect(() => {
        if (!isMobile) {
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
        } else {
            setIsScrolled(true);
        }
    }, []);

    return (
        <header>
            <div
                className={`${stylesLayout.container} ${stylesLayout.container_header}
                    ${isScrolled || isMobile ? stylesLayout.container_header_scrolled : ''}`}
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
                        <div className={styles.header__links}>
                            <Link href={'/'}>
                                <Image
                                    width={32}
                                    height={32}
                                    className={styles.header__logo}
                                    src={'/svg/schedule.svg'}
                                    alt={'schedule'}
                                />
                            </Link>

                            <Link href={'/profile'}>
                                <Image
                                    width={32}
                                    height={32}
                                    className={styles.header__logo}
                                    src={'/svg/personal_account.svg'}
                                    alt={'personal_account'}
                                />
                            </Link>
                        </div>
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
