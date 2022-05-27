import { Box, Card, Grid, Heading, Page, PageContent, Paragraph } from "grommet";

const CustumerPage = () => {
    return (

        <Page>
            <PageContent>
                <Heading>Clientes</Heading>
                <Paragraph>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer commodo
                    gravida tincidunt. Nunc fringilla blandit tortor, id accumsan nisi
                    dictum quis. Aenean porttitor at mi id semper. Donec mattis bibendum
                    leo, interdum ullamcorper lectus ultrices vel. Fusce nec enim faucibus
                    nunc porta egestas. Fusce dapibus lobortis tincidunt.
                </Paragraph>
                <Grid rows="small" columns={{ count: 'fit', size: 'small' }} gap="small">
                    <Card background="white" pad="large">
                        Card
                    </Card>
                    <Card background="white" pad="large">
                        Card
                    </Card>
                </Grid>
                <Paragraph>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer commodo
                    gravida tincidunt. Nunc fringilla blandit tortor, id accumsan nisi
                    dictum quis. Aenean porttitor at mi id semper. Donec mattis bibendum
                    leo, interdum ullamcorper lectus ultrices vel. Fusce nec enim faucibus
                    nunc porta egestas. Fusce dapibus lobortis tincidunt.
                </Paragraph>
            </PageContent>
        </Page>
    )
}; export default CustumerPage;