/**
 * Please be aware this API is for demonstration purposes, it's not represent a real-world approach.
 */
import { db } from './index'

function delay(callBack) {
	// This function is for loading demonstration
	setTimeout(() => callBack(), 1000)
}

export default function handler(req, res) {
	const passNotFound = () => {
		delay(() => {
			res.statusCode = 404
			res.json({ status: false, message: 'Not Found' })
		})
	}

	const passResponse = ({ response, message }) => {
		delay(() => {
			res.statusCode = 200
			res.json({ status: true, content: response, message })
		})
	}

	if (req.query.id) {
		switch (req.method) {
			case 'GET': {
				let data = db.get('examples')
				let index = data.findIndex((data) => data.id === parseInt(req.query.id))

				if (index > -1) {
					passResponse({ response: data[index] })
				} else passNotFound()

				break
			}
			case 'PATCH': {
				let data = db.get('examples')
				let index = data.findIndex((data) => data.id === parseInt(req.query.id))

				if (index > -1) {
					let example = data[index]
					data[index] = { ...example, ...req.body, id: example.id }
					db.set('examples', data)
					passResponse({ response: data[index], message: 'Patched successfully' })
				} else passNotFound()

				break
			}
			case 'DELETE': {
				let data = db.get('examples')
				let index = data.findIndex((data) => data.id === parseInt(req.query.id))

				if (index > -1) {
					let response = data[index]
					data.splice(index, 1)
					db.set('examples', data)
					passResponse({ response, message: 'Deleted successfully' })
				} else passNotFound()

				break
			}
			default:
				passNotFound()
		}
	} else passNotFound()
}
