

export function sortTableByColumn(table, column, asc = true, valueType) {
	const sortModifier = asc ? 1 : -1;
	const tBody = table.tBodies[0];
	const rows = Array.from(tBody.querySelectorAll('tr'));
	const isNumberSorting = valueType === 'number';

	const sortedRows = rows.sort((a, b) => {
		let aColValue;
		let bColValue;
		aColValue = a
			.querySelector(`td:nth-child(${column + 1})`)
			.textContent.trim();
		bColValue = b
			.querySelector(`td:nth-child(${column + 1})`)
			.textContent.trim();

		if (isNumberSorting) {
			aColValue = parseFloat(aColValue.replaceAll(/\s/gi, ''));
			bColValue = parseFloat(bColValue.replaceAll(/\s/gi, ''));
		}

		return aColValue > bColValue ? 1 * sortModifier : -1 * sortModifier;
	});

	while (tBody.firstChild) {
		tBody.removeChild(tBody.firstChild);
	}

	tBody.append(...sortedRows);

	table
		.querySelectorAll('th')
		.forEach((th) => th.classList.remove('sort-asc', 'sort-desc'));
	table
		.querySelector(`th:nth-child(${column + 1})`)
		.classList.toggle('sort-asc', asc);
	table
		.querySelector(`th:nth-child(${column + 1})`)
		.classList.toggle('sort-desc', !asc);
}

export default sortTableByColumn;
