import styles from '../../styles/Home.module.css'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GET_ExampleList, getExampleList, getLoadingState } from '../../store/examples'
import Loading from '../Loading'
import Link from 'next/link'

export default function ListExamples() {
	const dispatch = useDispatch()
	const loading = useSelector(getLoadingState)
	const examples = useSelector(getExampleList)

	useEffect(() => {
		dispatch(GET_ExampleList())
	}, [])

	return (
		<div className={styles.grid}>
			{loading ? (
				<Loading loading={loading} />
			) : (
				examples.map((example) => (
					<Link key={example.id} href={`/detail/${example.id}`}>
						<a className={styles.card}>
							<h2>{example.description} &rarr;</h2>
							<p>Click here to show detail.</p>
						</a>
					</Link>
				))
			)}
		</div>
	)
}
