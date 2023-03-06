import React, {lazy, Suspense} from 'react';
import Spinner from './Components/Spinner/Spinner';

export const AppDesktop = lazy(() => import('./AppDesktop'));

const App = () => (
	<Suspense fallback={<Spinner />}>
		<AppDesktop />
	</Suspense>
);

export default App;
