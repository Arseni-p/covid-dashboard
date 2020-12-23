export const initMarker = (count, property, navCount) => {
  const topLevel = 4;
  const preTopLevel = 3;
  const mediumLevel = 2;
  const preMediumLevel = 1;
  const lowLevel = 0;

  const topCount = [        1000000, 100000, 1000000, 5000,  1000, 10000,  10000,  100,  5000, 70, 1,  70];
  const preTopCount = [     500000,  50000,  500000,  1000,  500,  5000,   5000,   75,   2500, 50, 0.7,  50];
  const mediumCount = [     100000,  10000,  100000,  100,   100,  1000,   1000,   50,   1000, 30, 0.4,  30];
  const preMediumCount = [  50000,   1000,   10000,   50,    50,   50,     100,    25,   100,  10, 0.1,  10];
  
  if (count > topCount[navCount]) { return property[topLevel] };
  if (count > preTopCount[navCount] && count < topCount[navCount]) { return property[preTopLevel] };
  if (count > mediumCount[navCount] && count < preTopCount[navCount]) { return property[mediumLevel] };
  if (count > preMediumCount[navCount] && count < mediumCount[navCount]) { return property[preMediumLevel] };
  if (count < preMediumCount[navCount]) { return property[lowLevel] }; 
};

export default initMarker;