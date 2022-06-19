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

    useEffect(() => {
        setlistBudget(() => [...[]]);
    }, []);

    const handleChange = (prop: keyof any) => async (event: React.ChangeEvent<{ value: unknown }>) =>
        setdataBudget({ ...dataBudget, [prop]: event.target.value });

    const addBudget = () => {
        setlistBudget(listBudget => [...listBudget, dataBudget]);
    };

    return (
        <Page fill >
            <PageContent fill pad='xsmall' >
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
                    <Box
                    gridArea="header"
                    direction="row"
                    align="center"
                    justify="between"
                    pad={{ horizontal: 'medium', vertical: 'small' }}
                    
                >
                    <Text weight='bold' size="1.4em" color='white' >Orçamentos</Text>
                </Box>
                    <Box direction="column" pad='small' gridArea="nav">
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
                                <Text weight='bold' color='white'>Vlr Unt</Text>
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
                    <Box gridArea="main" height='auto'>
                        <Box direction='column'>
                            <Box align="center">
                                <Text weight='bold' size="1.5em" color='white'>Jessíca</Text>
                            </Box>
                            <Box pad='xsmall'>
                                <DataTable step={8} paginate border={{ color: 'brand', size: 'xsmall' }}
                                    columns={[
                                        {
                                            property: 'item',
                                            header: <Text>Item</Text>,
                                            primary: true,
                                            footer: 'Total',
                                            sortable: true
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
                                            render: (datum) => amountFormatter.format(datum.valor),
                                            align: 'end',
                                            aggregate: 'sum',
                                            footer: { aggregate: true },
                                        },
                                        {
                                            property: '',
                                            header: 'Ação',
                                            align: 'center',
                                            primary: true,
                                        }
                                    ]}
                                    data={listBudget}
                                />
                            </Box>
                        </Box>
                    </Box>
                </Grid>
            </PageContent>
        </Page>);
}

export default BudgetPage;