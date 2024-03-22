import React, { useCallback, useRef, useState } from 'react';
import './Countdown.css';

export default React.memo(function Countdown() {
    const [time, setTime]: any = useState({ h: 0, m: 0, s: 0 });
    const [status, setStatus] = useState(0);
    const [savedInterval, setSavedInterval] = useState();
    const [isEditing, setIsEditing] = useState(false);

    const timeRef = useRef(time);
    timeRef.current = time;

    const run = useCallback(() => {
        let { h: updatedH, m: updatedM, s: updatedS } = timeRef.current;
        if (updatedH > 0 && updatedM === 0 && updatedS === 0) {
            updatedH = updatedH - 1;
            updatedM = 59;
            updatedS = 60;
        }
        if (updatedH >= 0 && updatedM > 0 && updatedS === 0) {
            updatedM = updatedM - 1;
            updatedS = 60;
        }
        if (updatedH === 0 && updatedM === 0 && updatedS === 0) {
            clearInterval(savedInterval);
            setStatus(0);
            return "";
        }
        updatedS = updatedS - 1;
        setTime({ h: updatedH, m: updatedM, s: updatedS });
    }, [setTime, setStatus, savedInterval]);

    const edit = useCallback(() => {
        setIsEditing(true);
    }, [setIsEditing]);

    const start = useCallback(() => {
        run();
        setStatus(1);
        const interval: any = setInterval(run, 1000);
        setSavedInterval(interval);
        setIsEditing(false);
    }, [run, setStatus, setSavedInterval, setIsEditing]);

    const pause = useCallback(() => {
        clearInterval(savedInterval);
        setStatus(2);
    }, [setStatus, savedInterval]);

    const reset = useCallback(() => {
        clearInterval(savedInterval);
        setStatus(0);
        setTime({ h: 0, m: 0, s: 0 })
    }, [savedInterval, setStatus, setTime]);

    const handleChange = useCallback((event: any) => {
        setTime({ ...time, [event.target.name]: event.target.value });
        const { name, value } = event.target;
        const newTime = { ...time };
        newTime[name] = Math.min(Math.max(value, 0), 59);
        if (name === 'h') {
            newTime.h = Math.min(Math.max(value, 0), 23);
        }
        setTime(newTime);
    }, [setTime, time]);

    const onKeyDown = useCallback((e: any) => {
        if (e.keyCode === 13) {
            setIsEditing(false);
        }
    }, [setIsEditing]);

    return (
        <div className='countdown'>
            <div className='countdown__stopwatch'>
                <div>
                    { isEditing === false ? <div onDoubleClick={edit}>
                    {time.h >= 10 ? time.h : '0' + time.h}:
                    {time.m >= 10 ? time.m : '0' + time.m}:
                    {time.s >= 10 ? time.s : '0' + time.s}
                    </div> : ""}
                    { isEditing === true ? <div>
                    <input type='number' className='countdown__input-field' name='h' value={time.h} onChange={handleChange} onKeyDown={onKeyDown}></input>:
                    <input type='number' className='countdown__input-field' name='m' value={time.m} onChange={handleChange} onKeyDown={onKeyDown}></input>:
                    <input type='number' className='countdown__input-field' name='s' value={time.s} onChange={handleChange} onKeyDown={onKeyDown}></input>
                    </div> : "" }
                </div>
            </div>
            { status === 0 ?
            <div className='btns'>
                <button className='countdown__button countdown__start-button' onClick={start}></button>
            </div> : ""
            }
            { status === 1 ?
            <div className='btns'>
                <button className='countdown__button countdown__reset-button' onClick={reset}></button>
                <button className='countdown__button countdown__pause-button' onClick={pause}></button>
            </div> : ""
            }
            { status === 2 ?
            <div className='btns'>
                <button className='countdown__button countdown__reset-button' onClick={reset}></button>
                <button className='countdown__button countdown__start-button' onClick={start}></button>
            </div> : ""
            }
        </div>
    );
}
)