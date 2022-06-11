import { Accordion, AccordionPanel, Anchor, Box, Nav, Sidebar, Text } from "grommet";
import { Analytics, Cart, Compliance, Configure, Currency, Group } from "grommet-icons";

const SidebarComponet = () => {
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
                <Nav gap="medium" pad='medium' >
                    {/* <Accordion>
                        <AccordionPanel label={custumerImage}>
                            <Box pad="medium">
                                <Anchor icon={<Analytics color='white' size='medium' />} href="custumer" label="Clientes" key="" />
                            </Box>
                        </AccordionPanel>
                    </Accordion> */}
                    <Anchor icon={<Group color='white' size='medium' />} href="/custumers" label="Clientes" key="" />
                    <Anchor icon={<Currency color='white' size='medium' />} href="/budget" label="Orçamento" />
                    <Anchor icon={<Cart color='white' size='medium' />} href="" label="Pedidos" key="" />
                    <Anchor icon={<Compliance color='white' size='medium' />} href="" label="Relatórios" key="" />
                </Nav>
            </Sidebar>
        </Box>
    );
}

export default SidebarComponet;