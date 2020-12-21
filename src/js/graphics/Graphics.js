const Chart = require('chart.js');

class Graphics {
    constructor(obj, parameter, screen) {
        this.total = obj;
        this.totalDays = obj.data;
        this.fullScreen = screen;
        this.parameter = parameter;
    }
    

    init() {
        const mes = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
        const mesReduced = ['Янв.  ', 'Февр.  ', 'Март  ', 'Апр.  ', 'Май  ', 'Июнь  ', 'Июль  ', 'Авг.  ', 'Сент.  ', 'Окт.  ', 'Нояб.  ', 'Дек.  ']

        const ctx = this.createElement('canvas', 'canvas');
        ctx.id = 'myChart';
        ctx.setAttribute('width', '295');
        ctx.setAttribute('height', '190');
        let param = this.parameter;
        const screen = this.fullScreen;
        let color = '';
        if (this.parameter === 'recovered' || this.parameter === 'allRecov') {
            color = 'rgb(73, 178, 9)';
        } else if (this.parameter === 'cases' || this.parameter === 'allCases') {
            color = 'rgb(255, 165, 0)';
        } else if (this.parameter === 'deaths' || this.parameter === 'allDeaths') {
            color = 'rgb(255, 0, 0)';
        }
        let charType = 'bar';
        if (this.parameter[0] === 'a') {
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
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            fontSize: 10,
                            autoSkip: screen,
                            fontColor: 'rgba(255, 255, 255, 0.8)',
                            callback: function inner(dataLabel) {
                                let newLabel = dataLabel;
                                let coef;
                            
                                if (param === 'deaths') {
                                    coef = 3000;
                                } else {
                                    coef = 400000;
                                }
                                if (String(newLabel).length <= 6 && newLabel !== 0) {
                                    newLabel = `${dataLabel / 1000}k`;
                                } else if (String(newLabel).length > 6) {
                                    newLabel = `${dataLabel / 1000000}M`;
                                } 
                                return +dataLabel % coef === 0 ? newLabel : '';
                                
                            }
                        }
                    }],
                    xAxes: [{
                        ticks: {
                            fontSize: screen ? 13 : 11,
                            fontColor: 'rgba(255, 255, 255, 0.8)',
                            autoSkip: true,
                            autoSkipPadding: 15,
                            maxRotation: 0,
                            callback: function inner(dataLabel) {
                                const newLabel = dataLabel.split('/');
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
