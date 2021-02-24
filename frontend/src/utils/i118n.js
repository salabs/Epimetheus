import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import frontpage from '../locales/en/frontpage.json';
import mainnav from '../locales/en/mainnav.json';
import team from '../locales/en/team.json';
import parentData from '../locales/en/parentData.json';
import overview from '../locales/en/overview.json';
import header from '../locales/en/header.json';
import history from '../locales/en/history.json';
import buttons from '../locales/en/buttons.json';
import accordion from '../locales/en/accordion.json';

const resources = {
    en: {
        frontpage,
        mainnav,
        team,
        parentData,
        overview,
        header,
        history,
        buttons,
        accordion,
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
