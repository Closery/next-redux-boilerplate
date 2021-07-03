import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { POST_CreateExample } from '../../store/examples'
import styles from '../../styles/Home.module.css'
import toast from 'react-hot-toast'

export default function CreateSection({ show = true }) {
	const dispatch = useDispatch()
	const [createInputText, setCreateInputText] = useState('')

	const CreateExample = () => {
		if (createInputText.length > 3) dispatch(POST_CreateExample({ description: createInputText }))
		else toast.error('Enter at least 3 characters.')
	}

	return (
		<>
			{show && (
				<div className={styles.editSection}>
					<input
						className={styles.editInput}
						value={createInputText}
						onChange={(e) => setCreateInputText(e.target.value)}
						placeholder="Enter a description"
						maxLength="50"
						type="text"
					/>
					<button className={styles.button} onClick={CreateExample}>
						Create
					</button>
				</div>
			)}
		</>
	)
}
