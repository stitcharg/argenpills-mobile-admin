import { combineDataProviders } from 'react-admin';
import { apPillProvider } from './dataprovider';
import { apAiBotHistoryProvider } from './aibotprovider';

export const dataProviders = combineDataProviders((resource) => {
	switch (resource) {
		case 'items':
			return apPillProvider;
		case 'aibot':
			return apAiBotHistoryProvider;
		default:
			throw new Error(`Unknown resource: ${resource}`);
	}
});
