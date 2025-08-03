"use client";
import styles from "./CardSkeleton.module.scss";

export const CardSkeleton = () => {
  return (
    <div className={styles.skeleton}>
      <div className={styles.header}>
        <div className={styles.title} />
        <div className={styles.icon} />
      </div>
      <div className={styles.main}>
        <div className={styles.line} />
        <div className={styles.line} />
        <div className={styles.line} />
      </div>
      <div className={styles.updateBtn} />
    </div>
  );
};
