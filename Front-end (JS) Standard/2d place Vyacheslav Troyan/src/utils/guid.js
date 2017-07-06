export default function guid () {
	const alphabet = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
	const idLength = 8
	let rtn = ''

	for (let i = 0; i < idLength; i++) {
		rtn += alphabet.charAt(Math.floor(Math.random() * alphabet.length))
	}
	return rtn
}