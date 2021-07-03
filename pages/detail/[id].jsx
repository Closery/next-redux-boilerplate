import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GET_ExampleDetail, DELETE_Example, getError, getExampleDetail, getIsDeleted, getLoadingState } from '../../store/examples'
import styles from '../../styles/Home.module.css'
import Layout from '../../components/Layout'
import Loading from '../../components/Loading'

export default function Detail({ id }) {
	const dispatch = useDispatch()
	const router = useRouter()
	const error = useSelector(getError)
	const isDeleted = useSelector(getIsDeleted)
	const loading = useSelector(getLoadingState)
	const exampleDetail = useSelector(getExampleDetail)

	useEffect(() => {
		if (!exampleDetail.id && !error && !isDeleted) dispatch(GET_ExampleDetail(id))
		else if (error || isDeleted) router.push('/')
	}, [exampleDetail, error, isDeleted])

	const DeleteExample = () => {
		if (exampleDetail.id) {
			dispatch(DELETE_Example(exampleDetail.id))
		}
	}

	return (
		<Layout title={exampleDetail.description}>
			<div className={styles.container}>
				<main className={styles.main}>
					{loading ? (
						<Loading loading={loading} />
					) : (
						<main className={styles.main}>
							<h1 className={styles.title}>
								Detail Page of <a>{exampleDetail.description}</a>
							</h1>

							<p className={styles.description}>
								<code className={styles.code}>{JSON.stringify(exampleDetail, null, 4)}</code>
							</p>

							<p className={styles.buttons}>
								<button className={styles.button} onClick={DeleteExample}>
									Delete Example
								</button>
							</p>
						</main>
					)}
				</main>
			</div>
		</Layout>
	)
}

Detail.getInitialProps = ({ query }) => {
	const { id } = query
	return { id }
}
