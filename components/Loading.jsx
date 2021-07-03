import ClipLoader from 'react-spinners/ClipLoader'

export default function Loading({ loading }) {
	return <ClipLoader color={'#000000'} loading={loading} size={50} />
}
