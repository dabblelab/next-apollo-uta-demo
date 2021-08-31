import Head from "next/head";
import styles from "../styles/Main.module.css";
import { gql } from "@apollo/client";
import client from "../apollo-client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from 'next/router'

export async function getServerSideProps() {
	const { data } = await client.query({
		query: gql`
			query GetAllCovidData {
				getAllCovidData {
					continent
					cases
					deaths
					active
					tests
					critical
					recovered
					countries
				}
			}
		`,
	});

	return {
		props: {
			continentData: data.getAllCovidData,
		},
	};
}

export default function Companies({ continentData }) {
  const [query, setQuery] = useState("");
  const router = useRouter()

  const handleSearch = () => {
    const searchQuery = query.trim();

    router.push("/covid/"+searchQuery);
  }

	return (
		<div className={styles.container}>
			<Head>
				<title>Covid Data</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>
				<h1 className={styles.title}>
					<a>World Covid Data </a>
				</h1>

				<br />
				<small>
					<Link href="/">
						<a>↩️ Back to Home</a>
					</Link>
				</small>
				<br />

				<div className={styles.searchContainer}>
					<input
						className={styles.searchInput}
						placeholder="Enter a country name to search"
						value={query}
						onChange={(e) => setQuery(e.target.value)}
					/>
					&nbsp;&nbsp;<button onClick={handleSearch}>🔍 Search</button>
				</div>

				<div className={styles.grid}>
					{[...continentData].map((continent) => (
						<div key={continent.continent} className={styles.card}>
							<h2>
								<a
									href="#company-name"
									aria-hidden="true"
									className="aal_anchor"
									id="company-name"
								>
									🌎
								</a>
								&nbsp; {continent.continent}
							</h2>
							<ul>
								{Object.keys(continent).map((keyName,index) => {
									if (!["countries", "__typename"].includes(keyName)) {
										return (
											<li key={keyName}>
												<p>
													<strong>{keyName}: </strong> {continent[keyName]}
												</p>
											</li>
										);
									}
								})}
							</ul>
						</div>
					))}
				</div>
			</main>
		</div>
	);
}
