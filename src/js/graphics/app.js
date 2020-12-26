import Graphics from './Graphics.js';

const GraphInit = () => { 
    const dailyAPI = 'https://disease.sh/v3/covid-19/historical/all?lastdays=366';
    const countriesAPI = 'https://corona-api.com/countries/';

    const graphBlock = document.createElement('div');
        graphBlock.classList.add('graphBlock');
    document.querySelector('.data.data__graph').append(graphBlock);
    const arrayParameter = ['Daily cases', 'Daily deaths', 'Daily recovered', 
                            'Total cases', 'Total deaths', 'Total recovered',
                            'Daily cases/100k', 'Daily deaths/100k', 'Daily recovered/100k',
                            'Total cases/100k', 'Total deaths/100k', 'Total recovered/100k',];
    const arrayParamRed = ['cases', 'deaths', 'recovered', 'allCases', 'allDeaths', 'allRecov',
                           'casesHun', 'deathsHun', 'recoveredHun', 
                           'hunAllCases', 'hunAllDeaths', 'hunAllRecovered'];

    function getParams(operation, fullScreen, country = false, target = 'World') {
        const paramsNow = document.querySelector('.switchTitle').innerHTML;
        let indParams;
        const api = country ? (countriesAPI + country) : dailyAPI;
        if (arrayParameter.indexOf(paramsNow) === -1) {
            indParams = 0;
        } else {
            indParams = arrayParameter.indexOf(paramsNow);
        }   
        if (operation === 'sum') {
            if (indParams === arrayParamRed.length - 1) {
                indParams = -1;
            }
            document.querySelector('.switchTitle').innerHTML = `${arrayParameter[indParams + 1]}`;
            getData(api, arrayParamRed[indParams + 1], fullScreen, target);
        } else {
            if (indParams === 0) {
                indParams = arrayParameter.length;
            }
            document.querySelector('.switchTitle').innerHTML = `${arrayParameter[indParams - 1]}`;
            getData(api, arrayParamRed[indParams - 1], fullScreen, target);
        }
    }

    function setTotalCases(data) {
        const obj = {
            data: [],
            cases: []
        }
        const arrCases = [];
        const arrDeath = [];
        const arrRecov = [];
        const arrDiff = [];
        const arrDiffDeath = [];
        let arrDiffRec = [];
        for (const key in data.cases) {
            obj.data.push(key);
            arrCases.push(data.cases[key]);
        }
        for (const key in data.deaths) {
            arrDeath.push(data.deaths[key]);
        }
        for (const key in data.recovered) {
            arrRecov.push(data.recovered[key]);
        }
        
        for (let i = 1; i < arrCases.length; i += 1) {
            arrDiff.push(arrCases[i] - arrCases[i - 1]);
            arrDiffDeath.push(arrDeath[i] - arrDeath[i - 1]);
            arrDiffRec.push(arrRecov[i] - arrRecov[i - 1]);
        }

        arrDiffRec = arrDiffRec.map(item => item > 0 ? item : 0);
        obj.data = obj.data.slice(1);
        obj.cases = arrDiff;
        obj.deaths = arrDiffDeath;
        obj.recovered = arrDiffRec;
        obj.allCases = arrCases;
        obj.allDeaths = arrDeath;
        obj.allRecov = arrRecov;
        obj.casesHun = casesPerHundred(arrDiff);
        obj.deathsHun = casesPerHundred(arrDiffDeath);
        obj.recoveredHun = casesPerHundred(arrDiffRec);
        obj.hunAllCases = casesPerHundred(arrCases);
        obj.hunAllDeaths = casesPerHundred(arrDeath);
        obj.hunAllRecovered = casesPerHundred(arrRecov);
        return obj;
    }

    function casesPerHundred(cases) {
        const population = 7827000000;
        const arrAllPerHundred = [];
        cases.forEach(elem => {
            const count = elem / population * 100000;
            arrAllPerHundred.push(count.toFixed(3));
        })
        return arrAllPerHundred;
    }

    function setCountryCases (data) {
        const obj = {
            data: [],
            cases: []
        }
        const arrCases = [];
        const arrDeath = [];
        const arrRecov = [];
        const arrDate = [];
        const arrDiff = [];
        const arrDiffDeath = [];
        const arrDiffRec = [];
        data.forEach(item => {
            arrCases.push(item.confirmed);
            arrDeath.push(item.deaths);
            arrRecov.push(item.recovered);
            arrDate.push(item.date.split('-').slice(1));
            arrDiff.push(item.new_confirmed);
            arrDiffDeath.push(item.new_deaths);
            arrDiffRec.push(item.new_recovered);
        })

        obj.data = arrDate;
        obj.allCases = arrCases.reverse();
        obj.allDeaths = arrDeath.reverse();
        obj.allRecov = arrRecov.reverse();
        obj.cases = arrDiff.reverse();
        obj.deaths = arrDiffDeath.reverse();
        obj.recovered = arrDiffRec.reverse();
        obj.casesHun = casesPerHundred(arrDiff);
        obj.deathsHun = casesPerHundred(arrDiffDeath, true);
        obj.recoveredHun = casesPerHundred(arrDiffRec);
        obj.hunAllCases = casesPerHundred(arrCases);
        obj.hunAllDeaths = casesPerHundred(arrDeath);
        obj.hunAllRecovered = casesPerHundred(arrRecov);
        return obj;
    }
    
    function getData(api, param, screen, target = 'World') {
        if (api === 'https://disease.sh/v3/covid-19/historical/all?lastdays=366') {
            fetch(api)
            .then( response => response.json())
            .then(res => {
                const total = setTotalCases(res);
                const graph = new Graphics(total, param, screen, true, target);
                    graph.init();
            }).catch( error => {
                console.log(error);
            });
        } else {
            fetch(api)
            .then( response => response.json())
            .then(res => {
                const total = setCountryCases(res.data.timeline);
                const graph = new Graphics(total, param, screen, false, target);
                    graph.init();
            }).catch( error => {
                console.log(error);
            });
        }
        
    }

    function createElement(tag, style, text = '') {
        const element = document.createElement(tag);
        element.innerHTML = text;
        element.classList.add(style);
        return element;
    }
    
    getData(dailyAPI, arrayParamRed[0]);
    
    document.querySelector('.switchButton.next').addEventListener('click', () => {
        let country;
        let target;
        if (document.querySelector('tr.chosen') !== null) {
            country = document.querySelector('tr.chosen').getAttribute('iso2');
            target = document.querySelector('tr.chosen').children[1].textContent;
        }
        document.querySelector('.graphBlock').innerHTML = '';
        if (document.querySelector('.switchButton').classList.value === 'switchButton previous fullScreen') {
            getParams('sum', true, country, target);
        } else {
            getParams('sum', false, country, target);
        }
       
    });
    document.querySelector('.switchButton.previous').addEventListener('click', () => {
        let country; 
        let target;
        if (document.querySelector('tr.chosen') !== null) {
            country = document.querySelector('tr.chosen').getAttribute('iso2');
            target = document.querySelector('tr.chosen').children[1].textContent;
        }
        document.querySelector('.graphBlock').innerHTML = '';
        if (document.querySelector('.switchButton').classList.value === 'switchButton previous fullScreen') {
            getParams('minus', true, country, target);
        } else {
            getParams('minus', false, country, target);
        }
    });
    document.querySelector('.open').addEventListener('click', () => {
        const close = createElement('div', 'close', 'x');
        document.body.append(close);
        document.querySelector('.graphBlock').classList.add('fullScreen');
        document.querySelector('.graphBlock').innerHTML = '';
        document.querySelector('.switchBlock').classList.add('fullScreen');
        document.querySelector('.switchButton.previous').classList.add('fullScreen');
        document.querySelector('.switchButton.next').classList.add('fullScreen');
        document.querySelector('.open').style.display = 'none';
        const params = arrayParameter.indexOf(document.querySelector('.switchTitle').innerHTML);
        let countryName;
        if (document.querySelector('tr.chosen')) {
            countryName = document.querySelector('tr.chosen').children[1].textContent;
        }
        getData(dailyAPI, arrayParamRed[params], true, countryName);
        close.addEventListener('click', () => {
            document.querySelector('.graphBlock').classList.remove('fullScreen');
            document.querySelector('.canvasBlock').classList.remove('full');
            document.querySelector('.switchBlock.fullScreen').classList.remove('fullScreen');
            document.querySelector('.switchButton.previous.fullScreen').classList.remove('fullScreen');
            document.querySelector('.switchButton.next.fullScreen').classList.remove('fullScreen');
            document.querySelector('.open').style.display = 'flex';
            close.remove();
        })
    })

    setTimeout(() => {
        document.querySelectorAll('tbody tr').forEach(tr => {
            tr.addEventListener('click', () => {
                document.querySelectorAll('tr').forEach(item => {
                    if (item.classList.contains('chosen')) item.classList.remove('chosen');
                })
                tr.classList.add('chosen');
                const api = countriesAPI + tr.getAttribute('iso2');
                document.querySelector('.graphBlock').innerHTML = '';
                getData(api, arrayParamRed[0], false, tr.children[0].textContent);
            })
        })
    }, 800);
      
}

export default GraphInit;
