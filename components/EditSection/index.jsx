import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PATCH_UpdateExample, getExampleDetail } from '../../store/examples'
import styles from '../../styles/Home.module.css'
import toast from 'react-hot-toast'

export default function EditSection({ show = true }) {
	const dispatch = useDispatch()
	const exampleDetail = useSelector(getExampleDetail)
	const [editInputText, setEditInputText] = useState(exampleDetail.description)

	const EditExample = () => {
		if (editInputText.length > 3 && exampleDetail.id) dispatch(PATCH_UpdateExample(exampleDetail.id, { description: editInputText }))
		else toast.error('Enter at least 3 characters.')
	}

	return (
		<>
			{show && (
				<div className={styles.editSection}>
					<input
						className={styles.editInput}
						value={editInputText}
						onChange={(e) => setEditInputText(e.target.value)}
						maxLength="50"
						type="text"
					/>
					<button className={styles.button} onClick={EditExample}>
						Save
					</button>
				</div>
			)}
		</>
	)
}
