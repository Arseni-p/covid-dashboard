import { apiDataCommunicator } from '../logic/apiDataCommunicator.js';
import { sortTableByColumn } from '../logic/sortMethod.js';
import formatInt from '../logic/format.js';
import Slider from './slider.js';

export const mainTableTwelveIndex = {
	properties: {
		data: null,
		worldCases: 0,
		worldDeaths: 0,
		worldRecovered: 0,
		tabsTableData: [
			{
				tabName: 'Cumulative',
				rows: [
					{
						name: 'Cases',
						value: (x) => x['cases'],
					},
					{
						name: 'Deaths',
						value: (x) => x['deaths'],
					},
					{
						name: 'Recovered',
						value: (x) => x['recovered'],
					},
				],
			},
			{
				tabName: 'Daily Data',
				rows: [
					{
						name: 'Cases',
						value: (x) => x['todayCases'],
					},
					{
						name: 'Deaths',
						value: (x) => x['todayDeaths'],
					},
					{
						name: 'Recovered',
						value: (x) => x['todayRecovered'],
					},
				],
			},
			{
				tabName: 'Cumulative per 100 th',
				rows: [
					{
						name: 'Cases',
						value: (x) => x['casesPerOneMillion'] / 10,
					},
					{
						name: 'Deaths',
						value: (x) => x['deathsPerOneMillion'] / 10,
					},
					{
						name: 'Recovered',
						value: (x) => x['recoveredPerOneMillion'] / 10,
					},
				],
			},
			{
				tabName: 'Daily per 100 th',
				rows: [
					{
						name: 'Cases',
						value: (x) => (x['todayCases'] / x['population']) * 100000,
					},
					{
						name: 'Deaths',
						value: (x) => (x['todayDeaths'] / x['population']) * 100000,
					},
					{
						name: 'Recovered',
						value: (x) => (x['todayRecovered'] / x['population']) * 100000,
					},
				],
			},
		],
		tabIndex: 0,
		slider: null,
	},
	controlsUI: {
		tableWorldTotal: null,
		tbodyWorldTotal: null,
		tableTwelveIndex: null,
		tableBodyTwelveIndex: null,
		tableSwitch: null,
		cases: null,
		deaths: null,
		recovered: null,
	},

	async init() {
		this.getElements();
		await this.getDataFromAPI();
		this.createTableWorldCases();
		this.fillDataTableWorldCases();
		this.addTabsSwitcher();
        this.drawTableAccordingSwitch();
	},

	drawTable() {
		this.drawHeaderTable();
		this.drawBodyTable();
		this.addSorting();
	},

	addTabsSwitcher() {
		this.properties.slider = new Slider(this.controlsUI.tableSwitch);
		this.properties.slider.init();
		this.properties.slider.leftButton.addEventListener('click', () =>
			this.drawTableAccordingSwitch(-1)
		);
		this.properties.slider.rightButton.addEventListener('click', () =>
			this.drawTableAccordingSwitch(+1)
		);
	},

	drawTableAccordingSwitch(delta=0) {
		this.properties.tabIndex += delta;

		if (this.properties.tabIndex === -1)
			this.properties.tabIndex = this.properties.tabsTableData.length - 1;
		else if (this.properties.tabIndex === this.properties.tabsTableData.length)
			this.properties.tabIndex = 0;

		this.drawTable();
		this.properties.slider.description.innerText = this.properties.tabsTableData[
			this.properties.tabIndex
		].tabName;
	},

	async forceUpdateDataAndTime() {
		await this.getDataFromAPI();
		this.fillDataTableWorldCases();
		this.drawTable();
	},

	getElements() {
		this.controlsUI.tableWorldTotal = document.querySelector('.data__world');
		this.controlsUI.tableTwelveIndex = document.querySelector(
			'.data__tableTwelveIndex'
		);
		this.controlsUI.tableSwitch = document.querySelector(
			'.switch__tableTwelveIndex'
		);
	},

	async getDataFromAPI() {
		this.properties.data = await apiDataCommunicator.loadGeneralData();
	},

	createTableWorldCases() {
		const tableWorld = `<table class="table__world">
            <thead>    
                <tr>
                    <th rowspan="2">Global</th>
                    <th valueType="number">Cases</th>
                    <th valueType="number">Deaths</th>
                    <th valueType="number">Recovered</th>
                </tr>
                <tbody>
                <tr>
                    <td >World</td>
                    <td class="global__cases"></td>
                    <td class="global__deaths"></td>
                    <td class="global__recovered"></td>
                </tr>
                </tbody>
            </table>`;
		this.controlsUI.tableWorldTotal.innerHTML = tableWorld;
	},

	fillDataTableWorldCases() {
		this.properties.worldCases = 0;
		for (let i = 0; i < this.properties.data.length; i++) {
			this.properties.worldCases += this.properties.data[i].cases;
		}
		this.controlsUI.cases = document.querySelector('.global__cases');
		this.controlsUI.cases.innerHTML = formatInt(this.properties.worldCases);

		this.properties.worldDeaths = 0;
		for (let j = 0; j < this.properties.data.length; j++) {
			this.properties.worldDeaths += this.properties.data[j].deaths;
		}

		this.controlsUI.deaths = document.querySelector('.global__deaths');
		this.controlsUI.deaths.innerHTML = formatInt(this.properties.worldDeaths);

		this.properties.worldRecovered = 0;
		for (let z = 0; z < this.properties.data.length; z++) {
			this.properties.worldRecovered += this.properties.data[z].recovered;
		}

		this.controlsUI.recovered = document.querySelector('.global__recovered');
		this.controlsUI.recovered.innerHTML = formatInt(
			this.properties.worldRecovered
		);
	},

	drawHeaderTable() {
		const childElements = [...this.controlsUI.tableTwelveIndex.children];
		childElements.forEach((element) => element.remove());

		let tableHeader = `<table class="table__twelve">
            <thead>    
                <tr>
                <th>Country</th>`;

		for (
			let i = 0;
			i < this.properties.tabsTableData[this.properties.tabIndex].rows.length;
			i++
		) {
			tableHeader += `<th valueType="number">${
				this.properties.tabsTableData[this.properties.tabIndex].rows[i].name
			}</th>`;
		}

		tableHeader += `
                </tr>
                </thead>
            <tbody></tbody>
            </table>`;
		this.controlsUI.tableTwelveIndex.innerHTML = tableHeader;
		this.controlsUI.tableBodyTwelveIndex = document.querySelector(
			'.table__twelve tbody'
		);
	},

	drawBodyTable() {
		let body = '';
		for (let i = 0; i < this.properties.data.length; i++) {
			body += `<tr iso2='${this.properties.data[i].countryInfo.iso2}'> 
            <td><img src= '${this.properties.data[i].countryInfo.flag}'>${this.properties.data[i].country}</td>`;
			for (
				let y = 0;
				y < this.properties.tabsTableData[this.properties.tabIndex].rows.length;
				y++
			) {
				body += `<td> ${formatInt(
					this.properties.tabsTableData[this.properties.tabIndex].rows[y].value(
						this.properties.data[i]
					)
				)}</td>`;
			}
			body += '</tr>';
		}
		this.controlsUI.tableBodyTwelveIndex.innerHTML = body;
	},

	addSorting() {
		const headerList = document.querySelectorAll('.table__twelve th');
		headerList.forEach((headerCell) => {
			headerCell.addEventListener('click', () => {
				console.log('rvgshjdfkhsdkj');
				const tableElement =
					headerCell.parentElement.parentElement.parentElement;
				const columnIndex = Array.prototype.indexOf.call(
					headerCell.parentElement.children,
					headerCell
				);
				const isAscending = headerCell.classList.contains('sort-asc');
				sortTableByColumn(
					tableElement,
					columnIndex,
					!isAscending,
					headerCell.getAttribute('valueType')
				);
			});
		});
		headerList[1].click();
		headerList[1].click();
	},
};
export default mainTableTwelveIndex;
