import { IDirection } from '../../models/IDirection'

export interface IDirectionMod {
	id: number
	title: string
	img: string
	type: string
	name: string
}

export const directionsModifier = (
	directions: IDirection[]
): IDirectionMod[] => {
	return directions.map(direction => ({
		id: direction.id,
		title: direction.name,
		img: direction.url_logo,
		type: direction.is_crypto ? 'coin' : 'rub',
		name: direction.short_name,
	}))
}
