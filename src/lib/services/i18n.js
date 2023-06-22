import { dictionary, locale, _ } from 'svelte-i18n';
import english from './dictionaries/en.json';
import spanish from './dictionaries/es.json';
import french from './dictionaries/fr.json';

function setupI18n({
    withLocale: _locale
    } = {
        withLocale: 'en'
    }) {
    dictionary.set({
        en: english,
        es: spanish,
        fr: french
    });

    locale.set(_locale);
}

export {
    _,
    setupI18n
};
