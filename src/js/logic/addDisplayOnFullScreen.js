import createElement from './createElement.js';

export const addDisplayFullScreen = (querySelector) => {
	const fullScreenContainer = document.querySelector(querySelector);

	const fullScreenButton = createElement(
		'button',
		fullScreenContainer,
		'my__screen__btn'
  );
  
	fullScreenButton.style.display = 'none';

	fullScreenContainer.addEventListener('mouseover', () => {
		fullScreenButton.style.display = 'block';
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
				fullScreenContainer.webkitRequestFullscreen();
			} else if (fullScreenContainer.msRequestFullscreen !== undefined) {
				fullScreenContainer.msRequestFullscreen();
            }
            fullScreenButton.classList.toggle('fullScreen');
		} else {
			if (document.exitFullscreen) {
				document.exitFullscreen();
			} else if (document.webkitExitFullscreen) {
				document.webkitExitFullscreen();
			} else if (document.msExitFullscreen) {
				document.msExitFullscreen();
            }
            fullScreenButton.classList.toggle('fullScreen');
		}
	});
};
export default addDisplayFullScreen;
