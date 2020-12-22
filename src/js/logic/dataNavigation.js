
let posX = 0;
export let navCount = 0;

export const dataNavigation = (wrapper, event) => {
  const btnLeft = wrapper.querySelector('.nav__left');
  const btnRight = wrapper.querySelector('.nav__right');
  const navList = wrapper.querySelector('.navigation__list');
  const navMove = 200;
  const maxCount = 11;
  const minCount = 0;

  if ( event.target.classList.contains('nav__left') && navCount < maxCount ) {
    btnRight.removeAttribute('disabled');
    btnRight.classList.remove('disabled-btn');
    navCount++;
    posX +=navMove;
    navList.style.left = `-${posX}px`;
  }
  
  if ( event.target.classList.contains('nav__right') && navCount > minCount ) {
    btnLeft.removeAttribute('disabled');
    btnLeft.classList.remove('disabled-btn')
    navCount--;
    posX -=navMove;
    navList.style.left = `-${posX}px`;
  }
  
  if ( navCount === 11 ) {
    btnLeft.setAttribute('disabled', 'disabled');
    btnLeft.classList.add('disabled-btn')
  }
  
  if ( navCount === 0 ) {
    btnRight.setAttribute('disabled', 'disabled');
    btnRight.classList.add('disabled-btn')
  }
}

export default dataNavigation;