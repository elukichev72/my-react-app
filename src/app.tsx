import Timer from './components/Timer';
import Countdown from './components/Countdown';
import './app.css';
import { useState } from 'react';

export default function App() {
    const [component, setComponent] = useState(0);

    const setTimerComponent = () => {
        setComponent(0);
    }

    const setCountdownComponent = () => {
        setComponent(1);
    }

    return (
        <div className='main-container'>
            <div className='btns'>
                <button className={component === 0 ? 'button timer-button_active' : 'button timer-button'} onClick={setTimerComponent}></button>
                <button className={component === 1 ? 'button countdown-button_active' : 'button countdown-button'} onClick={setCountdownComponent}></button>
            </div>
            {component === 0 ?
            <Timer /> : ""}
            {component === 1 ?
            <Countdown /> : "" }
        </div>
    );
}
