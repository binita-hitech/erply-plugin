import { CopyAll } from '@mui/icons-material';
import { Grid } from '@mui/material';
import React from 'react';

function CopyAllTexts() {
    const list = [
        {
            id: 1,
            name: 'aaa',
            name1: 'wer1'
        },
        {
            id: 2,
            name: 'bbb',
            name1: 'wer2'
        },
        {
            id: 3,
            name: 'ccb',
            name1: 'wer3'
        },
        {
            id: 4,
            name: 'babb',
            name1: 'wer4'
        },
    ];

    const handleCopyAllText = () => {
        const copiedTextValues = list.map((item) => {
            return `${item.id}\t${item.name}\t${item.name1}`;
        }).join('\n');
        navigator.clipboard.writeText(copiedTextValues);
    };
    

    return (
        <div>
            <CopyAll onClick={handleCopyAllText} />
            <Grid container spacing={2}>
                {list.map((item) => (
                    <Grid key={item.id} xs={4}>
                        {item.name}
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}

export default CopyAllTexts;
