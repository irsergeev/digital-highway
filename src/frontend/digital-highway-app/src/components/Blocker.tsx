import { CircularProgress } from '@mui/material';
import React, { useState } from 'react';
import css from './Blocker.module.scss';
import { useResponsive } from '../hooks/useResponsive';

const SMALL_PROGRESS_SIZE : number = 20;
const MEDIUM_PROGRESS_SIZE : number = 80;
const BIG_PROGRESS_SIZE : number = 240;

export const Blocker : React.FC = () => {
    const { isSmallScreen, isBigScreen } = useResponsive();
    const [progressSize, setProgressSize] = useState<number>(0);

    React.useEffect(() => {
        var size = isSmallScreen ? SMALL_PROGRESS_SIZE : (isBigScreen ? BIG_PROGRESS_SIZE : MEDIUM_PROGRESS_SIZE);
        setProgressSize(size);

    }, [isSmallScreen, isBigScreen]);

    return(
        <div className={css['blocker-container']}>
            <CircularProgress className={css.progress} size={progressSize}/>
        </div>);
}