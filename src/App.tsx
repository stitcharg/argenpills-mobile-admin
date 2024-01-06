import { Admin, Resource, ListGuesser } from 'react-admin';

import { PillList } from "./components/pills"
import { PillEdit } from './components/editpill';
import { PillAdd } from './components/addpill';

import { APDataProvider } from './providers/dataprovider';
import authProvider from './providers/authprovider';
import dashboard from './pages/dashboard';

import './styles/custom.css';

export function App() {

    return (
        <Admin
            dataProvider={APDataProvider}
            authProvider={authProvider}
            dashboard={dashboard}>
            <Resource name="items" list={PillList} create={PillAdd} edit={PillEdit} />
        </Admin>
    );
}