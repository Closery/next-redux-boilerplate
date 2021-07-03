import styles from '../styles/Home.module.css'
import Layout from '../components/Layout'
import ListExamples from '../components/ListExamples'

export default function Home() {
	return (
		<Layout>
			<div className={styles.container}>
				<main className={styles.main}>
					<h1 className={styles.title}>
						Welcome to <a>Next.js</a> with Redux!
					</h1>

					<p className={styles.description}>
						Get started by editing
						<code className={styles.code}>pages/index.js</code> and <code className={styles.code}>store/examples.js</code>.
					</p>

					<p className={styles.description}>
						You can see these <code className={styles.code}>examples</code> below.
					</p>

					<ListExamples />
				</main>
			</div>
		</Layout>
	)
}
