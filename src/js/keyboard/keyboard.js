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

  let tableSearch = () => {
    const table = document.querySelector('.tableTwo');
    const regExp = new RegExp(outputArea.value, 'i');
    console.log(outputArea.value)
    let flag = false;
    for (let i = 0; i < table.tBodies[0].rows.length; i += 1) {
      flag = false;
      for (let j = table.tBodies[0].rows[i].cells.length - 1; j >= 0; j -= 1) {
        flag = regExp.test(table.tBodies[0].rows[i].cells[1].textContent);
          if (flag) break;
      }
      if (flag) {
        table.tBodies[0].rows[i].style.display = '';
        
      } else {
        table.tBodies[0].rows[i].style.display = 'none';
      }
    }
  }

  let insertFunc = () => {
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

  let shiftFunc = () => {
  
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

  kbBtn.addEventListener('click', function(event) {
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
      setTimeout( function() {
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
        
  //Up & down
        if ( shiftBtn ) {
          ( outputArea.selectionStart < outputArea.value.length ) ? insertFunc() : outputArea.value +=letter.toUpperCase();
        } else {
          ( outputArea.selectionStart < outputArea.value.length ) ? insertFunc() : outputArea.value +=letter.toLowerCase();
        }
      }

  
  //SHIFT IF CAPSLOCK IS ON
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
      
  
  //SHIFT IF CAPSLOCK IS OFF
       if ( point.classList.contains('shift') ) {
        shiftFunc();
      }

  
  //BACKSPACE
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
  
  //SPACE
      if ( point.classList.contains('space') ) {
        letter = ' ';
        insertFunc();
      }
    }
    tableSearch();
  });

  leftBtn.addEventListener('click', function() {
    outputArea.focus();
    outputArea.selectionStart;
    outputArea.selectionEnd;

    if (shiftBtn) {
      ( moveX == outputArea.value.length ) ? moveX = outputArea.value.length : moveX++;
      outputArea.focus();
      outputArea.selectionStart = outputArea.value.length - moveX;
    } else {
      ( moveX == outputArea.value.length ) ? moveX = outputArea.value.length : moveX++;
      outputArea.focus();
      outputArea.selectionStart = outputArea.value.length - moveX;
      outputArea.selectionEnd = outputArea.value.length - moveX;    
    };
  })

  rightBtn.addEventListener('click', function() {
    if (shiftBtn) {
      ( moveX == 0 ) ? moveX = 0 : moveX--;

      outputArea.focus();
      outputArea.selectionEnd = outputArea.value.length - moveX;

      console.log('click rightShift', outputArea.selectionStart)
    } else {
      ( moveX == 0 ) ? moveX = 0 : moveX--;
      outputArea.focus();
      outputArea.selectionStart = outputArea.value.length - moveX;
      outputArea.selectionEnd = outputArea.value.length - moveX;
    
      console.log('click right', outputArea.selectionStart)
    }
  });

  shiftBtnForClick.addEventListener('click', () => {
    if (!shiftPress) {
      shiftFunc();

      if ( shiftStatus.classList.add('key-bg__click') ) shiftStatus.classList.remove('key-bg__click');
      if ( soundValue ) clickSoundKeyShift();

      shiftStatus.classList.add('key-bg__click');
      setTimeout(function() {
        shiftStatus.classList.remove('key-bg__click');
      }, 1000)

      shiftPress = true;
    }
  })
};

export default keyboard;