import React, { Dispatch, SetStateAction, useState } from 'react';
import css from './HighwayPanel.module.scss';
import { CancelOutlined, DehazeOutlined } from '@mui/icons-material';
import { HighwayItemList } from './HighwayItemList';
import { HighwayMetadata } from '../types';
import { useResponsive } from '../hooks/useResponsive';

interface HighwayPanelProps{
    highwayMetadataArray: Array<HighwayMetadata>,
    changeSelectedHighway: Dispatch<SetStateAction<string>>
}

export const HighwayPanel : React.FC<HighwayPanelProps> = ({ highwayMetadataArray, changeSelectedHighway }) => {
    const PANEL_SIZE = 350;
    const [showMetadata, setShowMetadata] = useState<boolean>(false);
    const { isSmallScreen, isBigScreen } = useResponsive();


    return(
        <div className={css.panelContainer} style={ isBigScreen ? { width: '20vw' } : isSmallScreen ? { width: '100%' } : { width: `${PANEL_SIZE}px` } }>
            {isSmallScreen ? (
                <div className={css.minMetadataContainer} onClick={() => setShowMetadata(!showMetadata)}>
                    {showMetadata ? (
                        <div className={css.metadataDetailPanel}>
                            <div className={css.cancelIcon}>
                                <CancelOutlined fontSize='large'/>
                            </div>
                            <HighwayItemList highwayMetadataArray={highwayMetadataArray} changeSelectedHighway={changeSelectedHighway}/>
                        </div>
                    ) : (
                        <div className={css.metadataPanel}>
                            <DehazeOutlined fontSize='large'/>
                        </div>
                    )}
                </div>
            ) : (
                <div className={css.metadataContainer}>
                    <HighwayItemList highwayMetadataArray={highwayMetadataArray} changeSelectedHighway={changeSelectedHighway}/>
                </div>
            )}
        </div>
    )
};