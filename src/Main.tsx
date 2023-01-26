import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import Game from './components/Game';
import MouseTest from './components/MouseTest';
import KeyboardTest from './components/KeyboardTest'
import Statistics from './components/Statistics';

const Home = React.lazy(() => import('./components/Home'));
const Settings = React.lazy(() => import('./components/Settings'));
const Loading = () => <p>Loading ...</p>;

const Main = () => {
    return (
        <React.Suspense fallback={<Loading />}>
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/settings' element={<Settings />} />
            <Route path='/keyboardtest' element={<KeyboardTest />} />
            <Route path='/mousetest' element={<MouseTest />} />
            <Route path='/game' element={<Game />} />
            <Route path='/statistics' element={<Statistics />} />
            </Routes>
        </React.Suspense>
    );
}
export default Main;