import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Header.module.scss";

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={`${styles.header__holder} container`}>
        <Link href="/">
          <Image
            src="/images/logo.svg"
            alt="Weather App Logo"
            width={50}
            height={50}
          />
        </Link>
        <span className="title--05">Your personal weather dashboard</span>
      </div>
    </header>
  );
};
