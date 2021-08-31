import Head from "next/head";
import styles from "../styles/Main.module.css";
import { gql } from "@apollo/client";
import client from "../apollo-client";
import Link from "next/link";

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
	return (
		<div className={styles.container}>
			<Head>
				<title>Covid Data</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>
				<h1 className={styles.title}>
					<a>World Covid Data  </a>
				</h1>

				<br />
				<small>
					<Link href="/">
						<a>↩️ Back to Home</a>
					</Link>
				</small>
				<br />

				<div className={styles.grid}>
					{[...continentData].map((continent) => (
						<div key={continent.continent} className={styles.card}>
							<h3>
								<a
									href="#company-name"
									aria-hidden="true"
									className="aal_anchor"
									id="company-name"
								>
									🌎
								</a>
								&nbsp; {continent.continent}
							</h3>
              <ul>

                {
                  Object.keys(continent).map(keyName => {
                    if (!["countries", "__typename"].includes(keyName)) {
                      return <li>
                      <p>
                        <strong>{keyName}: </strong> {continent[keyName]}
                      </p>
                    </li>
                    }
                  })
                }
								{/* <li>
									<p>
										<strong>Employees Count: </strong> {company.employeesCount}
									</p>
								</li>
								<li>
									<p>
										<strong>Address: </strong> {company.address}
									</p>
								</li> */}
							</ul>
						</div>
					))}
				</div>
			</main>
		</div>
	);
}
