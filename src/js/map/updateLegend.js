import { legendImg, legendItems, legendValues } from '../global/globalVariables.js';

export const updateLegend = (navCount, countColors) => {
  let indexLegendColor = legendImg.length - 1;
  let indexLegendItem = 0;
  let currLegend;
  const legendTopLine = 0;
  const legendLowLine = 4;
  
  legendImg.forEach(item => {
    if (indexLegendItem === legendTopLine) {
      currLegend = `> ${legendValues[navCount][indexLegendItem].toLocaleString()}`
    };
    if (indexLegendItem > legendTopLine && indexLegendItem < legendLowLine) {
      currLegend = `> ${legendValues[navCount][indexLegendItem].toLocaleString()} - ${legendValues[navCount][indexLegendItem - 1].toLocaleString()}`
    };
    if (indexLegendItem === legendLowLine) {
      currLegend = `< ${legendValues[navCount][indexLegendItem-1].toLocaleString()}`
    };
    item.style.backgroundColor = `${countColors[indexLegendColor]}`;
    legendItems[indexLegendItem].textContent = currLegend;
    indexLegendColor -= 1;
    indexLegendItem += 1;
  });
};

export default updateLegend;