document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize app
    initTheme();
    initI18n();
    initNavigation();
    initDropdowns();
    initLineFilters();

    populateStationSelects();
    renderSchedule();
    renderServices();
    renderNews();

    // 3. Optional Deep Linking
    checkDeepLink();

    // 4. Event Listeners for Dynamic Views
    document.getElementById('station-select').addEventListener('change', renderSchedule);
    document.getElementById('services-station-select').addEventListener('change', renderServices);
});

/* --- Data Population --- */
function populateStationSelects(filterLine = null, targetSelectId = null) {
    const selects = targetSelectId
        ? [document.getElementById(targetSelectId)]
        : [
            document.getElementById('station-select'),
            document.getElementById('services-station-select')
        ];

    selects.forEach(select => {
        // Enable select if a line is picked
        if (filterLine) {
            select.disabled = false;
        }

        // Clear existing options
        select.innerHTML = '';

        // Add default option
        const defaultOpt = document.createElement('option');
        defaultOpt.value = '';
        defaultOpt.disabled = true;
        defaultOpt.selected = true;
        defaultOpt.setAttribute('data-i18n', 'select-station');
        defaultOpt.textContent = translations[currentLanguage] ? translations[currentLanguage]['select-station'] : 'Select Station';
        select.appendChild(defaultOpt);

        const filteredStations = filterLine
            ? appData.stationsList.filter(st => st.line === filterLine)
            : appData.stationsList;

        filteredStations.forEach(st => {
            const opt = document.createElement('option');
            opt.value = st.id;
            opt.textContent = st.name;
            select.appendChild(opt);
        });

        // Trigger a change to clear previous view details if any
        select.dispatchEvent(new Event('change'));
    });
}

function checkDeepLink() {
    const urlParams = new URLSearchParams(window.location.search);
    const stationId = urlParams.get('station');

    if (stationId && appData.details[stationId]) {
        // 1. Switch to Explorer tab (nav-services)
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(nav => nav.classList.remove('active'));
        const explorerTab = Array.from(navItems).find(n => n.getAttribute('data-target') === 'view-services');
        if (explorerTab) explorerTab.classList.add('active');

        const views = document.querySelectorAll('.view');
        views.forEach(v => {
            v.classList.remove('active');
            v.classList.add('hidden');
        });
        const targetView = document.getElementById('view-services');
        if (targetView) {
            targetView.classList.remove('hidden');
            targetView.classList.add('active');
        }

        // 2. Determine line and prepopulate filter UI
        const stationObj = appData.stationsList.find(st => st.id === stationId);
        if (stationObj) {
            // activate the correct line pill
            const lineSelector = document.querySelector('[data-target-select="services-station-select"]');
            if (lineSelector) {
                const targetPill = lineSelector.querySelector(`[data-line="${stationObj.line}"]`);
                if (targetPill) {
                    targetPill.click(); // This auto-triggers populateStationSelects for that line
                }
            }
        }

        // 3. Select the station and render details
        const select = document.getElementById('services-station-select');
        if (select) {
            // wait a tick for options to populate if line was just clicked
            setTimeout(() => {
                select.value = stationId;
                select.dispatchEvent(new Event('change'));
            }, 50);
        }
    }
}

function initLineFilters() {
    const selectors = document.querySelectorAll('.line-selector');

    selectors.forEach(selector => {
        const targetSelectId = selector.getAttribute('data-target-select');
        const pills = selector.querySelectorAll('.line-pill');

        pills.forEach(pill => {
            pill.addEventListener('click', (e) => {
                // Remove active from all siblings
                pills.forEach(p => p.classList.remove('active'));

                // Add active to clicked
                const btn = e.currentTarget;
                btn.classList.add('active');

                // Filter dropdown
                const selectedLine = btn.getAttribute('data-line');
                populateStationSelects(selectedLine, targetSelectId);
            });
        });
    });
}

/* --- Navigation System --- */
function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const views = document.querySelectorAll('.view');

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            // Update active nav item
            navItems.forEach(nav => nav.classList.remove('active'));
            const clickedItem = e.currentTarget;
            clickedItem.classList.add('active');

            // Switch view
            const targetId = clickedItem.getAttribute('data-target');
            views.forEach(view => {
                if (view.id === targetId) {
                    view.classList.remove('hidden');
                    view.classList.add('active');
                } else {
                    view.classList.add('hidden');
                    view.classList.remove('active');
                }
            });
        });
    });
}

/* --- Theme System (Dark/Light) --- */
function initTheme() {
    const themeBtn = document.getElementById('theme-btn');
    const themeIcon = document.getElementById('theme-icon');

    // Check saved theme or system preference
    const savedTheme = localStorage.getItem('metro-qr-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeIcon.setAttribute('name', 'sunny-outline');
    }

    themeBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        if (currentTheme === 'dark') {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('metro-qr-theme', 'light');
            themeIcon.setAttribute('name', 'moon-outline');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('metro-qr-theme', 'dark');
            themeIcon.setAttribute('name', 'sunny-outline');
        }
    });
}

/* --- Dropdowns & Modals --- */
function initDropdowns() {
    const langBtn = document.getElementById('lang-btn');
    const langDropdown = document.getElementById('lang-dropdown');

    // Toggle Dropdown
    langBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        langDropdown.classList.toggle('hidden');
    });

    // Close when clicking outside
    document.addEventListener('click', () => {
        langDropdown.classList.add('hidden');
    });

    // Handle Language Selection
    document.querySelectorAll('.lang-option').forEach(option => {
        option.addEventListener('click', (e) => {
            const selectedLang = e.currentTarget.getAttribute('data-lang');
            applyTranslations(selectedLang);
            // Re-render views to apply translation keys from JS if necessary
            renderServices();
            renderNews();
        });
    });
}

/* --- Render Schedule View --- */
function renderSchedule() {
    const select = document.getElementById('station-select');
    const container = document.getElementById('schedule-container');
    const selectedStation = select.value;

    if (!selectedStation) {
        container.innerHTML = `<p style="text-align:center;color:var(--text-muted);margin-top:20px;" data-i18n="select-station">${translations[currentLanguage]['select-station'] || 'Select a station'}</p>`;
        return;
    }

    const schedules = appData.schedules[selectedStation] || [];
    container.innerHTML = ''; // Clear

    if (schedules.length === 0) {
        container.innerHTML = '<p style="text-align:center;">No data available.</p>';
        return;
    }

    schedules.forEach(item => {
        const card = document.createElement('div');
        card.className = 'schedule-card';
        card.innerHTML = `
            <div class="schedule-info">
                <h4>${item.destination}</h4>
                <div class="schedule-line">
                    <span class="line-dot" style="background-color: ${item.color}"></span>
                    <span style="text-transform: capitalize">${item.line} Line</span>
                    <span style="font-size: 0.75rem; color: var(--text-muted); margin-left: 8px;">Interval: ${item.interval}</span>
                </div>
            </div>
            <div class="time-badge">${item.time}</div>
        `;
        container.appendChild(card);
    });
}

/* --- Render Services / Details View --- */
function renderServices() {
    const select = document.getElementById('services-station-select');
    const selectedStation = select.value;

    const contentDiv = document.getElementById('station-detail-content');
    const emptyDiv = document.getElementById('station-detail-empty');

    // Display placeholder if no specific data exists (we simulate data only for amir-temur, paxtakor, chorsu)
    const detailData = appData.details ? appData.details[selectedStation] : null;

    if (!detailData) {
        contentDiv.style.display = 'none';
        emptyDiv.style.display = 'block';
        return;
    }

    contentDiv.style.display = 'block';
    emptyDiv.style.display = 'none';

    // 1. Photo
    document.getElementById('detail-photo').src = detailData.photo;

    // 2. Services Badges
    const services = appData.services[selectedStation] || [];
    const badgesContainer = document.getElementById('detail-services');
    badgesContainer.innerHTML = '';
    services.forEach(item => {
        const statusClass = item.status === 'available' ? 'badge-available' : 'badge-unavailable';
        const name = (translations[currentLanguage] && translations[currentLanguage][item.nameKey]) ? translations[currentLanguage][item.nameKey] : item.nameKey;

        badgesContainer.innerHTML += `
            <div class="badge-service ${statusClass}">
                <ion-icon name="${item.icon}"></ion-icon>
                <span>${name}</span>
            </div>
        `;
    });

    // 3. History
    const historyEl = document.getElementById('detail-history');
    historyEl.textContent = detailData.history[currentLanguage] || detailData.history['en'];

    // 4. Exits
    const exitsList = document.getElementById('detail-exits');
    const sectionExits = document.getElementById('section-exits');
    exitsList.innerHTML = '';

    if (detailData.exits && detailData.exits.length > 0) {
        detailData.exits.forEach((exit, index) => {
            const exitName = exit.name[currentLanguage] || exit.name['en'];
            exitsList.innerHTML += `
                <li class="nearby-item">
                    <div class="nearby-icon" style="background-color: var(--surface); color: var(--primary); border: 2px solid var(--primary-light);"><ion-icon name="walk-outline"></ion-icon></div>
                    <div class="nearby-info">
                        <p style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: 2px;">Exit ${index + 1}</p>
                        <p>${exitName}</p>
                    </div>
                </li>
            `;
        });
        sectionExits.style.display = 'block';
    } else {
        sectionExits.style.display = 'none';
    }

    // 5. Nearby
    const nearbyList = document.getElementById('detail-nearby');
    nearbyList.innerHTML = '';

    if (detailData.nearby && detailData.nearby.length > 0) {
        detailData.nearby.forEach(place => {
            const placeName = place.name[currentLanguage] || place.name['en'];
            const photoHtml = place.image ? `<img src="${place.image}" class="nearby-photo" alt="${placeName}">` : '';
            nearbyList.innerHTML += `
                <li class="nearby-item">
                    <div class="nearby-icon"><ion-icon name="${place.icon}"></ion-icon></div>
                    <div class="nearby-info">
                        <p>${placeName}</p>
                    </div>
                    ${photoHtml}
                </li>
            `;
        });
    } else {
        nearbyList.innerHTML = '<p class="premium-text" style="color:var(--text-muted);">No nearby attractions listed.</p>';
    }
}

/* --- Render News View --- */
function renderNews() {
    const feed = document.getElementById('news-feed');
    feed.innerHTML = '';

    appData.news.forEach(item => {
        const card = document.createElement('div');
        card.className = 'news-card';

        const headerClass = item.type === 'alert' ? 'news-alert' : 'news-info';

        // Fallbacks for translation
        const t = translations[currentLanguage] || translations['en'];
        const typeText = t[`type-${item.type}`] || item.type;
        const dateText = t[item.dateKey] || item.dateKey;
        const titleText = t[item.titleKey] || item.titleKey;
        const contentText = t[item.contentKey] || item.contentKey;

        card.innerHTML = `
            <div class="news-card-header ${headerClass}">
                <span><ion-icon name="${item.type === 'alert' ? 'warning-outline' : 'information-circle-outline'}"></ion-icon> ${typeText}</span>
                <span>${dateText}</span>
            </div>
            <div class="news-card-body">
                <h4>${titleText}</h4>
                <p>${contentText}</p>
            </div>
        `;
        feed.appendChild(card);
    });
}

/* --- Map Interaction --- */
window.selectStationMap = function (stationId) {
    // Switch to schedule tab
    const scheduleNavBtn = document.querySelector('.nav-item[data-target="view-schedule"]');
    if (scheduleNavBtn) scheduleNavBtn.click();

    // Set select value
    const select = document.getElementById('station-select');
    // Check if option exists in mock data
    let optionExists = Array.from(select.options).some(opt => opt.value === stationId);
    if (!optionExists) {
        const newOption = document.createElement('option');
        newOption.value = stationId;
        newOption.textContent = stationId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        select.appendChild(newOption);
    }

    select.value = stationId;
    renderSchedule();

    // Also scroll top
    document.querySelector('.app-main').scrollTo({ top: 0, behavior: 'smooth' });
};
