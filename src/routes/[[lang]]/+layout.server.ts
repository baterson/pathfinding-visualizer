import { locale } from '$lib/translation/i18n.js';
import { redirect } from '@sveltejs/kit';

export function load({
	params,
	request
}: {
	params: { lang?: 'en' | 'de' | 'ru' | 'es' | 'zh' };
	request: Request;
}) {
	if (!params.lang) {
		const acceptLanguage = request.headers.get('accept-language');
		if (acceptLanguage) {
			const browserLang = acceptLanguage.split(',')[0].slice(0, 2).toLowerCase();
			const detectedLang = browserLang in locale ? browserLang : 'en';
			throw redirect(307, `/${detectedLang}`);
		}
	}
	return locale[params.lang ?? 'en'];
}
