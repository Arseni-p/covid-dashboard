export const mapFullScreen = () => {
  const fullScreenbtn = document.querySelector('.screen__btn');
  const mapForFull = document.querySelector('.map');
  fullScreenbtn.addEventListener('click', () => {
    if (!fullScreenbtn.classList.contains('screen__btn--opened')) {
      fullScreenbtn.classList.add('screen__btn--opened');
      mapForFull.classList.add('map__full');
    } else {
      fullScreenbtn.classList.remove('screen__btn--opened');
      mapForFull.classList.remove('map__full');
      fullScreenbtn.classList.add('screen__btn--closed');
      setTimeout(() => {
        fullScreenbtn.classList.remove('screen__btn--closed');
      }, 1000)
    }
  })
};

export default mapFullScreen;