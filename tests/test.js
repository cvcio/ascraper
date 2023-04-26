const feeds = require('../data/feeds.json');
const ascraper = require('../src');

for (var i = 0; i < 2; i++) {
	let f = feeds.data.data[i];
	if (f.testURL !== '' && f.screen_name !== 'amna_news') {
		ascraper.extract(f.testURL, 'socks://127.0.0.1:9201')
			.then(res => {
				console.log(`SUCCESS ${res.date} ${res.title}`);
			})
			.catch((err) => {
				if (err.response) {
					console.dir(err.response.status);
				}
				console.error(`ERROR ${f.screen_name}`, err.message);
			});
	}

	// if (f.screen_name === 'amna_news') {
	// 	ascraper.fetchAPI('https://www.amna.gr/feeds/getarticle.php?id=283022&infolevel=ADVANCED')
	// 		.then(res => {
	// 			console.log(`SUCCESS ${res.c_daytime} ${res.title}`);
	// 		})
	// 		.catch((err) => {
	// 			console.error(`ERROR ${f.screen_name}`, err.message);
	// 		});
	// }
}
