import Head from "next/head";
import styles from "../../styles/Main.module.css"
import Link from "next/link";

export default function Country() {
	return (
		<div className={styles.container}>
			<Head>
				<title>Next-graphql demo</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className={styles.main}>
				<h1 className={styles.title}>
					Country
        </h1>

			</main>

			<footer className={styles.footer}>
				<p>Powered by Next.js + GraphQl</p>
			</footer>
		</div>
	);
}
