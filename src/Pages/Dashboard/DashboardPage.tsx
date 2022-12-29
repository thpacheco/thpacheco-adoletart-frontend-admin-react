import { Avatar, Box, Chart, Page, PageContent, Text } from "grommet";
import { User } from "grommet-icons";
import { useEffect, useState } from "react";
import CustumerService from '../../Services/custumer.service'

const DashboardPage = () => {

    const [totalCustumers, setotalCustumers] = useState(0);

    useEffect(() => {
        TotaldeClientes();
    }, []);

    const TotaldeClientes = () => {
        CustumerService.countAllCustumer().then(
            (response) => {

                console.log(response.data)
                console.log(response.data)
                setotalCustumers(response.data)
            },
            () => {

            }
        );
    }

    return (
        <Page fill>
            <PageContent fill pad='xsmall' >
                <Box
                    gridArea="header"
                    direction="row"
                    align="center"
                    justify="between"
                    pad={{ horizontal: 'medium', vertical: 'small' }}
                >
                    <Text weight='bold' size="1.4em" color='white' >Dashboard Analytical</Text>
                </Box>
                <Box gridArea="main" flex>
                    <Box direction="row" pad='row' width="large">
                        <Box pad='small' round="xsmall" direction="row" margin="xsmall" background="#27252c" width="100em" height="xsmall">
                            <Avatar margin={{ top: "0.1em", right: "0.5em" }} size="4em">
                                <User color='white' size='large' />
                            </Avatar>
                            <Text weight='bold' margin={{ top: "1em", right: "0.6em" }} color='white' size="large">Total de clientes</Text>
                            <Text weight='bold' color='#6ffba6' size="3em" alignSelf="end">{totalCustumers}</Text>
                        </Box>
                    </Box>
                </Box>
            </PageContent>
        </Page >);
}
export default DashboardPage;