import { useState } from "react";
import { Page, PageContent, Button, Box, Form, FormField, TextInput, Text, Notification, Spinner } from "grommet";
import { StatusNotification } from "../../Common/Enum/StatusNotificarion";
import NotificationComponent from "../../Components/notification";
import NotificationModel from "../../Models/Notification.model";
import ProductService from '../../Services/product.service'
import Product from "../../Models/ProductModel";

export const ProductCreate: Product = {
    id: 0,
    name: '',
    price: 10.65,
    ammount: 0,
    ammountMinimun: 0,
    ammountCharged: 0,
    description: ''
};

export const NotificatioModel: NotificationModel = {
    title: '',
    message: '',
    status: '',
}

const ProductNewPage = () => {
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

    const handleChangeMasked = (prop: keyof any) => async (event: React.ChangeEvent<{ value: unknown }>) => {

        const money = String(event.target.value);
        const formatCurrency = _formatCurrency(money);
        debugger;
        const moneyMask = Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(10.99)
        setProductCreate({ ...productCreate, [prop]: formatCurrency });
    };

    const _formatCurrency = (amount: any) => {
        debugger
        amount = amount.replace(/(\d)(?=(\d{3})+(\.(\d){0,2})*$)/g, '$1,');

        if (amount.indexOf(',') === -1)
            return amount + '.00';

        var decimals = amount.split(',')[1];
        
        const valueFinal = decimals.length < 2 ? amount : amount;

        var split = valueFinal.replace(/,/g, '.');

        const digitMoney3 = Number(split.replace(/[^0-9\.]+/g,""));

        return digitMoney3;
    };

    // const FloatConvertMoney = () => {
    //     var number = Number(currency.replace(/[^0-9\.]+/g,""));
    // }


    const SalveNewProduct = () => {
        debugger
        const objCreate: Product = { ...productCreate, price: Number(productCreate.price), ammount: Number(productCreate.ammount), ammountCharged: Number(productCreate.ammountCharged), ammountMinimun: Number(productCreate.ammountMinimun) };
        setLoading(true);
        ProductService.createNewProduct(objCreate).then(
            () => {
                setMsgVisible(true);
                setNotification({ title: "Sucesso", message: "Cliente cadastrado com sucesso.", status: `${StatusNotification.SUCCESS}`, })
                setLoading(false);
                setProductCreate(ProductCreate)
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
        <Page fill>
            <PageContent fill pad='xsmall' >
                {msgvisible && (
                    <NotificationComponent title={notification.title} message={notification.message} status={notification.status} onCloseNotification={CloseNotification}></NotificationComponent>
                )}
                <Box
                    gridArea="header"
                    direction="row"
                    align="center"
                    justify="between"
                    pad={{ horizontal: 'medium', vertical: 'small' }}
                >
                    <Text weight='bold' size="1.4em" color='white' >Cadastro de produtos</Text>
                </Box>
                <Box gridArea="main" flex pad='medium'>
                    <Box pad='medium' width="large">
                        <Form
                            onReset={() => setProductCreate(productCreate)}
                            onSubmit={() => { SalveNewProduct() }}
                        >
                            <FormField required={{ indicator: false }} name="name" htmlFor="text-input-id" label="Nome">
                                <TextInput id="text-input-id" name="name"
                                    value={productCreate.name}
                                    onChange={handleChange('name')}
                                />
                            </FormField>
                            <Box
                                direction="row"
                                justify="between"
                            >
                                <FormField name="name" htmlFor="text-input-id" label="Preço">
                                    <TextInput id="text-input-id" name="price"
                                        value={Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(productCreate.price))}
                                        onChange={handleChangeMasked('price')} />
                                </FormField>
                                <FormField name="name" htmlFor="text-input-id" label="Qtd mínima">
                                    <TextInput type="number" id="text-input-id" name="ammountMinimun"
                                        value={productCreate.ammountMinimun}
                                        onChange={handleChange('ammountMinimun')} />
                                </FormField>
                            </Box>
                            <Box
                                direction="row"
                                justify="between"
                            >
                                <FormField name="name" htmlFor="text-input-id" label="Valores a serem cobrados">
                                    <TextInput type="number" id="text-input-id" name="ammountCharged"
                                        value={productCreate.ammountCharged}
                                        onChange={handleChange('ammountCharged')} />
                                </FormField>
                            </Box>

                            <FormField name="name" htmlFor="text-input-id" label="Obervação">
                                <TextInput id="text-input-id" name="description"
                                    value={productCreate.description}
                                    onChange={handleChange('description')} />
                            </FormField>
                            <Box direction="row" gap="medium">
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