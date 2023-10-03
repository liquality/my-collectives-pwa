
import styles from "../styles/Home.module.css";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import ChatIcon from "../public/images/chat-icon.svg";
import GearIcon from "../public/images/gear-icon.svg";

export default function AppNavbar() {
  return (
    <Navbar
      fixed="bottom"
      bg="dark"
      data-bs-theme="dark"
      expand="lg"
      className="bg-body-tertiary"
    >
      <Container>
        <Link href="/" className={styles.navIcon}>
          <Image src={ChatIcon} alt="" width={46} height={46} />
        </Link>
        <Link href="/settings" className={styles.navIcon}>
          <Image src={GearIcon} alt="" width={46} height={46} />
        </Link>
      </Container>
    </Navbar>
  );
}
