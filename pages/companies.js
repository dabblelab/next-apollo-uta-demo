import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Companies.module.css";
import { gql } from "@apollo/client";
import client from "../apollo-client";
import Link from "next/link";

export async function getServerSideProps() {
	const { data } = await client.query({
		query: gql`
			query GetAllCompanies {
				allCompanies {
					id
					name
					website
					address
					employeesCount
				}
			}
		`,
	});

	return {
		props: {
			companies: data.allCompanies,
		},
	};
}

export default function Companies({ companies }) {
	return (
		<div className={styles.container}>
			<Head>
				<title>Companies</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>
				<h1 className={styles.title}>
					Welcome to <a href="#">Companies data!</a>
				</h1>

				<br />
				<small>
					<Link href="/">
						<a>↩️ Back to Home</a>
					</Link>
				</small>
				<br />

				<div className={styles.grid}>
					{companies.map((company) => (
						<div key={company.id} className={styles.card}>
							<h3>
								<a
									href="#company-name"
									aria-hidden="true"
									className="aal_anchor"
									id="company-name"
								>
									📌
								</a>
								&nbsp; {company.name}
							</h3>
							<ul>
								<li>
									<p>
										<strong>Website: </strong>{" "}
										<a href={company.website}>{company.website}</a>
									</p>
								</li>
								<li>
									<p>
										<strong>Employees Count: </strong> {company.employeesCount}
									</p>
								</li>
								<li>
									<p>
										<strong>Address: </strong> {company.address}
									</p>
								</li>
							</ul>
							<small>
								<strong>🆔 </strong> {company.id}
							</small>

							<br />
							<br />

							<div>
								<button>✏️ Edit</button> &nbsp; &nbsp;
								<button>🗑 Delete</button>
							</div>
						</div>
					))}
				</div>
			</main>
		</div>
	);
}
