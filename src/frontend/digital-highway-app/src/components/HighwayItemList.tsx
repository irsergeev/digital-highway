import React, { SetStateAction, useState } from 'react';
import List from '@mui/material/List';
import { ListItem } from '@mui/material';
import { HighwayItem } from './HighwayItem';
import { HighwayMetadata } from '../types';
import { useResponsive } from '../hooks/useResponsive';

interface HighwayItemListProps
{
    highwayMetadataArray: Array<HighwayMetadata>,
    changeSelectedHighway: React.Dispatch<SetStateAction<string>>
}

export const HighwayItemList : React.FC<HighwayItemListProps> = ({ highwayMetadataArray, changeSelectedHighway }) => {
    
    const { windowHeight } = useResponsive();
    const [selectedHighwayItem, setSelectedHighwayItem] = useState<HighwayMetadata | null>();

    function onListItemClick (highwayMetadataItem: HighwayMetadata) {
        setSelectedHighwayItem(highwayMetadataItem);
        changeSelectedHighway(highwayMetadataItem.id!);
    }
    
    return (
    <List style={{ overflow: 'auto', height: windowHeight, padding: 0 }}>
        {highwayMetadataArray.map((highwayMetadataItem, index) => (
            <ListItem key={index} divider onClick={() => onListItemClick(highwayMetadataItem)} sx={{ backgroundColor: `${highwayMetadataItem === selectedHighwayItem ? '#ccc' : '#fff'}` }}>
                <HighwayItem highwayMetadata={highwayMetadataItem} />
            </ListItem>
        ))}
    </List>)
};