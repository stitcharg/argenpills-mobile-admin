import { combineDataProviders } from 'react-admin';
import { apPillProvider } from './dataprovider';
import { apAiBotHistoryProvider } from './aibotprovider';
import { apAiTrainingProvider } from './trainingprovider';

export const dataProviders = combineDataProviders((resource) => {
	switch (resource) {
		case 'items':
			return apPillProvider;
		case 'aibot':
			return apAiBotHistoryProvider;
		case 'trainingdata':
			return apAiTrainingProvider;
		default:
			throw new Error(`Unknown resource: ${resource}`);
	}
});
