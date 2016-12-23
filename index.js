function sortData(arr, curItem) {
	switch(curItem.type) {
		case 'Person':
			const curPerson = curItem.name;
			delete curItem.name
			if(arr.length > 1 && arr[arr.length - 1].type === 'Person') {
				const lastPerson = arr.pop().people;
				return [...arr, Object.assign(curItem, { people: [...lastPerson, curPerson] })];
			} else {
				return [...arr, Object.assign(curItem, { people: [curPerson] })];
			}
		default:
			return [...arr, curItem];
	}
}

// mapData is function to map and sort data

function mapData(data) {
	return data.sort((a, b) => a.order - b.order)
				.reduce((prev, cur) => {
					return sortData(prev, cur);
				}, []);
}

function renderTable() {
	const tableBody = document.getElementById('table-body');
	let renderedNode = '';
	mapData(resources).forEach(item => {
		renderedNode += `
			<tr>
				<td>${item.order}</td>
				<td>${item.type}</td>
				<td>${item.type === 'Person' ? item.people.join(', ') : item.name}</td>
			</tr>
		`;
	})
	tableBody.innerHTML = renderedNode;
}

renderTable();