import createElement from '../logic/createElement.js';

export class Slider {
	/**
	 *
	 * @param {Element} parentElement
	 */
	constructor(parentElement) {
		this.parentElement = parentElement;
	}

	init() {
		this.createUI();
	}

	createUI() {
		this.leftButton = createElement(
			'button',
			this.parentElement,
			'nav__button'
		);
		this.leftButton.innerHTML = '&#10094;';
		this.description = createElement(
			'div',
			this.parentElement,
			'nav__description'
		);
			this.rightButton = createElement(
				'button',
				this.parentElement,
				'nav__button'
			);
		this.rightButton.innerHTML = '&#10095;';
	}
}

export default Slider;
