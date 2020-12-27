
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
			this.properties.data = null;
		}
		return this.properties.data;
    }
   };
export default apiDataCommunicator;
