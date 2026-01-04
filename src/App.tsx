import { Admin, Resource } from 'react-admin';

import { PillList } from "./components/pills/pills"
import { PillEdit } from './components/pills/editpill';
import { PillAdd } from './components/pills/addpill';
import PillIcon from '@mui/icons-material/MedicalInformation';

import { aiBotHistoryList } from './components/aibot/botHistory';
import HistoryIcon from '@mui/icons-material/History';

import { aiBotReviewList } from './components/aireviewbot/reviews';
import ReviewsIcon from '@mui/icons-material/Reviews';

import { aiBotTrainingData } from './components/aibot/trainingData';
import { RuleAdd } from './components/aibot/training/addrule';
import BubblesIcon from '@mui/icons-material/BubbleChartOutlined';

import { dataProviders } from './providers/combineproviders';
import authProvider from './providers/authprovider';
import dashboard from './pages/dashboard';
import { RuleEdit } from './components/aibot/training/editrule';
import { FactList } from './components/facts/facts';
import { FactAdd } from './components/facts/addfact';
import { FactEdit } from './components/facts/editfact';
import InfoIcon from '@mui/icons-material/Info';
import { APLayout } from './layout/APLayout';

export function App() {

	return (
		<Admin
			dataProvider={dataProviders}
			authProvider={authProvider}
			dashboard={dashboard}
			layout={APLayout}>
			<Resource name="items"
				list={PillList}
				create={PillAdd}
				edit={PillEdit}
				options={{ label: 'Pastillas' }}
				icon={PillIcon} />
			<Resource name="aibot"
				hasEdit={false}
				list={aiBotHistoryList}
				hasShow={false}
				options={{ label: 'Telegram Bot History' }}
				icon={HistoryIcon} />
			<Resource name="aireviewsbot"
				hasEdit={false}
				list={aiBotReviewList}
				hasShow={false}
				hasCreate={false}
				icon={ReviewsIcon}
				options={{ label: 'AI Reviews' }} />
			<Resource name="trainingdata"
				hasEdit={true}
				list={aiBotTrainingData}
				create={RuleAdd}
				edit={RuleEdit}
				hasCreate={true}
				hasShow={false}
				options={{ label: 'Training data' }}
				icon={BubblesIcon} />
			<Resource name="facts"
				list={FactList}
				create={FactAdd}
				edit={FactEdit}
				options={{ label: 'Consejos' }}
				icon={InfoIcon} />
		</Admin>
	);
}