import Graphics from './Graphics';

const GraphInit = () => { 
    const graphBlock = document.createElement('div');
        graphBlock.classList.add('graphBlock');
    document.querySelector('.data.data__graph').append(graphBlock);
    const arrayParameter = ['Daily cases', 'Daily deaths', 'Daily recovered', 'Total cases', 'Total deaths', 'Total recovered'];
    const arrayParamRed = ['cases', 'deaths', 'recovered', 'allCases', 'allDeaths', 'allRecov'];

    function getParams(operation) {
        const paramsNow = document.querySelector('.switchTitle').innerHTML;
        let indParams;
        if (arrayParameter.indexOf(paramsNow) === -1) {
            indParams = 0;
        } else {
            indParams = arrayParameter.indexOf(paramsNow);
        }
        if (indParams === arrayParamRed.length - 1) {
            indParams = -1;
        }
        if (operation === 'sum') {
            document.querySelector('.switchTitle').innerHTML = `${arrayParameter[indParams + 1]}`;
            getData(dailyAPI, arrayParamRed[indParams + 1], false);
        } else {
            // дописать
            console.log(indParams)
            document.querySelector('.switchTitle').innerHTML = indParams !== 0 ? `${arrayParameter[indParams - 1]}` : `${arrayParameter[arrayParameter.length - 1]}`;
            getData(dailyAPI, arrayParamRed[indParams - 1], false);
        }
        
    }

    function setTotalCases(data) {
        const obj = {
            data: [],
            cases: [],
            deaths: [],
            recovered: [],
            allCases: [],
            allDeaths: [],
            allRecov: []
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
        obj.cases = arrDiff;
        obj.deaths = arrDiffDeath;
        obj.recovered = arrDiffRec;
        obj.data = obj.data.slice(1);
        obj.allCases = arrCases;
        obj.allDeaths = arrDeath;
        obj.allRecov = arrRecov;
        return obj;
    }

    function getData(api, param, screen) {
        fetch(api)
        .then( response => response.json())
        .then(res => {
            const total = setTotalCases(res);
            const graph = new Graphics(total, param, screen);
                graph.init();
        }).catch( error => {
            console.log(error);
        });
    }

    const dailyAPI = 'https://disease.sh/v3/covid-19/historical/all?lastdays=366';
    getData(dailyAPI, arrayParamRed[0]);
    
    document.querySelector('.switchButton.next').addEventListener('click', () => {
        document.querySelector('.graphBlock').innerHTML = '';
        getParams('sum');
    });
    document.querySelector('.switchButton.previous').addEventListener('click', () => {
        document.querySelector('.graphBlock').innerHTML = '';
        getParams('minus');
    });
    document.querySelector('.open').addEventListener('click', () => {
        const close = document.createElement('div');
            close.classList.add('close');
            close.innerHTML = 'x';
        document.body.append(close);
        document.querySelector('.graphBlock').classList.add('fullScreen');
        document.querySelector('.graphBlock').children[0].classList.add('full');
        document.querySelector('.graphBlock').innerHTML = '';
        const params = arrayParameter.indexOf(document.querySelector('.switchTitle').innerHTML)
        getData(dailyAPI, arrayParamRed[params], true);
        close.addEventListener('click', () => {
            document.querySelector('.graphBlock').classList.remove('fullScreen');
            document.querySelector('.graphBlock').children[0].classList.remove('full');
            close.remove();
        })
    })
}

export default GraphInit;