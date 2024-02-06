const feeds = require('../data/feeds.json');
const ascraper = require('../src');
const links = [
	{ testURL: 'https://ellinismos-orthodoxia.gr/2021/02/01/αυστραλία-η-γηραιότερη-ομογενής-είνα/', err: true },
	{ testURL: 'https://www.aerasnews.gr/sovaro-trochaio-atychima-sti-diastayrosi-lepenoys/', err: true },
	{ testURL: 'http://freddonews.gr/index.php/ioannidoy-ntrio-fotiadi-aytos-einai-o-pragmatikos-logos-poy-i-triada-tis-fotias-den-milaei-pia/', err: false },
	{ testURL: 'http://patrastimes.gr/πολιτική/κεραμέως-προτεραιότητά-μας-είναι-τα-α/', err: true },
	{ testURL: 'http://www.paragogi.net/9117/h-eyfyhs-gewrgia-aykshse-thn-paragwgh-sta-viologika-fasolia-twn-prespwn', err: false },
	{ testURL: 'https://www.ant1news.gr/ygeia-periballon/article/594139/koronoios-trito-kyma-kai-metallaxeis-odigoyn-se-oliko-lockdown', err: false },
	{ testURL: 'https://www.lykavitos.gr/news/politics/mitsotakis-gia-ta-f-35-simantiki-imera-gia-tin-ethniki-mas-amyna-kai-tin-elliniki-diplom', err: false },
	{ testURL: 'https://www.parapolitika.gr/article/mitsotakis-anti-gia-fiestes-stis-20-avgoustou-tsipras-na-prokirixi-eklog', err: true },
	{ testURL: 'https://www.reporter.gr/Eidhseis/Oikonomia/360964-Oi-Ellhnes-forologoymenoi-apofeygoyn-thn-plhrwmh-forwn-me-pistwtikes', err: false }
];

for (let i = 0; i < links.length; i++) {
	const f = links[i];
	if (f.testURL !== '') {
		ascraper.extract(f.testURL, '')
			.then((r) => {
				if (f.err) {
					console.error(`ERROR ${f.testURL}`);
					return;
				}
				console.log(`SUCCESS ${f.testURL}`);
			})
			.catch((err) => {
				if (!f.err) {
					console.error(`ERROR ${f.testURL}`);
					console.error(err);
					return;
				}
				console.log(`SUCCESS ${f.testURL}`);
			});
	}
}
