import { Avatar, Box, Button, Card, DataTable, Form, FormField, Grid, Heading, Meter, Page, PageContent, Text, TextInput } from "grommet";
import { User } from "grommet-icons";
import { useEffect, useState } from "react";
import Product from "../../Models/ProductModel";
import ProductService from '../../Services/product.service'

export const dataBudgetDefault = {
    idBudGet: 0,
    item: '',
    quantidade: 0,
    valorUnitario: 0,
    valor: 0
};
export const products: Product = {
    id: 0,
    name: '',
    price: 0,
    ammount: 0,
    ammountMinimun: 0,
    ammount_charged: 0,
    description: ''
};

const amountFormatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
});

const BudgetPage = () => {
    const [dataBudget, setdataBudget] = useState(dataBudgetDefault);
    const [listBudget, setlistBudget] = useState([dataBudgetDefault]);
    const [listProducts, setListProducts] = useState([products]);
    const [listProductsSuggestion, setlistProductsSuggestion] = useState(listProducts);

    useEffect(() => {
        setlistBudget(() => [...[]]);
        getListAllProducts();
    }, []);

    const getListAllProducts = () => {
        ProductService.listAllProducts().then((response: any) => {
            setListProducts(response.data)
        });
    }

    const onChange = (event: any) => {
        debugger
        const nextValue = event.target.value;

        setdataBudget({ ...dataBudget, ['item']: nextValue });

        if (!nextValue) setlistProductsSuggestion(listProducts);
        else {
            setlistProductsSuggestion(listProducts.filter((s) => s.name));
        }
    };

    const handleChange = (prop: keyof any) => async (event: React.ChangeEvent<{ value: unknown }>) => {
        setdataBudget({ ...dataBudget, [prop]: event.target.value });
    }

    const addBudget = () => {
        setlistBudget(listBudget => [...listBudget, dataBudget]);
    };

    const onSuggestionSelect = (event: any) => {
        debugger
        setdataBudget({ ...dataBudget, ['item']: event.suggestion });
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
                        <Text weight='bold' size="1.4em" color="#6FFFB0">Orçamento</Text>
                    </Box>
                    <Box direction="column" pad='small' gridArea="nav">
                        <Box pad='medium' width="large">
                            <Box width='medium' pad='xsmall'>
                                <Text color="#6FFFB0" textAlign="start" weight="bold" size="medium">Produto</Text>
                                <TextInput
                                    placeholder="Item"
                                    value={dataBudget.item}
                                    onChange={onChange}
                                    suggestions={listProductsSuggestion.map((c) => c.name).filter((f) => f)}
                                    onSuggestionSelect={onSuggestionSelect}
                                    aria-label="Input Text"
                                />
                            </Box>
                            <Box width='medium' pad='xsmall'>
                                <Text color="#6FFFB0" textAlign="start" weight="bold" size="medium">Quantidade</Text>
                                <TextInput
                                    placeholder="Quantidade"
                                    value={dataBudget.quantidade}
                                    onChange={handleChange('quantidade')}
                                />
                            </Box>
                            <Box width='medium' pad='xsmall'>
                                <Text color="#6FFFB0" textAlign="start" weight="bold" size="medium">Valor Unitário</Text>
                                <TextInput
                                    placeholder="Valor Unitário"
                                    value={dataBudget.valorUnitario}
                                    onChange={handleChange('valorUnitario')}
                                />
                            </Box>
                            <Box width='medium' pad='xsmall'>
                                <Text color="#6FFFB0" textAlign="start" weight="bold" size="medium">Valor</Text>
                                <TextInput
                                    placeholder="Valor"
                                    value={dataBudget.valor}
                                    onChange={handleChange('valor')}
                                />
                            </Box>
                            <Box direction="row-reverse" gap="medium" alignSelf="center" pad="small">
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