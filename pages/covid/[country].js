import Head from "next/head";
import styles from "../../styles/Main.module.css";
import Link from "next/link";

import { gql } from "@apollo/client";
import client from "../../apollo-client";

export async function getServerSideProps({ params }) {
	const { country } = params;

	const { data } = await client.query({
		query: gql`
			query{
				getCovidDataOfCountry(country: "${country}") {
					active
					recovered
					critical
					deaths

					todayCases
					casesPerOneMillion

					tests

					continent
					countryInfo {
						flag
					}
				}
			}
		`,
	});

	return {
		props: {
			countryName: country,
			data: data.getCovidDataOfCountry,
		},
	};
}

export default function Country({ countryName, data }) {
	console.log(data);
	return (
		<div className={styles.container}>
			<Head>
				<title>Next-graphql demo</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className={styles.main}>
				<h1 className={styles.title}>{countryName}</h1>

				<div className={styles.covidContainer}>
					<div className="leftBox">
						<img src={data.countryInfo.flag} alt="Picture of the flag" />
					</div>

					<div className="rightBox">
						<div className={styles.covidCard}>
							<ul>
								{Object.keys(data).map((keyName, index) => {
									if (!["countryInfo", "__typename"].includes(keyName)) {
										return (
											<li key={keyName}>
												<p>
													<strong>{keyName}: </strong> {data[keyName]}
												</p>
											</li>
										);
									}
								})}
							</ul>
						</div>
					</div>
				</div>
			</main>

			<footer className={styles.footer}>
				<small>
					<Link href="/">
						<a>↩️ Back to Home</a>
					</Link>
				</small>
			</footer>
		</div>
	);
}
