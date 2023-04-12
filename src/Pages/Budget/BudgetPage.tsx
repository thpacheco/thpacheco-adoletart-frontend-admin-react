import { Avatar, Box, Button, Card, DataTable, Form, FormField, Grid, Heading, Meter, Page, PageContent, Text, TextInput } from "grommet";
import { User } from "grommet-icons";
import { useEffect, useState } from "react";
import Product from "../../Models/ProductModel";
import Custumer from "../../Models/CustumerModel";
import CustumerService from "../../Services/custumer.service";
import ProductService from '../../Services/product.service'
import CustumerBudget from "../../Models/CustumerModel";
import CurrencyInput from "react-currency-input-field";
import Budget from "../../Models/BudgetModel";

export const dataBudgetDefault: Budget = {
    id: 0,
    item: '',
    ammount: 0,
    ammountMinimun: 0,
    price: 0,
};
export const products: Product = {
    id: 0,
    name: '',
    price: 0,
    ammount: 0,
    ammountMinimun: 0,
    ammount_charged: 0,
    description: '',
    userid: 0
};

export const custumersBudget: CustumerBudget = {
    id: 0,
    name: '',
    email: '',
    telephone: '',
    active: false,
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
    const [listCustumers, setListCustumers] = useState([custumersBudget]);
    const [_listCustumers, _setListCustumers] = useState(custumersBudget);

    useEffect(() => {
        setlistBudget(() => [...[]]);
        getListAllProducts();
    }, []);

    const getListAllProducts = () => {
        ProductService.listAllProducts().then((response: any) => {
            setListProducts(response.data)
        });
    }

    const getListAllCustumers = () => {
        CustumerService.listAllCustumers().then((response: any) => {
            setListCustumers(response.data)
        });
    }

    const onChangeSuggestionProduct = (event: any) => {
        const nextValue = event.target.value;
        setdataBudget({ ...dataBudget, ['item']: nextValue });

        if (!nextValue) setlistProductsSuggestion(listProducts);
        else {
            setlistProductsSuggestion(listProducts.filter((s) => s.name));
        }
    };

    const onChangeSuggestionCustumers = (event: any) => {
        const nextValue = event.target.value;
        setdataBudget({ ...dataBudget, ['item']: nextValue });

        if (!nextValue) setlistProductsSuggestion(listProducts);
        else {
            setlistProductsSuggestion(listProducts.filter((s) => s.name));
        }
    };

    const handleChange = (prop: keyof any) => async (event: React.ChangeEvent<{ value: unknown }>) => {
        debugger
        setdataBudget({ ...dataBudget, [prop]: event.target.value });
        setdataBudget({ ...dataBudget, ['item']: "Thiago Pacheco" });
        setdataBudget({ ...dataBudget, ['ammount']: 10 });
        setdataBudget({ ...dataBudget, ['price']: 20 });
    }

    const addBudget = () => {
        setlistBudget(listBudget => [...listBudget, dataBudget]);
    };

    const onSuggestionProductSelect = (event: any) => {
        setdataBudget({ ...dataBudget, ['item']: event.suggestion });
    };

    const onSuggestionCustumersSelect = (event: any) => {
        setdataBudget({ ...dataBudget, ['item']: event.suggestion });
    };

    const handleChangeMasked = (value: any, name: string) => {
        setdataBudget({ ...dataBudget, [name]: value });
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
                                    onChange={onChangeSuggestionProduct}
                                    suggestions={listProductsSuggestion.map((c) => c.name).filter((f) => f)}
                                    onSuggestionSelect={onSuggestionProductSelect}
                                    aria-label="Input Text"
                                />
                            </Box>
                            <Box width='medium' pad='xsmall'>
                                <Text color="#6FFFB0" textAlign="start" weight="bold" size="medium">Quantidade</Text>
                                <TextInput
                                    placeholder="Quantidade"
                                    value={dataBudget.ammount}
                                    onChange={handleChange('ammount')}
                                />
                            </Box>
                            <Box width='medium' pad='xsmall'>
                                <Text color="#6FFFB0" textAlign="start" weight="bold" size="medium">Valor Unitário - {_listCustumers.id}</Text>
                                <CurrencyInput customInput={TextInput} value={dataBudget.ammountMinimun} onValueChange={(value) => { handleChangeMasked(value, "ammountMinimun") }} allowDecimals={true} intlConfig={{ locale: "pt-BR", currency: "BRL" }} />
                            </Box>
                            <Box width='medium' pad='xsmall'>
                                <Text color="#6FFFB0" textAlign="start" weight="bold" size="medium">Valor - {_listCustumers.telephone} </Text>
                                <CurrencyInput customInput={TextInput} value={dataBudget.price} onValueChange={(value) => { handleChangeMasked(value, "price") }} allowDecimals={true} intlConfig={{ locale: "pt-BR", currency: "BRL" }} />
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
                                            render: (datum) => amountFormatter.format(datum.price),
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