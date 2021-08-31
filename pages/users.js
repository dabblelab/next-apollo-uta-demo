import Head from "next/head";
import styles from "../styles/Main.module.css";
import { gql } from "@apollo/client";
import client from "../apollo-client";
import Link from "next/link";

export async function getServerSideProps() {
	const { data } = await client.query({
		query: gql`
			query GetAllUsers {
				allUsers {
					id
					name
					email
					phone
					dob
					company
				}
			}
		`,
	});

	return {
		props: {
			users: data.allUsers,
		},
	};
}

export default function Users({ users }) {
	return (
		<div className={styles.container}>
			<Head>
				<title>Users</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>
				<h1 className={styles.title}>
					Welcome to <a href="#">Users data!</a>
				</h1>

				<br />
				<small>
					<Link href="/">
						<a>↩️ Back to Home</a>
					</Link>
				</small>
				<br />

				<Link href="/users/add">
					<a>➕ Add a user</a>
				</Link>

				<div className={styles.grid}>
					{users.map((user) => (
						<div key={user.id} className={styles.card}>
							<h3>
								<a
									href="#user-name"
									aria-hidden="true"
									className="aal_anchor"
									id="user-name"
								>
									📌
								</a>
								&nbsp; {user.name}
							</h3>
							<ul>
								<li>
									<p>
										<strong>Email: </strong> {user.email}
									</p>
								</li>
								<li>
									<p>
										<strong>Phone: </strong> {user.phone}
									</p>
								</li>
								<li>
									<p>
										<strong>Address: </strong> {user.address}
									</p>
								</li>
								<li>
									<p>
										<strong>DOB: </strong> {user.dob}
									</p>
								</li>
								<li>
									<p>
										<strong>Company: </strong> {user.company}
									</p>
								</li>
							</ul>

							<br />

							<div>
								{/* <button>✏️ Edit</button> &nbsp; &nbsp; */}
								<button>🗑 Delete</button>
							</div>
							<br />

							<small>
								<strong>ID: </strong> {user.id}
							</small>
						</div>
					))}
				</div>
			</main>
		</div>
	);
}
