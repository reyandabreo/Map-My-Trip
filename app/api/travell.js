const url = 'https://travel-places.p.rapidapi.com/';
const options = {
	method: 'POST',
	headers: {
		'x-rapidapi-key': '6a5a009400msh55017f68f4b3970p176f5fjsnf8c3fa21c849',
		'x-rapidapi-host': 'travel-places.p.rapidapi.com',
		'Content-Type': 'application/json'
	},
	body: {
		query: 'query MyQuery {\n  getPlaces\n}'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}