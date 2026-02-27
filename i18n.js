// i18n Dictionary
const translations = {
    'en': {
        // General & Nav
        'app-title': 'Metro Tashkent',
        'nav-map': 'Map',
        'nav-schedule': 'Schedule',
        'nav-services': 'Services',
        'nav-profile': 'Profile',
        'nav-news': 'News',

        // Schedule
        'select-station': 'Select Station',
        'select-line-first': 'Select a Line first',

        // Services / Details
        'nav-services': 'Explorer',
        'lbl-history': 'History',
        'lbl-nearby': 'Nearby Attractions',
        'lbl-exits': 'Exits',
        'srv-wifi': 'Free Wi-Fi',
        'srv-wc': 'Restroom (WC)',
        'srv-elevator': 'Elevator',
        'srv-atm': 'ATM / Cash',
        'status-available': 'Available',
        'status-unavailable': 'Maintenance',

        // Profile
        'profile-favorites': 'Favorite Routes',

        // News
        'date-today': 'Today, 10:30',
        'date-yesterday': 'Yesterday',
        'type-alert': 'Alert',
        'type-info': 'Info',
        'news-title-1': 'Station Maintenance',
        'news-content-1': 'The escalator at Yunus Rajabiy station is under maintenance until tomorrow morning.',
        'news-title-2': 'New Payment Method',
        'news-content-2': 'You can now use ATTO virtual cards via NFC directly at the turnstiles.'
    },
    'ru': {
        // General & Nav
        'app-title': 'Метро Ташкент',
        'nav-map': 'Карта',
        'nav-schedule': 'Расписание',
        'nav-services': 'Сервисы',
        'nav-profile': 'Профиль',
        'nav-news': 'Новости',

        // Schedule
        'select-station': 'Выберите станцию',
        'select-line-first': 'Сначала выберите линию',

        // Services / Details
        'nav-services': 'Гид',
        'lbl-history': 'История',
        'lbl-nearby': 'Поблизости',
        'lbl-exits': 'Выходы',
        'srv-wifi': 'Бесплатный Wi-Fi',
        'srv-wc': 'Туалет (WC)',
        'srv-elevator': 'Лифт',
        'srv-atm': 'Банкомат',
        'status-available': 'Доступно',
        'status-unavailable': 'Ремонт',

        // Profile
        'profile-favorites': 'Избранные маршруты',

        // News
        'date-today': 'Сегодня, 10:30',
        'date-yesterday': 'Вчера',
        'type-alert': 'Внимание',
        'type-info': 'Инфо',
        'news-title-1': 'Ремонт станции',
        'news-content-1': 'Эскалатор на станции Юнус Раджаби находится на ремонте до завтрашнего утра.',
        'news-title-2': 'Новый способ оплаты',
        'news-content-2': 'Теперь вы можете использовать виртуальные карты ATTO через NFC прямо на турникетах.'
    },
    'uz': {
        // General & Nav
        'app-title': 'Toshkent Metrosi',
        'nav-map': 'Xarita',
        'nav-schedule': 'Jadval',
        'nav-services': 'Xizmatlar',
        'nav-profile': 'Profil',
        'nav-news': 'Yangiliklar',

        // Schedule
        'select-station': 'Bekatni tanlang',
        'select-line-first': 'Avval yo\'nalishni tanlang',

        // Services / Details
        'nav-services': 'Gid',
        'lbl-history': 'Tarixi',
        'lbl-nearby': 'Yaqin Atrofda',
        'lbl-exits': 'Chiqish joylari',
        'srv-wifi': 'Bepul Wi-Fi',
        'srv-wc': 'Hojatxona',
        'srv-elevator': 'Lift',
        'srv-atm': 'Bankomat',
        'status-available': 'Ishlayapti',
        'status-unavailable': "Ta'mirda",

        // Profile
        'profile-favorites': 'Sevimli marshrutlar',

        // News
        'date-today': 'Bugun, 10:30',
        'date-yesterday': 'Kecha',
        'type-alert': 'Ogohlantirish',
        'type-info': "Ma'lumot",
        'news-title-1': "Bekatda ta'mirlash",
        'news-content-1': "Yunus Rajabiy bekatidagi eskalator ertaga ertalabgacha ta'mirlashda.",
        'news-title-2': "Yangi to'lov usuli",
        'news-content-2': "Endi siz to'g'ridan-to'g'ri turniketlarda NFC orqali ATTO virtual kartalaridan foydalanishingiz mumkin."
    }
};

let currentLanguage = 'en';

function applyTranslations(lang) {
    if (!translations[lang]) return;

    currentLanguage = lang;

    // Update simple attributes
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });

    // Update Language UI
    const langLabel = document.getElementById('current-lang');
    if (langLabel) {
        langLabel.textContent = lang.toUpperCase();
    }

    // Save to local storage
    localStorage.setItem('metro-qr-lang', lang);
}

function initI18n() {
    // Load from local storage or default to 'en'
    const savedLang = localStorage.getItem('metro-qr-lang');
    if (savedLang && translations[savedLang]) {
        applyTranslations(savedLang);
    } else {
        applyTranslations('en');
    }
}
