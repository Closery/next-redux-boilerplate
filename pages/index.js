import { useState } from 'react'
import styles from '../styles/Home.module.css'
import Layout from '../components/Layout'
import CreateSection from '../components/CreateSection'
import ListExamples from '../components/ListExamples'

export default function Home() {
	const [showCreateSection, setShowCreateSection] = useState(false)

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
						You can see these <code className={styles.code}>examples</code> below or you can
						<span className={styles.createExample} onClick={() => setShowCreateSection(!showCreateSection)}>
							create a new example
						</span>
						.
					</p>

					<CreateSection show={showCreateSection} />

					<ListExamples />
				</main>
			</div>
		</Layout>
	)
}
