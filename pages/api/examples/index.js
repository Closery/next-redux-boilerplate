/**
 * Please be aware this API is for demonstration purposes, it's not represent a real-world approach.
 */
const JSONdb = require('simple-json-db')
export const db = new JSONdb('./pages/api/data.json')
const resetDB = false

if (resetDB)
	db.set('examples', [
		{ id: 1, description: 'Example 1' },
		{ id: 2, description: 'Example 2' },
		{ id: 3, description: 'Example 3' },
		{ id: 4, description: 'Example 4' },
	])

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

	switch (req.method) {
		case 'GET': {
			passResponse({ response: db.get('examples') })
			break
		}
		case 'POST': {
			let data = db.get('examples')
			let example = { id: Date.now(), ...req.body }
			data.push(example)
			db.set('examples', data)
			passResponse({ response: example })
			break
		}
		default:
			passNotFound()
	}
}
