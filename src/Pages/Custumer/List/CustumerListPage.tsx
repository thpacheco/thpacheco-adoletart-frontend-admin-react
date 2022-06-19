import { Box, Button, DataTable, Page, PageContent, Spinner, Text } from "grommet";
import { Add, Checkmark, Currency, Erase, FormTrash } from "grommet-icons";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Custumer from "../../../Models/CustumerModel";
import CustumerService from '../../../Services/custumer.service'

export const custumes: Custumer = {
    id: 0,
    name: '',
    email: '',
    telephone: ''
};

const CustumerListPage = () => {
    let navigate = useNavigate();
    const [listCustumers, setCustumers] = useState([custumes]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getListAllCustumers();
    }, []);

    const getListAllCustumers = () => {
        setLoading(true)
        CustumerService.listAllCustumers().then(
            (response) => {
                setCustumers(response.data)
                setLoading(false)
            });
    }
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
                        placeholder={
                            loading && (<Box
                                fill
                                align="center"
                                justify="center"
                                direction="row"
                                pad="large"
                                gap="small"
                                background={{ color: 'background-front', opacity: 'strong' }}
                            >
                                <Spinner />
                                <Text weight="bold">Carregando ...</Text>
                            </Box>)
                        }
                        columns={[
                            {
                                property: 'name',
                                header: <Text>Nome</Text>,
                                primary: true,
                                sortable: true
                            },
                            {
                                property: 'telephone',
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
                                render: (dataItem) => (<Button
                                    a11yTitle="100 Filters Applied"
                                    icon={<Erase color='neutral-3' />}
                                    onClick={() => { navigate(`${dataItem.id}`, { replace: true }); }}
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