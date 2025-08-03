import React from "react";
import Link from "next/link";
import { socialLinks } from "./socialLinks";
import styles from "./Footer.module.scss";

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={`${styles.footer__holder} container section`}>
        <h3 className="title--05">© Polina Igushkina</h3>
        <div className={styles.footer__socials}>
          {socialLinks.map(({ href, icon: Icon, label }) => (
            <Link
              key={label}
              href={href}
              target="_blank"
              aria-label={label}
              className="button--accent"
            >
              <span>
                <Icon />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
};
