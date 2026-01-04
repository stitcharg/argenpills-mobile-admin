import { Menu } from 'react-admin';
import ListSubheader from '@mui/material/ListSubheader';

export const APMenu = () => (
	<Menu>
		<Menu.DashboardItem />
		<Menu.ResourceItem name="items" />

		<ListSubheader component="div" id="nested-list-subheader-telegram" sx={{ lineHeight: '48px', textTransform: 'uppercase', fontWeight: 'bold' }}>
			Telegram
		</ListSubheader>
		<Menu.ResourceItem name="aibot" />
		<Menu.ResourceItem name="trainingdata" />
		<Menu.ResourceItem name="aireviewsbot" />
		<Menu.ResourceItem name="facts" />
	</Menu>
);
