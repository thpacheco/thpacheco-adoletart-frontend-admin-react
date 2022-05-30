import { Avatar, Box, Button, Card, DataTable, Form, FormField, Grid, Heading, Meter, Page, PageContent, Text, TextInput } from "grommet";
import { User } from "grommet-icons";
import { useEffect, useState } from "react";

export const dataBudgetDefault = {
    idBudGet: 0,
    item: '',
    quantidade: 0,
    valorUnitario: 0,
    valor: 0
};

const amountFormatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
});

const BudgetPage = () => {
    const [dataBudget, setdataBudget] = useState(dataBudgetDefault);
    const [listBudget, setlistBudget] = useState([dataBudgetDefault]);

    const handleChange = (prop: keyof any) => async (event: React.ChangeEvent<{ value: unknown }>) =>
        setdataBudget({ ...dataBudget, [prop]: event.target.value });

    const addBudget = () => {
        setlistBudget(listBudget => [...listBudget, dataBudget]);
    };

    return (<Page fill >
        <PageContent fill pad='xsmall' >
            {/* <Heading size='small'>Clientes</Heading> */}
            <Grid fill
                rows={['xxsmall', 'auto']}
                columns={['auto', 'auto']}
                gap="small"
                areas={[
                    { name: 'header', start: [0, 0], end: [1, 0] },
                    { name: 'nav', start: [0, 1], end: [0, 1] },
                    { name: 'main', start: [1, 1], end: [1, 1] },
                ]}
            >
                <Box gridArea="header" background="brand" pad='xsmall'> <Text weight='bold' size="1.5em" color='white'>Orçamento</Text></Box>
                <Box direction="column" pad='small' gridArea="nav" background="#2c2828">
                    <Box direction="row" pad='xsmall'>
                        <Box width='medium' pad='xsmall'>
                            <Text weight='bold' color='white'>Produto</Text>
                            <TextInput
                                placeholder="Item"
                                value={dataBudget.item}
                                onChange={handleChange('item')}
                            />
                        </Box>
                        <Box width='small' pad='xsmall'>
                            <Text weight='bold' color='white'>Qtd</Text>
                            <TextInput
                                placeholder="Quantidade"
                                value={dataBudget.quantidade}
                                onChange={handleChange('quantidade')}
                            />
                        </Box>
                        <Box width='small' pad='xsmall'>
                            <Text weight='bold' color='white'>Vlr Unit</Text>
                            <TextInput
                                placeholder="Valor Unitário"
                                value={dataBudget.valorUnitario}
                                onChange={handleChange('valorUnitario')}
                            />
                        </Box>
                        <Box width='small' pad='xsmall'>
                            <Text weight='bold' color='white'>Valor</Text>
                            <TextInput
                                placeholder="Valor"
                                value={dataBudget.valor}
                                onChange={handleChange('valor')}
                            />
                        </Box>
                        <Box width='small' pad='medium' margin='0.5em' align="center">
                            <Button type="submit" primary label="Add" onClick={() => { addBudget() }} />
                        </Box>
                    </Box>
                </Box>
                <Box gridArea="main" background="#2c2828" height='auto'>
                    <Box pad='medium'>
                        <DataTable border={{ color: 'brand', size: 'xsmall' }}
                            columns={[
                                {
                                    property: 'item',
                                    header: <Text>Item</Text>,
                                    primary: true,
                                    footer: 'Total',
                                },
                                {
                                    property: 'quantidade',
                                    header: <Text>Qtd</Text>,
                                    primary: true,
                                },
                                {
                                    property: 'valorUnitario',
                                    header: <Text>Valor Unitário</Text>,
                                    primary: true,
                                },
                                {
                                    property: 'valor',
                                    header: 'Valor',
                                    render: (datum) => amountFormatter.format(datum.valor / 100),
                                    align: 'end',
                                    aggregate: 'sum',
                                    footer: { aggregate: true },
                                }
                            ]}
                            data={listBudget}
                        />
                    </Box>
                </Box>
            </Grid>
        </PageContent>
    </Page>);
}

export default BudgetPage;