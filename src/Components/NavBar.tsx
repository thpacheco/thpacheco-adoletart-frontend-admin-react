import { Anchor, Nav, Sidebar } from "grommet";
import { Analytics, Cart, Compliance, Configure, Currency, Group } from "grommet-icons";

const NavibarComponet = () => {
    return (
        <Sidebar background="#333333" align="center" round="small"
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
    );
}

export default NavibarComponet;