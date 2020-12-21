/*Data fields from API*/

/* data: [
	{
		updated: 1608139128585,
		country: 'Afghanistan',
		countryInfo: {
			_id: 4,
			iso2: 'AF',
			iso3: 'AFG',
			lat: 33,
			long: 65,
			flag: 'https://disease.sh/assets/img/flags/af.png',
		},
		cases: 49970,
		todayCases: 267,
		deaths: 2017,
		todayDeaths: 16,
		recovered: 38648,
		todayRecovered: 148,
		active: 9305,
		critical: 93,
		casesPerOneMillion: 1271,
		deathsPerOneMillion: 51,
		tests: 174711,
		testsPerOneMillion: 4443,
		population: 39324007,
		continent: 'Asia',
		oneCasePerPeople: 787,
		oneDeathPerPeople: 19496,
		oneTestPerPeople: 225,
		activePerOneMillion: 236.62,
		recoveredPerOneMillion: 982.81,
		criticalPerOneMillion: 2.36,
	},
]; */

export const apiDataCommunicator = {
	properties: {
		isDataLoad: false,
		data: null,
	},

	async loadGeneralData() {
		try {
			this.properties.data = await fetch(
				'https://corona.lmao.ninja/v3/covid-19/countries'
			);
			this.properties.data = await this.properties.data.json();
		} catch (error) {
			/* eslint-disable no-console */
			console.log(error.toString());
			/* eslint-enable no-console */
			this.properties.data = null;
		}
		return this.properties.data;
	},
};
export default apiDataCommunicator;
