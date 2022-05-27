import {
    Anchor,
    Box,
    Button,
    Grid,
    Header,
    Heading,
    NameValueList,
    NameValuePair,
    Page,
    PageContent,
    Paragraph,
    Text,
} from 'grommet';

const PageHeaderComponent: React.FC<any> = ({ title, subtitle }) => {
    return (
        <Header direction="row" gap="none" style={{ border: '1px solid' }}>
            <Grid
                rows={['xxsmall', 'xsmall']}
                columns={['xsmall', 'small']}
                gap="small"
                areas={[
                    { name: 'header', start: [0, 0], end: [1, 0] },
                    { name: 'nav', start: [0, 1], end: [0, 1] },
                    { name: 'main', start: [1, 1], end: [1, 1] },
                ]}
            >
                <Box gridArea="header" background="brand" />
                <Box gridArea="nav" background="light-5" />
                <Box gridArea="main" background="light-2" />
            </Grid>
        </Header>
    );
};
export default PageHeaderComponent;