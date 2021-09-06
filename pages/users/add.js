import Head from "next/head";
import styles from "../../styles/Main.module.css";
import { gql, useMutation } from "@apollo/client";
import client from "../../apollo-client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

export default function AddUser() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [dob, setDob] = useState("");
	const [company, setCompany] = useState("");

	const router = useRouter();

  const ADD_USER_MUTATION = gql`
    mutation addAUser(
      $name: String!
      $email: String!
      $phone: String!
      $dob: String!
      $company: String!
    ) {
      addUser(
        user: {
          name: $name
          email: $email
          phone: $phone
          dob: $dob
          company: $company
        }
      ) {
        id
        name
        email
        phone
        dob
        company
      }
  }
  `;

	const [executeAddUser, { data, loading, error }] = useMutation(
		ADD_USER_MUTATION,
		{
			// refetchQueries: [
			// 	"GetAllUsers", // Refetch all company data
			// ],
			onCompleted: (data) => router.push("/users")
		}
	);

	const handleSubmit = () => {
		executeAddUser({
			variables: {
				name,
				email,
				phone,
				dob,
				company,
			},
		}).then(() => {
			console.log("submitted");
			// router.push("/users");
		});
	};

	if (error) return `Submission error! ${error.message}`;

	return (
		<div className={styles.container}>
			<Head>
				<title>Add a User</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>
				<h1 className={styles.title}>Add a user</h1>

				<br />
				<small>
					<Link href="/users">
						<a>↩️ Back to Users</a>
					</Link>
				</small>
				<br />

				{loading ? (
					"Submitting..."
				) : (
					<div className={styles.formContainer}>
						<label htmlFor="name">Name</label>
						<br />
						<input
							id="name"
							type="text"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
						<br />


						<label htmlFor="email">email</label>
						<br />
						<input
							id="email"
							type="text"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<br />


						<label htmlFor="phone">phone</label>
						<br />
						<input
							id="phone"
							type="text"
							value={phone}
							onChange={(e) => setPhone(e.target.value)}
						/>
						<br />

						<label htmlFor="dob">{"DOB (dd/mm/yy)"}</label>
						<br />
						<input
							id="dob"
							type="text"
							value={dob}
							onChange={(e) => setDob(e.target.value)}
						/>
						<br />


						<label htmlFor="company">company</label>
						<br />
						<input
							id="company"
							type="text"
							value={company}
							onChange={(e) => setCompany(e.target.value)}
						/>
						<br />


						<button onClick={handleSubmit}>Submit</button>
					</div>
				)}
			</main>
		</div>
	);
}
