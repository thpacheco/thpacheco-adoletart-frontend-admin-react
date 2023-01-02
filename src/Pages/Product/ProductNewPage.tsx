import { useState } from "react";
import CurrencyInput from "react-currency-input-field";
import { Page, PageContent, Button, Box, Form, FormField, TextInput, Text, Notification, Spinner, Grommet } from "grommet";
import { grommet, ThemeType } from 'grommet/themes';
import { StatusNotification } from "../../Common/Enum/StatusNotificarion";
import NotificationComponent from "../../Components/notification";
import NotificationModel from "../../Models/Notification.model";
import ProductService from '../../Services/product.service'
import Product from "../../Models/ProductModel";
import { deepMerge } from "grommet/utils";
import { useNavigate } from "react-router-dom";

export const ProductCreate: Product = {
    id: 0,
    name: '',
    price: 0,
    ammount: 0,
    ammountMinimun: 0,
    ammount_charged: 0,
    description: ''
};

export const NotificatioModel: NotificationModel = {
    title: '',
    message: '',
    status: '',
}

const ProductNewPage = () => {
    let navigate = useNavigate();
    const [productCreate, setProductCreate] = useState(ProductCreate);
    const [notification, setNotification] = useState(NotificatioModel);
    const [msgvisible, setMsgVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (prop: keyof any) => async (event: React.ChangeEvent<{ value: unknown }>) =>
        setProductCreate({ ...productCreate, [prop]: event.target.value });

    const spinner = <Spinner
        border={[
            { side: 'all', color: 'background-contrast', size: 'medium' },
            { side: 'right', color: '#6FFFB0', size: 'medium' },
            { side: 'top', color: '#6FFFB0', size: 'medium' },
            { side: 'left', color: '#6FFFB0', size: 'medium' },
        ]}
    />;
    const numberFormat = (value: any) => {
        if (isNaN(value) === false) {
            let n = new Intl.NumberFormat("pt-BR", {
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
            }).format(value);
            debugger
            if (String(value).includes(".") && !n.includes(".")) {
                return n + ".";
            }
            return n;
        }
        return "0";
    }
    const handleChangeMasked = (value: any, name: string) => {


        // valueInitial = numberFormat(floatValue);

        // const { value = "" } = event.target;
        // const money = String(event.target.value);
        // var split = money.replace(/,/g, '.');
        // const parsedValue = money.replace(/[^\d.]/gi, "");
        // const digitMoney3 = Number(split.replace(/[^0-9\.]+/g, ""));
        // const formatCurrency = _formatCurrency(money);
        // const moneyMask = Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(formatCurrency))

        setProductCreate({ ...productCreate, [name]: value });
    };

    const FormatCurrency = (value: Number): Number => {
        return Number(value.toString().replace(/,/g, '.'));
    }

    const _formatCurrency = (amount: any) => {
        amount = amount.replace(/(\d)(?=(\d{3})+(\.(\d){0,2})*$)/g, '$1,');

        if (amount.indexOf(',') === -1)
            return amount + '.00';

        var decimals = amount.split(',')[1];

        const valueFinal = decimals.length < 2 ? amount : amount;

        var split = valueFinal.replace(/,/g, '.');

        const digitMoney3 = Number(split.replace(/[^0-9\.]+/g, ""));

        return digitMoney3;
    };

    // const FloatConvertMoney = () => {
    //     var number = Number(currency.replace(/[^0-9\.]+/g,""));
    // }
    const customTheme: ThemeType = {
        formField: {
            label: {
                color: '#6FFFB0',
                size: 'medium',
                margin: { vertical: '0', bottom: 'small', horizontal: '0' },
                weight: 'bold',
            },
            border: false,
            margin: '0',
        },
    };

    const SalveNewProduct = () => {
        const objCreate: Product =
        {
            ...productCreate,
            price: Number(FormatCurrency(productCreate.price)),
            ammount_charged: Number(FormatCurrency(productCreate.ammount_charged)),
            ammountMinimun: Number(FormatCurrency(productCreate.ammountMinimun))
        };
        setLoading(true);
        ProductService.createNewProduct(objCreate).then(
            () => {
                setMsgVisible(true);
                setNotification({ title: "Sucesso", message: "Cliente cadastrado com sucesso.", status: `${StatusNotification.SUCCESS}`, })
                setLoading(false);
                setProductCreate(ProductCreate)
                navigate('/products');
            }
            , () => {
                setMsgVisible(true);
                setNotification({ title: "Erro", message: "Ocorreu um erro ao cadastrar um novo Cliente", status: `${StatusNotification.CRITICAL}`, })
                setLoading(false);
            })
    }

    const CloseNotification = () => {
        setMsgVisible(false);
    }

    return (
        <Page fill >
            <PageContent fill pad='xsmall' >
                {msgvisible && (
                    <NotificationComponent title={notification.title} message={notification.message} status={notification.status} onCloseNotification={CloseNotification}></NotificationComponent>
                )}
                <Box
                    gridArea="header"
                    direction="row"
                    align="center"
                    justify="between"
                    pad={{ horizontal: '2em', vertical: 'auto' }}
                >
                    <Text weight='bold' size="1.4em" color="#6FFFB0">Cadastro de produtos</Text>
                </Box>
                <Box gridArea="main" flex pad='xsmall' >
                    <Box pad='medium' width="large">
                        <Form onReset={() => setProductCreate(productCreate)} onSubmit={() => { SalveNewProduct() }}>
                            <Box gap="small" pad="xsmall">
                                <Text color="#6FFFB0" textAlign="start" weight="bold" size="medium">Nome</Text>
                                <TextInput name="name"
                                    value={productCreate.name}
                                    onChange={handleChange('name')}
                                />
                            </Box>
                            <Box direction="row" justify="between">
                                <Box direction="column" gap="small" pad="xsmall">
                                    <Text color="#6FFFB0" textAlign="start" weight="bold" size="medium">Valor Item</Text>
                                    <CurrencyInput name="price" type="text" customInput={TextInput} value={productCreate.price} onValueChange={(value) => { handleChangeMasked(value, "price") }} allowDecimals={true} intlConfig={{ locale: "pt-BR", currency: "BRL" }} />
                                </Box>

                                <Box direction="column" gap="small" pad="xsmall">
                                    <Text color="#6FFFB0" textAlign="start" weight="bold" size="medium">Valor cobrado</Text>
                                    <CurrencyInput customInput={TextInput} value={productCreate.ammount_charged} onValueChange={(value) => { handleChangeMasked(value, "ammount_charged") }} allowDecimals={true} intlConfig={{ locale: "pt-BR", currency: "BRL" }} />
                                </Box>
                            </Box>

                            <Box direction="column" gap="small" pad="xsmall">
                                <Text color="#6FFFB0" textAlign="start" weight="bold" size="medium">Quantidade</Text>
                                <TextInput value={productCreate.ammount} onChange={handleChange("ammount")} />
                            </Box>

                            <Box direction="column" gap="small" pad="xsmall">
                                <Text color="#6FFFB0" textAlign="start" weight="bold" size="medium">Descrição</Text>
                                <TextInput id="text-input-id" name="description"
                                    value={productCreate.description}
                                    onChange={handleChange('description')} />
                            </Box>

                            <Box direction="row-reverse" gap="medium" alignSelf="end" pad="xsmall">
                                {loading ? spinner : <Button type="submit" primary label="Salvar" />}
                                <Button type="reset" label="Limpar" />
                            </Box>
                        </Form>
                    </Box>

                </Box>
            </PageContent>
        </Page >
    );
};
export default ProductNewPage;