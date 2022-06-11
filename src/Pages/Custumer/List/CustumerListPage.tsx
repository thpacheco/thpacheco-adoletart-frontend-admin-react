import { Box, Button, DataTable, Page, PageContent, Text } from "grommet";
import { Add, Checkmark, Currency, Erase, FormTrash } from "grommet-icons";
import { useNavigate } from "react-router-dom";

const CustumerListPage = () => {
    let navigate = useNavigate();


    const listCustumers = [
        { nome: 'Jessíca Xavier a', telefone: '(11) 97999-3131', email: 'jessicaalves@hotmaiil.com', ativo: true },
        { nome: 'Jessíca Xavier', telefone: '(11) 97999-3131', email: 'jessicaalves@hotmaiil.com', ativo: true },
        { nome: 'Jessíca Xavier', telefone: '(11) 97999-3131', email: 'jessicaalves@hotmaiil.com', ativo: true },
        { nome: 'Jessíca Xavier', telefone: '(11) 97999-3131', email: 'jessicaalves@hotmaiil.com', ativo: true },
        { nome: 'Jessíca Xavier', telefone: '(11) 97999-3131', email: 'jessicaalves@hotmaiil.com', ativo: true },
        { nome: 'Jessíca Xavier', telefone: '(11) 97999-3131', email: 'jessicaalves@hotmaiil.com', ativo: true },
        { nome: 'Jessíca Xavier', telefone: '(11) 97999-3131', email: 'jessicaalves@hotmaiil.com', ativo: true },
        { nome: 'Jessíca Xavier', telefone: '(11) 97999-3131', email: 'jessicaalves@hotmaiil.com', ativo: true },
        { nome: 'Jessíca Xavier', telefone: '(11) 97999-3131', email: 'jessicaalves@hotmaiil.com', ativo: true },
        { nome: 'Jessíca Xavier', telefone: '(11) 97999-3131', email: 'jessicaalves@hotmaiil.com', ativo: true },
        { nome: 'Jessíca Xavier', telefone: '(11) 97999-3131', email: 'jessicaalves@hotmaiil.com', ativo: true },
        { nome: 'Jessíca Xavier', telefone: '(11) 97999-3131', email: 'jessicaalves@hotmaiil.com', ativo: true },
        { nome: 'Jessíca Xavier', telefone: '(11) 97999-3131', email: 'jessicaalves@hotmaiil.com', ativo: true },
        { nome: 'Jessíca Xavier', telefone: '(11) 97999-3131', email: 'jessicaalves@hotmaiil.com', ativo: true },
        { nome: 'Jessíca Xavier', telefone: '(11) 97999-3131', email: 'jessicaalves@hotmaiil.com', ativo: true },
        { nome: 'Jessíca Xavier', telefone: '(11) 97999-3131', email: 'jessicaalves@hotmaiil.com', ativo: true }]
    return (
        <Page fill>
            <PageContent fill pad='xsmall'>
                <Box
                    gridArea="header"
                    direction="row"
                    align="center"
                    justify="between"
                    pad={{ horizontal: 'medium', vertical: 'small' }}
                >
                    <Text weight='bold' size="1.4em" color='white' >Todos seus clientes</Text>
                    <Button onClick={() => { navigate('new', { replace: true }); }} primary icon={<Add size='medium' />} label="Novo Cliente" margin={{ end: 'xsmall' }} />
                </Box>
                <Box margin='small'>
                    <DataTable step={10} paginate
                        columns={[
                            {
                                property: 'nome',
                                header: <Text>Nome</Text>,
                                primary: true,
                                sortable: true
                            },
                            {
                                property: 'telefone',
                                header: <Text>Telefone</Text>,
                                primary: true,
                            },
                            {
                                property: 'email',
                                header: <Text>Valor Unitário</Text>,
                                primary: true,
                            },
                            {
                                property: 'ativo',
                                render: dataItem => (<Checkmark color="#008000" size='medium' />),
                                header: <Text>Ativo</Text>,
                                primary: true,
                            },
                            {
                                property: '',
                                render: () => (<Button
                                    a11yTitle="100 Filters Applied"
                                    icon={<Erase color='neutral-3' />}
                                    onClick={() => { navigate(`/custumers/${10}`, { replace: true }); }}
                                    secondary
                                    color="dark-1"
                                />
                                ),
                                header: 'Editar',
                                align: 'center',
                                primary: true,
                            },
                            {
                                property: '',
                                render: () => (<Button
                                    a11yTitle="100 Filters Applied"
                                    icon={<FormTrash color='status-error' />}
                                    onClick={() => { }}
                                    secondary
                                    color="dark-1"
                                />
                                ),
                                header: 'Excluir',
                                align: 'center',
                                primary: true,
                            }
                        ]}
                        data={listCustumers}
                    />
                </Box>
            </PageContent>
        </Page >);
};

export default CustumerListPage;