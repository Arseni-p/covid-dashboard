export const keyboardInit = () => {
  const engLetters = [
    [113, 119, 101, 114, 116, 121, 117, 105, 111, 112, 45, 'backspace'],
    [97, 115, 100, 102, 103, 104, 106, 107, 108, 13], 
    [16, 122, 120, 99, 118, 98, 110, 109],
    [32, 'left', 'right']];

  const kbContainer = document.querySelector('.global__wrapper');
  const keyboard = document.createElement('div');
  keyboard.className = 'keyboard__content';
  keyboard.classList.add('keyboard__content--off');
  kbContainer.append(keyboard);

  const lettersCount = 4;
  for (let i = 0; i < lettersCount; i += 1) {
    const rowLetters = document.createElement('div');
    keyboard.append(rowLetters);
    rowLetters.classList.add('keyboard__row');

    for (let j = 0; j < engLetters[i].length; j += 1) {
    const btn = document.createElement('div');
    
    btn.classList.add('key__btn');
    rowLetters.append(btn);

    if ( engLetters[i][j] === 'backspace' ) {
      btn.classList.add('backspace');
      btn.textContent = 'BS';
    } else if ( engLetters[i][j] === 13 ) {
    btn.innerHTML = 'Enter';
    btn.classList.add('enter');
    } else if ( engLetters[i][j] === 16 ) {
    btn.classList.add('shift');
    btn.textContent = 'Shift';
    const shiftStatus = document.createElement('span');// indicator
    shiftStatus.classList.add('shift__status');
    btn.append(shiftStatus);
    } else if ( engLetters[i][j] === 32 ) {
    // btn.innerHTML = 'Space';
    btn.classList.add('space');
    btn.textContent = 'Space';
    } else if ( engLetters[i][j] === 'left' ) {
    btn.innerHTML = '<';
    btn.classList.add('left');
    btn.classList.add('arrow');
    } else if ( engLetters[i][j] === 'right' ) {
    btn.innerHTML = '>';
    btn.classList.add('right');
    btn.classList.add('arrow');
    } else {
    const engSymb = document.createElement('span');
    engSymb.classList.add('eng__letter');
    btn.append(engSymb);
    engSymb.innerHTML = String.fromCharCode(engLetters[i][j]);
    }
    }
  }

  const engLettersArr = document.querySelectorAll('.eng__letter');
  for (let i = 0; i < engLettersArr.length; i++) {
    engLettersArr[i].classList.add('curr__item')
  }

  const keyBtns = document.querySelectorAll('.key__btn')
  for (let i = 0; i < keyBtns.length; i++) {
    if ( 
    keyBtns[i].classList.contains('backspace') || 
    keyBtns[i].classList.contains('enter') || 
    keyBtns[i].classList.contains('shift') || 
    keyBtns[i].classList.contains('arrow') || 
    keyBtns[i].classList.contains('space')
    ) {
      keyBtns[i].classList.add('curr__item--special')
    }
  }
};

export default keyboardInit;