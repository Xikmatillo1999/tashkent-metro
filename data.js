// Auto-generated full station mock data
const allStations = [
    // Chilonzor Line
    { id: 'buyuk-ipak-yuli', line: 'chilonzor', name: 'Buyuk Ipak Yuli' },
    { id: 'pushkin', line: 'chilonzor', name: 'Pushkin' },
    { id: 'hamid-olimjon', line: 'chilonzor', name: 'Hamid Olimjon' },
    { id: 'amir-temur', line: 'chilonzor', name: 'Amir Temur Xiyoboni' },
    { id: 'mustaqillik', line: 'chilonzor', name: 'Mustaqillik Maydoni' },
    { id: 'paxtakor', line: 'chilonzor', name: 'Paxtakor' },
    { id: 'xalqlar', line: 'chilonzor', name: "Xalqlar Do'stligi" },
    { id: 'milliy-bog', line: 'chilonzor', name: "Milliy Bog'" },
    { id: 'novza', line: 'chilonzor', name: 'Novza' },
    { id: 'mirzo-ulugbek', line: 'chilonzor', name: 'Mirzo Ulugbek' },
    { id: 'chilonzor', line: 'chilonzor', name: 'Chilonzor' },
    { id: 'olmazor', line: 'chilonzor', name: 'Olmazor' },
    { id: 'choshtepa', line: 'chilonzor', name: 'Choshtepa' },
    { id: 'ozgarish', line: 'chilonzor', name: "O'zgarish" },
    { id: 'sergeli', line: 'chilonzor', name: 'Sergeli' },
    { id: 'yangihayot', line: 'chilonzor', name: 'Yangihayot' },
    { id: 'chinor', line: 'chilonzor', name: 'Chinor' },

    // O'zbekiston Line
    { id: 'beruniy', line: 'ozbekiston', name: 'Beruniy' },
    { id: 'tinchlik', line: 'ozbekiston', name: 'Tinchlik' },
    { id: 'chorsu', line: 'ozbekiston', name: 'Chorsu' },
    { id: 'gafur-gulom', line: 'ozbekiston', name: 'Gafur Gulom' },
    { id: 'alisher-navoiy', line: 'ozbekiston', name: 'Alisher Navoiy' },
    { id: 'ozbekiston', line: 'ozbekiston', name: "O'zbekiston" },
    { id: 'kosmonavtlar', line: 'ozbekiston', name: 'Kosmonavtlar' },
    { id: 'oybek', line: 'ozbekiston', name: 'Oybek' },
    { id: 'toshkent', line: 'ozbekiston', name: 'Toshkent' },
    { id: 'mashinasozlar', line: 'ozbekiston', name: 'Mashinasozlar' },
    { id: 'dustlik', line: 'ozbekiston', name: "Do'stlik" },

    // Yunusobod Line
    { id: 'turkiston', line: 'yunusobod', name: 'Turkiston' },
    { id: 'shahriston', line: 'yunusobod', name: 'Shahriston' },
    { id: 'bodomzor', line: 'yunusobod', name: 'Bodomzor' },
    { id: 'minor', line: 'yunusobod', name: 'Minor' },
    { id: 'abdulla-qodiriy', line: 'yunusobod', name: 'Abdulla Qodiriy' },
    { id: 'yunus-rajabiy', line: 'yunusobod', name: 'Yunus Rajabiy' },
    { id: 'ming-orik', line: 'yunusobod', name: "Ming O'rik" },

    // Halqa Line (Circle)
    { id: 'texnopark', line: 'halqa', name: 'Texnopark' },
    { id: 'yashnobod', line: 'halqa', name: 'Yashnobod' },
    { id: 'tuzel', line: 'halqa', name: 'Tuzel' },
    { id: 'olmos', line: 'halqa', name: 'Olmos' },
    { id: 'rohat', line: 'halqa', name: 'Rohat' },
    { id: 'yangiobod', line: 'halqa', name: 'Yangiobod' },
    { id: 'qoyliq', line: 'halqa', name: "Qo'yliq" },
    { id: 'matonat', line: 'halqa', name: 'Matonat' },
    { id: 'qiyot', line: 'halqa', name: 'Qiyot' },
    { id: 'tolariq', line: 'halqa', name: 'Tolariq' },
    { id: 'xontepa', line: 'halqa', name: 'Xontepa' },
    { id: 'quruvchilar', line: 'halqa', name: 'Quruvchilar' },
    { id: 'turon', line: 'halqa', name: 'Turon' },
    { id: 'qipchoq', line: 'halqa', name: 'Qipchoq' }
];

const appData = {
    schedules: {},
    services: {},
    stationsList: allStations,
    news: [
        { id: 1, type: 'alert', dateKey: 'date-today', titleKey: 'news-title-1', contentKey: 'news-content-1' },
        { id: 2, type: 'info', dateKey: 'date-yesterday', titleKey: 'news-title-2', contentKey: 'news-content-2' }
    ]
};

// Generate Mock Data on the client
allStations.forEach(st => {
    // Schedules
    appData.schedules[st.id] = [
        { id: Math.random(), destination: 'Terminal', line: st.line, time: Math.floor(Math.random() * 5 + 1) + ' min', interval: '5-8 min', color: 'var(--line-' + st.line + ')' },
        { id: Math.random(), destination: 'Depo', line: st.line, time: Math.floor(Math.random() * 10 + 6) + ' min', interval: '5-8 min', color: 'var(--line-' + st.line + ')' }
    ];

    // Services
    appData.services[st.id] = [
        { id: 'wifi', icon: 'wifi-outline', nameKey: 'srv-wifi', status: Math.random() > 0.1 ? 'available' : 'unavailable' },
        { id: 'wc', icon: 'water-outline', nameKey: 'srv-wc', status: Math.random() > 0.3 ? 'available' : 'unavailable' },
        { id: 'atm', icon: 'card-outline', nameKey: 'srv-atm', status: Math.random() > 0.2 ? 'available' : 'unavailable' }
    ];

    if (Math.random() > 0.5) {
        appData.services[st.id].push({ id: 'elevator', icon: 'arrow-up-circle-outline', nameKey: 'srv-elevator', status: Math.random() > 0.4 ? 'available' : 'unavailable' });
    }
});

// Premium Station Details Info
const stationImages = {
    'beruniy': 'Beruniy.jpg',
    'bodomzor': 'Bodomzоr.jpg',
    'buyuk-ipak-yuli': 'Buyuk-Ipak-yoli.jpg',
    'chorsu': 'Chorsu.jpg',
    'gafur-gulom': 'Gаfur-Gulom.jpg',
    'kosmonavtlar': 'Kosmonavtlar.jpg',
    'minor': 'Minor.jpg',
    'novza': 'Novza.jpg',
    'oybek': 'Oybеk.jpg',
    'paxtakor': 'Paxtakor.jpg',
    'shahriston': 'Shaxriston.jpg',
    'toshkent': 'Toshkеnt.jpg',
    'turkiston': 'Turkiston.jpg',
    'hamid-olimjon': 'Xamid-Olimjon.jpg',
    'yunus-rajabiy': 'Yunus-Rajаbiy.jpg'
};

appData.details = {};

allStations.forEach(st => {
    let photoUrl = 'assets/map.jpg'; // default placeholder
    if (stationImages[st.id]) {
        photoUrl = 'assets/stations/' + stationImages[st.id];
    }

    let historyText = { en: '', ru: '', uz: '' };

    // History logic
    if (st.line === 'chilonzor') {
        const opened1977 = ['paxtakor', 'amir-temur', 'novza', 'olmazor', 'buyuk-ipak-yuli'];
        if (opened1977.includes(st.id)) {
            historyText = {
                en: 'Opened in 1977 as part of the first metro line in Central Asia.',
                ru: 'Открыта в 1977 году как часть первой линии метро в Центральной Азии.',
                uz: "1977-yilda Markaziy Osiyodagi birinchi metro liniyasining bir qismi sifatida ochilgan."
            };
        } else {
            historyText = {
                en: 'Part of the Chilonzor line, the oldest metro line in Tashkent.',
                ru: 'Часть Чиланзарской линии, старейшей линии метро в Ташкенте.',
                uz: "Toshkentdagi eng qadimgi metro liniyasi bo'lgan Chilonzor yo'nalishining bir qismi."
            };
        }
    } else if (st.line === 'ozbekiston') {
        const opened1984_1991 = ['alisher-navoiy', 'oybek', 'toshkent', 'chorsu', 'gafur-gulom', 'beruniy'];
        if (opened1984_1991.includes(st.id)) {
            historyText = {
                en: 'Opened between 1984 and 1991, connecting the city center with northwestern districts.',
                ru: 'Открыта между 1984 и 1991 годами, соединяя центр города с северо-западными районами.',
                uz: "1984-1991 yillar oralig'ida ochilgan bo'lib, shahar markazini shimoli-g'arbiy tumanlar bilan bog'laydi."
            };
        } else {
            historyText = {
                en: "Part of the O'zbekiston line, expanding the metro network.",
                ru: 'Часть Узбекистанской линии, расширяющей сеть метро.',
                uz: "Metro tarmog'ini kengaytiruvchi O'zbekiston yo'nalishining bir qismi."
            };
        }
    } else if (st.line === 'yunusobod') {
        const opened2001_2020 = ['yunus-rajabiy', 'ming-orik', 'bodomzor', 'minor', 'shahriston', 'turkiston'];
        if (opened2001_2020.includes(st.id)) {
            historyText = {
                en: 'Built between 2001 and 2020, serving the northern districts of Tashkent.',
                ru: 'Построена между 2001 и 2020 годами, обслуживает северные районы Ташкента.',
                uz: "2001-2020 yillarda qurilgan bo'lib, Toshkentning shimoliy tumanlariga xizmat ko'rsatadi."
            };
        } else {
            historyText = {
                en: 'Station on the Yunusobod line.',
                ru: 'Станция Юнусабадской линии.',
                uz: "Yunusobod yo'nalishidagi bekat."
            };
        }
    } else if (st.line === 'halqa') {
        historyText = {
            en: 'A newly built elevated station part of the Circle Line (2020+).',
            ru: 'Новая надземная станция, входящая в Кольцевую линию (2020+).',
            uz: "Halqa yo'nalishining bir qismi bo'lgan yangi qurilgan yer usti bekati (2020+)."
        };
    }

    appData.details[st.id] = {
        photo: photoUrl,
        history: historyText,
        exits: [],
        nearby: []
    };
});

// Specific overwrites for requested stations
appData.details['alisher-navoiy'] = appData.details['alisher-navoiy'] || { exits: [], nearby: [] };
appData.details['alisher-navoiy'].exits = [
    { name: { en: "Navoiy Street, Palace of Arts", ru: "ул. Навои, Дворец искусств", uz: "Navoiy ko'chasi, San'at saroyi" } },
    { name: { en: "Tashkent City Mall and Tashkent City Park (Closest Exit)", ru: "Tashkent City Mall и Tashkent City Park (Ближайший выход)", uz: "Tashkent City Mall va Tashkent City Park (eng yaqin chiqish)" } }
];
appData.details['alisher-navoiy'].nearby = [
    { icon: 'business-outline', image: null, name: { en: 'Tashkent City', ru: 'Tashkent City', uz: 'Tashkent City' } },
    { icon: 'star-outline', image: null, name: { en: 'National Theater', ru: 'Национальный театр', uz: 'Milliy teatr' } },
    { icon: 'football-outline', image: null, name: { en: 'Pakhtakor Stadium', ru: 'Стадион Пахтакор', uz: 'Paxtakor stadioni' } }
];

appData.details['paxtakor'].exits = [
    { name: { en: "Pakhtakor Stadium, Navoiy Street", ru: "Стадион Пахтакор, ул. Навои", uz: "Paxtakor stadioni, Navoiy ko'chasi" } },
    { name: { en: "Alisher Navoiy Library, Tashkent City Park (North Entrance)", ru: "Библиотека им. Алишера Навои, Tashkent City Park (Северный вход)", uz: "Alisher Navoiy kutubxonasi, Tashkent City Park (Shimoliy kirish)" } }
];
appData.details['paxtakor'].nearby = [
    { icon: 'football-outline', image: 'assets/Stadium.jpg', name: { en: 'Pakhtakor Stadium', ru: 'Стадион Пахтакор', uz: 'Paxtakor Stadioni' } },
    { icon: 'business-outline', image: 'assets/Alisher-Navoiy Teatr.jpg', name: { en: 'Navoi Theater', ru: 'Театр Навои', uz: 'Navoiy Teatri' } }
];

appData.details['bodomzor'] = appData.details['bodomzor'] || { exits: [], nearby: [] };
appData.details['bodomzor'].exits = [
    { name: { en: "UzExpoCenter, International Trade Center", ru: "Узэкспоцентр, Международный торговый центр", uz: "UzExpoCenter, Xalqaro savdo markazi" } },
    { name: { en: "Tashkent TV Tower, Aqua park, Wyndham Hotel", ru: "Ташкентская телебашня, Аквапарк, Отель Wyndham", uz: "Toshkent teleminorasi, Aqua park, Wyndham mehmonxonasi" } }
];
// Clear nearby to remove any incorrect data
appData.details['bodomzor'].nearby = [];

appData.details['minor'] = appData.details['minor'] || { exits: [], nearby: [] };
appData.details['minor'].exits = [
    { name: { en: "Institute of Finance, Minor Mosque", ru: "Финансовый институт, Мечеть Минор", uz: "O'zbekiston moliya instituti, Minor masjidi" } }
];
// Clear nearby to remove any incorrect data
appData.details['minor'].nearby = [];

appData.details['amir-temur'].nearby = [
    { icon: 'leaf-outline', image: 'assets/Amir-Temur-xiyoboni.jpg', name: { en: 'Amir Temur Square', ru: 'Сквер Амира Темура', uz: 'Amir Temur Xiyoboni' } },
    { icon: 'museum-outline', image: '', name: { en: 'Temurids History Museum', ru: 'Музей истории Темуридов', uz: 'Temuriylar tarixi muzeyi' } }
];

appData.details['chorsu'].history = {
    en: 'Famous for its blue domes, the station brings you directly to the heart of Tashkent\'s oldest bazaar. Opened between 1984 and 1991.',
    ru: 'Известная своими голубыми куполами, станция выводит прямо к сердцу старейшего базара Ташкента. Открыта между 1984-1991 гг.',
    uz: 'O\'zining moviy gumbazlari bilan mashhur bo\'lgan stantsiya sizni to\'g\'ridan-to\'g\'ri Toshkentning eng qadimgi bozori markaziga olib boradi. 1984-1991 yillar orasida ochilgan.'
};
appData.details['chorsu'].nearby = [
    { icon: 'cart-outline', image: '', name: { en: 'Chorsu Bazaar', ru: 'Рынок Чорсу', uz: 'Chorsu Bozori' } },
    { icon: 'compass-outline', image: '', name: { en: 'Kukeldash Madrasah', ru: 'Медресе Кукельдаш', uz: 'Ko\'kaldosh Madrasasi' } }
];
