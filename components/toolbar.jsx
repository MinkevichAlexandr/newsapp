import React from "react";
import styles from "../styles/Toolbar.module.css";
import { useRouter } from "next/router";
import clsx from "clsx";

export default function Toolbar() {
  const router = useRouter();
  return (
    <header className={styles.toolbarContainer}>
      <ul className={styles.toolbar}>
        <li
          className={clsx(
            styles.toolbarItem,
            router.route === "/" && styles.active
          )}
          onClick={() => router.push("/")}
        >
          Main
        </li>
        <li
          className={clsx(
            styles.toolbarItem,
            router.route.includes("feed") && styles.active
          )}
          onClick={() => router.push("/feed/1")}
        >
          Feed
        </li>
        <li
          className={clsx(
            styles.toolbarItem,
            router.route === "/about" && styles.active
          )}
          onClick={() => router.push("/about")}
        >
          About
        </li>
      </ul>
    </header>
  );
}
