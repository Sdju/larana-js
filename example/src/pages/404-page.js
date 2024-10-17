import { Page, LayoutComponent, TextComponent } from 'larana-js'

import { styles } from '../styles'

export class NotFoundPage extends Page {
	init() {
		this.root = new LayoutComponent({
			style: styles.get('body'),
			children: [
				new TextComponent({
					text: '404',
					style: styles.get('h1Text'),
				}),
				new TextComponent({
					text: 'Go back to home',
					style: styles.get('text'),
				})
			],
		})
	}
}
