import * as React from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { styled } from '@mui/material';


const StyledTabs = styled((props) => (
    <TabList
        {...props}
        TabIndicatorProps={{ children: <div className="triangle-bg-xxs"></div> }}
    />
))({
    '& .MuiTabs-indicator': {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        position: 'relative',
    },
    '& .MuiTabs-indicatorSpan': {
        maxWidth: 40,
        width: '100%',
        backgroundColor: '#635ee7',
    },
});

const StyledTab = styled((props) => <Tab {...props} />)(
    ({ theme }) => ({
        textTransform: 'none',
        fontWeight: 'bold',
        fontSize: 16,
        marginRight: theme.spacing(1),
        color: 'rgba(0, 0, 0, 0.7)',
        borderRadius: '6px 6px 0px 0px',
        '&.Mui-selected': {
            color: '#fff',
            background: 'linear-gradient(270deg, #ec008c, #fc6767)',
        },
        '&:hover': {
            backgroundColor: '#f4f4f4',
        },
        '&.Mui-focusVisible': {
            backgroundColor: 'rgba(100, 95, 228, 0.32)',
        },
    }),
);


export default function ExperimentTabs() {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <StyledTabs className="relative" centered onChange={handleChange} aria-label="lab API tabs example">
                        <StyledTab label="Donation Requests" value="1" />
                        <StyledTab label="Donation History" value="2" />
                    </StyledTabs>
                </Box>
                <TabPanel value="1">Item One</TabPanel>
                <TabPanel value="2">Item Two</TabPanel>
            </TabContext>
        </Box>
    );
}
