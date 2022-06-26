import styles from "./navbar.module.scss";
import Link from "next/link";
import Search from "components/Icons/Search";
import Create from "components/Icons/Create";
import HomeIcon from "components/Icons/HomeIcon";

export default function Navbar() {
  return (
    <nav className={styles.nav}>
      <Link href="/home">
        <a>
          <HomeIcon width={32} height={32} stroke="#09f" />
        </a>
      </Link>
      <Link href="/search">
        <a>
          <Search width={32} height={32} stroke="#09f" />
        </a>
      </Link>
      <Link href="/compose/tweet">
        <a>
          <Create width={32} height={32} stroke="#09f" />
        </a>
      </Link>
    </nav>
  );
}
