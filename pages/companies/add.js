import Head from "next/head";
import styles from "../../styles/Main.module.css";
import { gql, useMutation } from "@apollo/client";
import client from "../../apollo-client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

export default function AddCompany() {
	const [name, setName] = useState("");
	const [website, setWebsite] = useState("");
	const [address, setAddress] = useState("");
	const [employeesCount, setEmployeesCount] = useState(0);

	const router = useRouter();

	const ADD_COMPANY_MUTATION = gql`
		mutation addACompany(
			$name: String!
			$website: String!
			$address: String!
			$employeesCount: Int!
		) {
			addCompany(
				company: {
					name: $name
					website: $website
					address: $address
					employeesCount: $employeesCount
				}
			) {
        id
        name
        website
        address
        employeesCount
			}
		}
	`;

	const [executeAddCompany, { data, loading, error }] = useMutation(
		ADD_COMPANY_MUTATION,
		{
			// refetchQueries: [
			// 	"GetAllCompanies", // Refetch all company data
			// ],
			onCompleted: (data) => router.push("/companies")
		}
	);

	const handleSubmit = () => {
		executeAddCompany({
			variables: {
				name,
				website,
				address,
				employeesCount: parseInt(employeesCount),
			},
		}).then(() => {
			console.log("submitted");
			// router.push("/companies");
		});
	};

	if (error) return `Submission error! ${error.message}`;

	return (
		<div className={styles.container}>
			<Head>
				<title>Add Companies</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>
				<h1 className={styles.title}>Add a company</h1>

				<br />
				<small>
					<Link href="/companies">
						<a>↩️ Back to Companies</a>
					</Link>
				</small>
				<br />

				{loading ? (
					"Submitting..."
				) : (
					<div className={styles.formContainer}>
						<label htmlFor="name">Name of the company</label>
						<br />
						<input
							id="name"
							type="text"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
						<br />
						<br />

						<label htmlFor="website">Website</label>
						<br />
						<input
							id="website"
							type="text"
							value={website}
							onChange={(e) => setWebsite(e.target.value)}
						/>
						<br />
						<br />

						<label htmlFor="address">Address</label>
						<br />
						<input
							id="address"
							type="text"
							value={address}
							onChange={(e) => setAddress(e.target.value)}
						/>
						<br />
						<br />

						<label htmlFor="employeesCount">Employees count</label>
						<br />
						<input
							id="employeesCount"
							type="number"
							value={employeesCount}
							onChange={(e) => setEmployeesCount(e.target.value)}
						/>
						<br />

						<button onClick={handleSubmit}>Submit</button>
					</div>
				)}
			</main>
		</div>
	);
}
