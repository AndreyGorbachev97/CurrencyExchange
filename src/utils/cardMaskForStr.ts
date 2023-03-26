export const cardMskForStr = (card: string) => {
	let res = ''
	for (let i = 0; i < card.length; i++) {
		if (i !== 0 && (i + 1) % 4 === 0 && i < 13) {
			res += card[i] + ' '
		} else {
			res += card[i]
		}
	}

	return res
}
