export const legendPopup = () => {
  const legendBtn = document.querySelector('.legend__btn');
  const legendWrapper = document.querySelector('.legend__wrapper');
  const legendPlus = '+';
  const legendMinus = 'x';
  
  legendBtn.addEventListener('click', () => {
    if (!legendWrapper.classList.contains('legend__on')) {
      legendWrapper.classList.add('legend__on');
      legendBtn.textContent = legendMinus;
    } else {
      legendWrapper.classList.remove('legend__on');
      legendWrapper.classList.add('legend__off');
      setTimeout(() => {
        legendBtn.textContent = legendPlus;
        legendWrapper.classList.remove('legend__off');
      }, 2000)
    }
  })
};

export default legendPopup;