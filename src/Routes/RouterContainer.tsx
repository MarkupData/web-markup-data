import React, {FC, lazy, Suspense} from 'react';
import {Navigate, Route, Routes, useLocation} from 'react-router';

import EnumRoutes from './EnumRoutes';
import Spinner from '../Components/Spinner/Spinner';
import {useStoreSelector} from '../Lib/Hooks/useStoreSelector';
import {selectIsLoggedIn} from '../Lib/Redux/User/Selectors/selectIsLoggedIn';
import PrivateRoute from './PrivateRoute';
import useNavigateProps from '../Utils/Navigation/useNavigateProps';
import Home from './VirtualPage/Home';
import MarkupData from './VirtualPage/MarkupData';

const NotFound = lazy(() => import('./VirtualPage/NotFound'));

const RouterContainer: FC = () => {
	const location = useLocation();
	const state = location.state;
	const homeNavigateProps = useNavigateProps(EnumRoutes.HOME);

	const isLoggedIn = useStoreSelector(selectIsLoggedIn);

	return (
		<Suspense fallback={<Spinner />}>
			<Routes location={isLoggedIn ? state?.backgroundLocation : undefined}>
				<Route path={EnumRoutes.LOGIN} element={<Navigate {...homeNavigateProps} />} />
				<Route path={EnumRoutes.HOME} element={<PrivateRoute component={<Home />} />} />
				<Route
					path={EnumRoutes.MARKUP_DATA}
					element={<PrivateRoute component={<MarkupData />} />}
				/>
				<Route element={<NotFound />} path="*" />
			</Routes>
		</Suspense>
	);
};

export default RouterContainer;
