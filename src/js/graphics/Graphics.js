const Chart = require('chart.js');

class Graphics {
    constructor(obj, parameter, screen = false, world, target = 'World') {
        this.total = obj;
        this.totalDays = obj.data;
        this.fullScreen = screen;
        this.parameter = parameter;
        this.world = world;
        this.target = target;
    }
    
    init() {
        const mes = ['Январь   ', 'Февраль   ', 'Март   ', 'Апрель   ', 'Май   ', 'Июнь   ', 'Июль   ', 'Август   ', 'Сентябрь   ', 'Октябрь   ', 'Ноябрь   ', 'Декабрь   '];
        const mesReduced = ['Янв.  ', 'Февр.  ', 'Март  ', 'Апр.  ', 'Май  ', 'Июнь  ', 'Июль  ', 'Авг.  ', 'Сент.  ', 'Окт.  ', 'Нояб.  ', 'Дек.  '];
        const ctx = this.createElement('canvas', 'canvas');
        ctx.id = 'myChart';
        ctx.setAttribute('width', '295');
        ctx.setAttribute('height', '190');
        let param = this.parameter;
        const screen = this.fullScreen;
        const world = this.world;
        let color = '';
        if (this.parameter === 'recovered' || this.parameter === 'allRecov' 
            || this.parameter === 'recoveredHun' || this.parameter === 'hunAllRecovered') {
            color = 'rgba(0, 167, 0, 0.7)';
        } else if (this.parameter === 'cases' || this.parameter === 'allCases'
            || this.parameter === 'casesHun' || this.parameter === 'hunAllCases') {
            color = ' rgba(255, 0, 0, 0.7)';
        } else if (this.parameter === 'deaths' || this.parameter === 'allDeaths'
            || this.parameter === 'deathsHun' || this.parameter === 'hunAllDeaths') {
            color = 'rgba(255, 210, 0, 0.7)';
        }
        let charType = 'bar';
        if (this.parameter[0] === 'a' || this.parameter[0] === 'h') {
            charType = 'line';
        }
        
        const myChart = new Chart(ctx, {
            type: charType,
            data: {
                labels: this.totalDays,
                datasets: [{
                    label: '',
                    fill: false,
                    data: this.total[this.parameter],
                    backgroundColor: color,
                    borderColor: color,
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                legend: {
                    labels: ''
                },
                title: {
                    display: true,
                    text: this.target,
                    fontColor: '#e1d2d2',
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            fontSize: screen ? 13 : 11,
                            autoSkip: screen,
                            fontColor: 'rgba(255, 255, 255, 0.8)',
                            callback: function inner(dataLabel) {
                                let newLabel = dataLabel;
                                let coef;
                                if (!world) {
                                    if (param === 'deaths') {
                                        coef = 200;
                                    } else {
                                        coef = 3000; 
                                    }
                                    if (param === 'casesHun' || param === 'recoveredHun' || 
                                    param === 'deathsHun' ) {
                                        coef = 0.02;
                                    }
                                } else {
                                    if (param === 'deaths') {
                                        coef = 3000;
                                    } else {
                                        coef = 400000;
                                    }
                                    if (param[0] === 'h') {
                                        coef = 300;
                                        if(param === 'hunAllDeaths') {
                                            coef = 5;
                                        }
                                    }
                                    if (param === 'casesHun' || param === 'recoveredHun') {
                                        coef = 5;
                                    }
                                    if (param === 'deathsHun') {
                                        coef = 0.02;
                                    }
                                }
                                
                                if (newLabel <= 100000 && newLabel >= 1000 && newLabel !== 0) {
                                    newLabel = `${dataLabel / 1000}k`;
                                } else if (newLabel > 100000) {
                                    newLabel = `${dataLabel / 1000000}M`;
                                } 
                                return +dataLabel % coef === 0 ? newLabel : '';
                                
                            }
                        }
                    }],
                    xAxes: [{
                        ticks: {
                            fontSize: screen ? 16 : 11,
                            fontColor: 'rgba(255, 255, 255, 0.8)',
                            autoSkip: true,
                            autoSkipPadding: 15,
                            maxRotation: 0,
                            callback: function inner(dataLabel) {
                                let newLabel = dataLabel;
                                if (typeof dataLabel === 'string') {
                                    newLabel = dataLabel.split('/');
                                }                                
                                let strLabel = '';
                                strLabel = screen ? mes[+newLabel[0] - 1] : mesReduced[+newLabel[0] - 1];
                                return strLabel;
                            }
                        },
                    }]
                }
            }
        });
        const canvasBlock = this.createElement('div', 'canvasBlock');
            if (this.fullScreen) {
                canvasBlock.classList.add('full');
            }
            canvasBlock.append(ctx)
        document.querySelector('.graphBlock').append(canvasBlock);
    }

    createElement(tag, style, text = '') {
        this.funcName = 'createElement';
        const element = document.createElement(tag);
        element.innerHTML = text;
        element.classList.add(style);
        return element;
    }
}

export default Graphics;
