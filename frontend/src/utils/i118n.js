import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import frontpage from '../locales/en/frontpage.json';
import mainnav from '../locales/en/mainnav.json';
import team from '../locales/en/team.json';
import parentData from '../locales/en/parentData.json';
import dashboard from '../locales/en/dashboard.json';

const resources = {
    en: {
        frontpage,
        mainnav,
        team,
        parentData,
        dashboard,
    },
};

i18n.use(initReactI18next).init({
    resources,
    lng: 'en',
    debug: false,
    interpolation: {
        escapeValue: false,
    },
});
