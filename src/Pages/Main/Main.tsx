import { Anchor, Avatar, Box, Footer, Grid, grommet, Grommet, Header, Layer, Nav, Sidebar, Text } from "grommet";
import { Analytics, Cart, Compliance, Configure, Currency, Group, Menu } from "grommet-icons";
import { Outlet } from "react-router-dom";

const Main = () => {
    return (
        <Grommet theme={grommet} full >
            <Layer full>
                <Grid fill rows={["auto", "flex", "auto"]}>
                    <Box tag="header" background="#0d0a14" pad="small">
                        <Box direction="row" pad='none' align="center" gap="small">
                            <Avatar background="dark-1">IRIS</Avatar>
                            <Anchor color="white" size="xlarge" href="">
                                Adoleta arts
                            </Anchor>
                        </Box>
                    </Box>
                    <Box direction='row' flex overflow={{ horizontal: 'hidden' }}>
                        <Box width="small" background="light-2">
                            <Sidebar background="#0d0a14" align="center"
                                footer={
                                    <Anchor icon={<Configure color='white' size='medium' />} href="" label="Configuração " key="" />
                                }
                            >
                                <Nav gap="medium" pad='small' >
                                    <Anchor icon={<Currency color='white' size='medium' />} label="Orçamento" />
                                    <Anchor icon={<Group color='white' size='medium' />} href="/custumer" label="Clientes" key="" />
                                    <Anchor icon={<Analytics color='white' size='medium' />} href="" label="Gráficos" key="" />
                                    <Anchor icon={<Cart color='white' size='medium' />} href="" label="Pedidos" key="" />
                                    <Anchor icon={<Compliance color='white' size='medium' />} href="" label="Relatórios" key="" />
                                </Nav>
                            </Sidebar>
                        </Box>
                        <Box overflow="auto" flex background="#15131a">
                            <Outlet />
                        </Box>
                    </Box>
                    <Box tag="footer" pad="small" background="dark-1">
                        <Anchor color="white" size="small" href="">
                            @Adoletarts Todos direitos
                        </Anchor>
                    </Box>
                </Grid>
            </Layer>
        </Grommet>
    );
}
export default Main;