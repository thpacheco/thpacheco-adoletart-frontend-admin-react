import { Accordion, AccordionPanel, Anchor, Box, Button, Nav, Sidebar, Text } from "grommet";
import { Analytics, Cart, Compliance, Configure, Currency, Group, Package } from "grommet-icons";
import { useNavigate } from "react-router-dom";

const SidebarComponet = () => {
    let navigate = useNavigate();
    const custumerImage = <Box>
        <Anchor icon={<Analytics color='white' size='medium' />} href="custumer" label="Clientes" key="" />
    </Box>;
    return (
        <Box width="auto" background="light-2">
            <Sidebar background="#0d0a14" align="center"
                footer={
                    <Anchor icon={<Configure color='white' size='medium' />} href="" label="Configuração " key="" />
                }
            >
                <Nav gap="medium" pad='large' >
                    <Anchor size="1.2em" onClick={() => { navigate('/custumers'); }} label="Clientes" key=""
                        icon={<Group color='white' size='medium' />} />
                    <Anchor size="1.2em" onClick={() => { navigate('/products'); }} label="Produtos" key=""
                        icon={<Package color='white' size='medium' />} />
                    <Anchor size="1.2em" onClick={() => { navigate('/budget'); }} label="Orçamento"
                        icon={<Currency color='white' size='medium' />} />
                    <Anchor size="1.2em" onClick={() => { navigate('/'); }} label="Pedidos" key=""
                        icon={<Cart color='white' size='medium' />} />
                    <Anchor size="1.2em" onClick={() => { navigate('/'); }} label="Relatórios" key=""
                        icon={<Compliance color='white' size='medium' />} />
                </Nav>
            </Sidebar>
        </Box>
    );
}

export default SidebarComponet;