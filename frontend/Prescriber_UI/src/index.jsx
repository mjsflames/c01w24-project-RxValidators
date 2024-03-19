import React, { useState } from 'react';
import ReactDOMClient from 'react-dom/client';
import { PrescriberSide } from './screens/PrescriberSide';
import { PrescriberGreen } from './screens/PrescriberGreen';
import { PrescriberAccount } from './screens/PrescriberAccount';
import { Prescriber } from './screens/Prescriber';

const App = () => {
    // State to manage which screen to display
    const [currentScreen, setCurrentScreen] = useState('PrescriberSide');

    // Function to change screen
    const changeScreen = (screenName) => {
        setCurrentScreen(screenName);
    };

    return (
        <div>
            {currentScreen === 'PrescriberSide' && <PrescriberSide changeScreen={changeScreen} />}
            {currentScreen === 'Prescriber' && <Prescriber changeScreen={changeScreen}/>}
            {currentScreen === 'PrescriberGreen' && <PrescriberGreen changeScreen={changeScreen}/>}
            {currentScreen === 'PrescriberAccount' && <PrescriberAccount changeScreen={changeScreen}/>}
        </div>
    );
};

const app = document.getElementById('app');
const root = ReactDOMClient.createRoot(app);
root.render(<App />);
