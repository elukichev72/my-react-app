import React, { useCallback, useRef, useState } from 'react';
import './Timer.css';

export default React.memo(function Timer() {
    const [time, setTime] = useState({ m: 0, s: 0, ms: 0 });
    const [savedInterval, setSavedInterval] = useState();
    const [status, setStatus] = useState(0);

    const timeRef = useRef(time);
    timeRef.current = time;

    const run = useCallback(() => {
        let { m: updatedM, s: updatedS, ms: updatedMs } = timeRef.current;
        if (updatedS === 60) {
            updatedM++;
            updatedS = 0;
        }
        if (updatedMs === 100) {
            updatedS++;
            updatedMs = 0;
        }
        updatedMs++;
        setTime({ m: updatedM, s: updatedS, ms: updatedMs });
    }, [setTime]);

    const start = useCallback(() => {
        run();
        setStatus(1);
        let interval: any = setInterval(run, 10);
        setSavedInterval(interval)
    }, [run, setStatus, setSavedInterval]);

    const stop = useCallback(() => {
        clearInterval(savedInterval);
        setStatus(2);
    }, [savedInterval, setStatus]);

    const reset = useCallback(() => {
        clearInterval(savedInterval);
        setStatus(0);
        setTime({ m: 0, s: 0, ms: 0 })
    }, [savedInterval, setStatus, setTime]);

    const resume = useCallback(() => start(), [start]);

    return (
        <div className='timer'>
            <div className='timer__stopWatch'>
                <div>
                {time.m >= 10 ? time.m : '0' + time.m}:
                {time.s >= 10 ? time.s : '0' + time.s}.
                {time.ms >= 10 ? time.ms : '0' + time.ms}
                </div>
            </div>
            <div className='btns'>
            {status === 0 ? <button className='button button_start' onClick={start}></button> : ''}

            {status === 1 ?
                <div className='btns'>
                    <button className='button button_reset' onClick={reset}></button>
                    <button className='button button_pause' onClick={stop}></button>
                </div> : ""
            }

            {status === 2 ?
                <div className='btns'>
                    <button className='button button_reset' onClick={reset}></button>
                    <button className='button button_start' onClick={resume}></button>
                </div> : ""
            }
            </div>
        </div>
    );
})
