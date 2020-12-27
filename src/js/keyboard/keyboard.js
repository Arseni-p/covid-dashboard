import { keyboardInit } from './keyboardInit.js';

export const keyboard = () => {
  keyboardInit();

  let moveX = 0;
  let letter;
  let kbOff = true;
  let shiftBtn = false;
  let shiftPress = false;
  const shiftBtnForClick = document.querySelector('.shift');
  const lettersArr = document.querySelectorAll( '.curr__item');
  const shiftStatus = document.querySelector('.shift__status');
  const kbBtn = document.querySelector('.search__keyboard');
  const kbWrapper = document.querySelector('.keyboard__content');
  const outputArea = document.querySelector('.search__form');
  const leftBtn = document.querySelector('.left');
  const rightBtn = document.querySelector('.right');

  const tableSearch = () => {
    const table = document.querySelector('.tableTwo');
    const regExp = new RegExp(outputArea.value, 'i');
    let flag = false;
    for (let i = 0; i < table.tBodies[0].rows.length; i += 1) {
      flag = false;
      for (let j = table.tBodies[0].rows[i].cells.length - 1; j >= 0; j -= 1) {
        flag = regExp.test(table.tBodies[0].rows[i].cells[0].textContent);
          if (flag) break;
      }
      if (flag) {
        table.tBodies[0].rows[i].style.display = '';
        
      } else {
        table.tBodies[0].rows[i].style.display = 'none';
      }
    }
  }

  const insertFunc = () => {
    let pointStart = outputArea.selectionStart;
    let pointEnd = outputArea.selectionEnd;
    if ( shiftBtn ) {
      outputArea.value = outputArea.value.substring(0, pointStart) + letter.toUpperCase() + outputArea.value.substring(pointEnd, outputArea.value.length);
    } else {
      outputArea.value = outputArea.value.substring(0, pointStart) + letter.toLowerCase() + outputArea.value.substring(pointEnd, outputArea.value.length);
    };
    outputArea.focus();
    pointStart += 1;
    pointEnd += 1;
    outputArea.selectionStart = pointStart;
    outputArea.selectionEnd = pointEnd;
  };

  const shiftFunc = () => {
  
    if ( !shiftBtn ) {
      shiftStatus.style.backgroundColor = '#90ee90';
      for (let i = 0; i < lettersArr.length; i+= 1) {
        lettersArr[i].style.textTransform = 'uppercase';
      }
      shiftBtn = true;
    } else {
      shiftStatus.style.backgroundColor = '#000000';
  
      for (let i = 0; i < lettersArr.length; i += 1) {
        lettersArr[i].style.textTransform = 'lowercase';
      }
      shiftBtn = false;
    }
  }

  kbBtn.addEventListener('click', () => {
    if ( kbOff ) {
      kbWrapper.classList.remove('keyboard__content--off');
      kbWrapper.classList.add('keyboard__content--on');
      kbBtn.textContent = '^';
      kbOff = false;
    } else {

      kbWrapper.classList.add('keyboard__content--off');
      kbBtn.textContent = 'kb';
      kbOff = true;
    }

    if ( kbOff ) {
      setTimeout( () => {
        kbWrapper.classList.remove('keyboard__content--on');
        kbWrapper.classList.remove('keyboard__content--off');
        kbBtn.classList.remove('keyboard__btn--off');
      }, 1300 )
    } 
  });

  kbWrapper.addEventListener('click', (event) => {
    let point;
    outputArea.focus();

    if ( event.target.closest('div') ) {
      point = event.target.closest('div');
      if (!(
        point.classList.contains('backspace') || 
        point.classList.contains('enter') || 
        point.classList.contains('shift') ||
        point.classList.contains('arrow') || 
        point.classList.contains('space') || 
        point.classList.contains('keyboard__row')
      )) {
        letter = point.querySelector('.curr__item').textContent;
        
        if ( shiftBtn ) {
          if ( outputArea.selectionStart < outputArea.value.length ) {
            insertFunc();
          } else {
            outputArea.value +=letter.toUpperCase();
          }
        } else if ( outputArea.selectionStart < outputArea.value.length ) {
            insertFunc();
          } else {
            outputArea.value +=letter.toLowerCase();
          }
      };

      if ( point.classList.contains('shift') ) {
        if ( !shiftBtn ) {
          shiftStatus.style.backgroundColor = '#90ee90';
          for (let i = 0; i < lettersArr.length; i += 1) {
            lettersArr[i].style.textTransform = 'lowercase';
          }
          shiftBtn = true;
        } else {
          shiftStatus.style.backgroundColor = '#000000';
          for (let i = 0; i < lettersArr.length; i += 1) {
            lettersArr[i].style.textTransform = 'uppercase';
          }  
          shiftBtn = false;
        }
      } 
      
      if ( point.classList.contains('shift') ) {
        shiftFunc();
      };

      if ( point.classList.contains('backspace') ) {
        if ( outputArea.selectionStart < outputArea.value.length ) {
          let pointStart = outputArea.selectionStart;
          let pointEnd = outputArea.selectionEnd;
  
          outputArea.value = outputArea.value.substring(0, pointStart).slice(0, -1) + outputArea.value.substring(pointEnd, outputArea.value.length);
  
          outputArea.focus();
          
          pointStart -= 1;
          pointEnd -= 1;
          
          outputArea.selectionStart = pointStart;
          outputArea.selectionEnd = pointEnd;
        } else {
          outputArea.value = outputArea.value.slice(0, -1);
        }
      } 
 
      if ( point.classList.contains('space') ) {
        letter = ' ';
        insertFunc();
      }
    }
    tableSearch();
  });

  leftBtn.addEventListener('click', () => {
    outputArea.focus();
    // eslint-disable-next-line no-unused-expressions
    outputArea.selectionStart;
    // eslint-disable-next-line no-unused-expressions
    outputArea.selectionEnd;

    if (shiftBtn) {
      if ( moveX === outputArea.value.length ) {
        moveX = outputArea.value.length
      } else {
        moveX++;
      } 
      outputArea.focus();
      outputArea.selectionStart = outputArea.value.length - moveX;
    } else {
      if ( moveX === outputArea.value.length ) {
        moveX = outputArea.value.length
      } else {
        moveX++;
      }
      outputArea.focus();
      outputArea.selectionStart = outputArea.value.length - moveX;
      outputArea.selectionEnd = outputArea.value.length - moveX;    
    };
  })

  rightBtn.addEventListener('click', () => {
    if (shiftBtn) {
      if ( moveX === 0 ) {
        moveX = 0
      } else {
        moveX--
      };
      outputArea.focus();
      outputArea.selectionEnd = outputArea.value.length - moveX;
    } else {
      if ( moveX === 0 ) {
        moveX = 0;
      } else {
        moveX--;
      };
      outputArea.focus();
      outputArea.selectionStart = outputArea.value.length - moveX;
      outputArea.selectionEnd = outputArea.value.length - moveX;
    }
  });

  shiftBtnForClick.addEventListener('click', () => {
    if (!shiftPress) {
      shiftFunc();

      if ( shiftStatus.classList.add('key-bg__click') ) shiftStatus.classList.remove('key-bg__click');

      shiftStatus.classList.add('key-bg__click');
      setTimeout(() => {
        shiftStatus.classList.remove('key-bg__click');
      }, 1000)

      shiftPress = true;
    }
  })
};

export default keyboard;