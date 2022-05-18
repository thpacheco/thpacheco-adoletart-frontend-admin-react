import { Anchor, Avatar, Box, Button, grommet, Grommet, Nav, Sidebar } from "grommet";
import { Analytics, BarChart, Cart, Compliance, Configure, Currency, FormAdd, Group } from "grommet-icons";
import { BrowserRouter, Outlet } from "react-router-dom";
import Routers from "../Router/Routes";

const Main = () => {
    return (
        <Grommet theme={grommet} full>
            <Box fill>
                <Box flex={false} tag="header" background="brand" pad="small">
                    <Box direction="row" pad='nome' align="center" gap="small">
                        <Avatar background="dark-1">IRIS</Avatar>
                        <Anchor color="white" size="xlarge" href="">
                            Adoleta arts
                        </Anchor>
                    </Box>
                </Box>
                <Box
                    direction="row"
                    pad="none"
                    flex={true}
                >
                    <Box pad="small" background="brand">
                        <Sidebar background="brand" align="center" round="small"
                            footer={
                                <Anchor icon={<Configure color='white' size='medium' />} href="" label="Configuração " key="" />
                            }
                        >
                            <Nav gap="medium" pad='small' >
                                <Anchor icon={<Currency color='white' size='medium' />} label="Orçamento" />
                                <Anchor icon={<Group color='white' size='medium' />} href="" label="Clientes" key="" />
                                <Anchor icon={<Analytics color='white' size='medium' />} href="" label="Gráficos" key="" />
                                <Anchor icon={<Cart color='white' size='medium' />} href="" label="Pedidos" key="" />
                                <Anchor icon={<Compliance color='white' size='medium' />} href="" label="Relatórios" key="" />
                            </Nav>
                        </Sidebar>
                    </Box>
                    <Box pad="medium" fill background="light-1">
                        <Outlet />
                    </Box>
                </Box>
                <Box flex={false} background="dark-1" pad="small">
                    <Anchor color="white" size="small" href="">
                        @Adoletarts Todos direitos
                    </Anchor>
                </Box>
            </Box>
        </Grommet>
    );
}
export default Main;