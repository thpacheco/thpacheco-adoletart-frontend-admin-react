import { Avatar, Box, Button, Card, Form, FormField, Grid, Heading, Page, PageContent, Spinner, Text, TextInput } from "grommet";
import { Basket, Compliance, Package, User } from "grommet-icons";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { StatusNotification } from "../../Common/Enum/StatusNotificarion";
import NotificationComponent from "../../Components/notification";
import Custumer from "../../Models/CustumerModel";
import NotificationModel from "../../Models/Notification.model";
import Product from "../../Models/ProductModel";
import ProductService from '../../Services/product.service'

export const editProduct: Product = {
    id: 0,
    name: '',
    price: 0,
    ammount: 0,
    ammountMinimun: 0,
    ammountCharged: 0,
    description: 'Breve descrição'
};
export const NotificatioModel: NotificationModel = {
    title: '',
    message: '',
    status: '',
}

const formato = { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' };
const ProductEditPage = () => {
    const [value, setValue] = useState({});
    const [product, setProduct] = useState(editProduct);
    const [notification, setNotification] = useState(NotificatioModel);
    const [msgvisible, setMsgVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    let params = useParams();


    useEffect(() => {
        getCustumerByID(Number(params.id));
    }, []);

    const spinner = <Spinner
        border={[
            { side: 'all', color: 'background-contrast', size: 'medium' },
            { side: 'right', color: '#6FFFB0', size: 'medium' },
            { side: 'top', color: '#6FFFB0', size: 'medium' },
            { side: 'left', color: '#6FFFB0', size: 'medium' },
        ]}
    />;

    const getCustumerByID = (id: number) => {
        ProductService.getProductByID(id).then(
            (response) => {
                setProduct(response.data)
            });
    }
    const updateCustumer = () => {
        setLoading(true);
        const id = Number(params.id)
        const objProductEdit: Product = { ...product, price: Number(product.price), ammountMinimun: Number(product.ammountMinimun), ammountCharged: Number(product.ammountCharged) }
        debugger
        ProductService.updateProduct(id, objProductEdit).then(
            (response) => {
                setMsgVisible(true)
                setProduct(response.data)
                setLoading(false)
                setNotification({ title: "Sucesso", message: "Cliente atualizado com sucesso", status: `${StatusNotification.SUCCESS}`, })
            },
            () => {
                setMsgVisible(true)
                setLoading(false)
                setNotification({ title: "Erro", message: "Ocorreu um erro ao atualizar o Cliente", status: `${StatusNotification.CRITICAL}`, })
            }
        );
    }

    const CloseNotification = () => {
        setMsgVisible(false);
    }

    const handleChange = (prop: keyof any) => async (event: React.ChangeEvent<{ value: unknown }>) => {
        setProduct({ ...product, [prop]: event.target.value });
    }
    return (
        <Page fill>
            <PageContent fill pad='xsmall' >
                {msgvisible && (
                    <NotificationComponent title={notification.title} message={notification.message} status={notification.status} onCloseNotification={CloseNotification}></NotificationComponent>
                )}
                <Grid fill
                    rows={['xxsmall', '35em']}
                    columns={['medium', 'auto']}
                    gap="small"
                    areas={[
                        { name: 'header', start: [0, 0], end: [1, 0] },
                        { name: 'nav', start: [0, 1], end: [0, 1] },
                        { name: 'main', start: [1, 1], end: [1, 1] },
                    ]}
                >
                    <Box gridArea="header" pad='xsmall'> <Text weight='bold' size="1.5em" color='white'>Produto</Text></Box>
                    <Box direction="column" pad='small' gridArea="nav" background="#2c2828">
                        <Box direction="column">
                            <Box alignSelf="center">
                                <Box direction="row" pad='small'>
                                    <Avatar size="9em" background="brand">
                                        <Package color='white' size='xlarge' />
                                    </Avatar>
                                </Box>
                            </Box>
                            <Box>
                                <Box direction="row" pad='small'>
                                    <Text weight='bold' color='white' margin={{ left: '5px' }}>Nome Produto: </Text>
                                    <Text color='white' margin={{ left: '5px' }}>{product.name}</Text>
                                </Box>
                            </Box>
                            <Box>
                                <Box direction="row" pad='small'>
                                    <Text weight='bold' color='white' margin={{ left: '5px' }}>Qtd mínima: </Text>
                                    <Text color='white' margin={{ left: '5px' }}>{Number(product.ammountMinimun)?.toLocaleString('pt-BR', formato)}</Text>
                                </Box>
                            </Box>
                            <Box>
                                <Box direction="row" pad='small'>
                                    <Text weight='bold' color='white' margin={{ left: '5px' }}>Valor Item: </Text>
                                    <Text color='white' margin={{ left: '5px' }}>{Number(product.price).toLocaleString('pt-BR', formato)}</Text>
                                </Box>
                            </Box>
                            <Box>
                                <Box direction="row" pad='small'>
                                    <Text weight='bold' color='white' margin={{ left: '5px' }}>Valor Cobrado: </Text>
                                    <Text color='white' margin={{ left: '5px' }}>{Number(product.ammountCharged).toLocaleString('pt-BR', formato)}</Text>
                                </Box>
                            </Box>
                            <Box>
                                <Box direction="row" pad='small'>
                                    <Text weight='bold' color='white' margin={{ left: '5px' }}>Descrição: </Text>
                                    <Text color='white' margin={{ left: '5px' }}>{product.description}</Text>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    <Box gridArea="main" pad='small' background="#2c2828">
                        <Form
                            value={value}
                            onChange={nextValue => setValue(nextValue)}
                            onReset={() => setValue({})}
                            onSubmit={({ value }) => { }}
                        >
                            <FormField required={{ indicator: false }} name="name" htmlFor="text-input-id" label="Nome">
                                <TextInput id="text-input-id" name="name"
                                    value={product.name}
                                    onChange={handleChange('name')}
                                />
                            </FormField>
                            <Box
                                direction="row"
                                justify="between"
                            >
                                <FormField name="name" htmlFor="text-input-id" label="Preço">
                                    <TextInput type="number" id="text-input-id" name="price"
                                        value={product.price}
                                        onChange={handleChange('price')} />
                                </FormField>
                                <FormField name="name" htmlFor="text-input-id" label="Qtd mínima">
                                    <TextInput type="number" id="text-input-id" name="ammountMinimun"
                                        value={product.ammountMinimun}
                                        onChange={handleChange('ammountMinimun')} />
                                </FormField>
                            </Box>
                            <Box
                                direction="row"
                                justify="between"
                            >
                                <FormField name="name" htmlFor="text-input-id" label="Valores a serem cobrados">
                                    <TextInput type="number" id="text-input-id" name="ammountCharged"
                                        value={product.ammountCharged}
                                        onChange={handleChange('ammountCharged')} />
                                </FormField>
                            </Box>

                            <FormField name="name" htmlFor="text-input-id" label="Obervação">
                                <TextInput id="text-input-id" name="description"
                                    value={product.description}
                                    onChange={handleChange('description')} />
                            </FormField>
                            <Box direction="row" gap="medium">
                                {loading ? spinner : <Button type="submit" primary label="Salvar" onClick={() => { updateCustumer() }} />}
                                <Button type="reset" label="Limpar" onClick={() => { }} />
                            </Box>
                        </Form>
                    </Box>
                </Grid>
            </PageContent>
        </Page>
    )
}; export default ProductEditPage;