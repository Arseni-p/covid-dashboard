import { apiDataCommunicator } from '../logic/apiDataCommunicator.js';
import { sortTableByColumn } from '../logic/sortMethod.js';

export const tableGlobalCases = {
	properties: {
		data: null,
		totalCases: 0,
	},
	controlsUI: {
		globalCases: null,
		tableGlobal: null,
		dataUpdate: null,
		tableBody: null,
	},
	async init() {
		this.getElements();
		await this.getDataFromAPI();
		this.totalGlobalCases();
		this.createTableTwo();
		this.fillDataTableTwo();
        this.updateDate();
        this.addSorting();
	},

	async forceUpdateDataAndTime() {
		await this.getDataFromAPI();
		this.totalGlobalCases();
		this.fillDataTableTwo();
		this.updateDate();
	},

	getElements() {
		this.controlsUI.globalCases = document.querySelector('.global__count');
		this.controlsUI.tableGlobal = document.querySelector('.global__country');
		this.controlsUI.dataUpdate = document.querySelector('.update__wrapper');
	},

	async getDataFromAPI() {
		this.properties.data = await apiDataCommunicator.loadGeneralData();
	},

	totalGlobalCases() {
		this.properties.totalCases = 0;
		for (let i = 0; i < this.properties.data.length; i++) {
			this.properties.totalCases += this.properties.data[i].cases;
		}
		this.controlsUI.globalCases.innerText = new Intl.NumberFormat(
			'ru-RU'
		).format(this.properties.totalCases);
	},

	createTableTwo() {
		const tableTwo = `<table class="tableTwo">
            <thead>    
                <tr>
                <th valueType="number">Cases</th>
                    <th>County</th>
                </tr>
            </thead>
            <tbody></tbody>
            </table>`;
		this.controlsUI.tableGlobal.innerHTML = tableTwo;
		this.controlsUI.tableBody = document.querySelector('.tableTwo tbody');
	},

	fillDataTableTwo() {
		let body = '';
		for (let i = 0; i < this.properties.data.length; i++) {
			body += `<tr iso2='${this.properties.data[i].countryInfo.iso2}'>
                                <td>${new Intl.NumberFormat('ru-RU').format(
																	this.properties.data[i].cases
																)}</td>
                                <td><img src= '${
																	this.properties.data[i].countryInfo.flag
																}'>${this.properties.data[i].country}</td>
                            </tr>`;
		}
		this.controlsUI.tableBody.innerHTML = body;
	},

	addSorting() {
        const headerList = document.querySelectorAll('.tableTwo th');
        headerList.forEach((headerCell) => {
			headerCell.addEventListener('click', () => {
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
        headerList[0].click();
        headerList[0].click();
	},

	updateDate() {
		this.controlsUI.dataUpdate.innerText = new Date().toLocaleDateString(
			'en-GB'
		);
	},
};
export default tableGlobalCases;
