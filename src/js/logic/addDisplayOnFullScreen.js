import createElement from '../logic/createElement.js';

export const addDisplayFullScreen = (querySelector) => {
	const fullScreenContainer = document.querySelector(querySelector);

	const fullScreenButton = createElement(
		'button',
		fullScreenContainer,
		'my__screen__btn'
	);
	fullScreenButton.style.display = 'none';

	fullScreenContainer.addEventListener('mouseover', () => {
		fullScreenButton.style.display = '';
	});

	fullScreenContainer.addEventListener('mouseout', () => {
		fullScreenButton.style.display = 'none';
	});

	let fullState = false;

	fullScreenButton.addEventListener('click', () => {
		fullState = !fullState;
		if (fullState) {
			if (fullScreenContainer.requestFullscreen !== undefined) {
				fullScreenContainer.requestFullscreen();
			} else if (fullScreenContainer.webkitRequestFullscreen !== undefined) {
				/* Safari */
				fullScreenContainer.webkitRequestFullscreen();
			} else if (fullScreenContainer.msRequestFullscreen !== undefined) {
				/* IE11 */
				fullScreenContainer.msRequestFullscreen();
            }
            fullScreenButton.classList.toggle('fullScreen');
		} else {
			if (document.exitFullscreen) {
				document.exitFullscreen();
			} else if (document.webkitExitFullscreen) {
				/* Safari */
				document.webkitExitFullscreen();
			} else if (document.msExitFullscreen) {
				/* IE11 */
				document.msExitFullscreen();
            }
            fullScreenButton.classList.toggle('fullScreen');
		}
	});
};
export default addDisplayFullScreen;
