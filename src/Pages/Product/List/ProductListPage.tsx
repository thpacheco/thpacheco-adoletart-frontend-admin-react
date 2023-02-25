import { Box, Button, DataTable, Page, PageContent, Spinner, Text } from "grommet";
import { useNavigate } from "react-router-dom";
import { Add, Checkmark, Erase, FormTrash } from "grommet-icons";
import { useEffect, useState } from "react";
import Product from "../../../Models/ProductModel";
import ProductService from '../../../Services/product.service'
import { StatusNotification } from "../../../Common/Enum/StatusNotificarion";
import NotificationModel from "../../../Models/Notification.model";
import NotificationComponent from "../../../Components/notification";
import { Dialog, DialogActions, DialogTitle } from "@mui/material";

export const products: Product = {
    id: 0,
    name: '',
    price: 0,
    ammount: 0,
    ammountMinimun: 0,
    ammount_charged: 0,
    description: '',
    userid:0
};
export const NotificatioModel: NotificationModel = {
    title: '',
    message: '',
    status: '',
}

const formato = { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' };

const spinner = <Spinner
border={[
    { side: 'all', color: 'background-contrast', size: 'medium' },
    { side: 'right', color: '#6FFFB0', size: 'medium' },
    { side: 'top', color: '#6FFFB0', size: 'medium' },
    { side: 'left', color: '#6FFFB0', size: 'medium' },
]}
/>;

const ProductListPage = () => {
    let navigate = useNavigate();
    const [listProducts, setListProducts] = useState([products]);
    const [loading, setLoading] = useState(false);
    const [notification, setNotification] = useState(NotificatioModel);
    const [open, setOpen] = useState(false);
    const [msgvisible, setMsgVisible] = useState(false);
    const [productId, setProductId] = useState(0);


    useEffect(() => {
        getListAllProducts();
    }, []);

    const getListAllProducts = () => {
        setLoading(true)
        ProductService.listAllProducts().then(
            (response) => {
                setListProducts(response.data)
                setLoading(false)
            });
    }

    const getCurruencyFormart = (value: number) => {
        return value?.toLocaleString('pt-BR', formato)
    }
    const handleClose = () => {
        setOpen(false);
    };

    const DeleteProduct = () => {
        setLoading(true);
        if (productId > 0) {
            ProductService.deleteProduct(productId).then(
                () => {
                    setLoading(false)
                    setMsgVisible(true)
                    setNotification({ title: "Sucesso", message: "Produto excluído com sucesso", status: `${StatusNotification.SUCCESS}`, })
                    handleClose()
                    getListAllProducts();
                },
                () => {
                    setLoading(false)
                    setMsgVisible(true)
                    setNotification({ title: "Erro", message: "Ocorreu um erro ao excluir o Produto", status: `${StatusNotification.CRITICAL}`, })
                }
            );
        } else {
            setMsgVisible(true)
            setNotification({ title: "Erro", message: "Ocorreu um erro", status: `${StatusNotification.CRITICAL}`, })
        }
    }
    
    const CloseNotification = () => {
        setMsgVisible(false);
    }

    const bindDeleteProduct = (id: number) => {
        setProductId(id)
        setOpen(true)
    }

    return <Page fill>
        <PageContent fill pad='xsmall'>
            {msgvisible && (
                <NotificationComponent title={notification.title} message={notification.message} status={notification.status} onCloseNotification={CloseNotification}></NotificationComponent>
            )}
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Alerta! Deseja mesmo excluir esse produto?"}
                </DialogTitle>
                <DialogActions>
                    {loading ? spinner : <Button onClick={() => { DeleteProduct() }} primary label="Confirmar" margin={{ end: 'xsmall' }} />}
                    <Button onClick={handleClose} primary label="Cancelar" margin={{ end: 'xsmall' }} />
                </DialogActions>
            </Dialog>
            <Box
                gridArea="header"
                direction="row"
                align="center"
                justify="between"
                pad={{ horizontal: 'medium', vertical: 'small' }}
            >
                <Text weight='bold' size="1.4em" color='white' >Todos seus produtos</Text>
                <Button onClick={() => { navigate('new', { replace: true }); }} primary icon={<Add size='medium' />} label="Novo" margin={{ end: 'xsmall' }} />
            </Box>
            <Box margin='small'>
                {
                    listProducts.length === 0 ?
                        <Box align="center" justify='center'>
                            <Text weight="bold">Voçê ainda não possui nenhum produto cadastrado.</Text>
                        </Box> :
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
                                    property: 'ammount',
                                    header: <Text>Quantidade</Text>,
                                    render: (item) => item.ammount,
                                    primary: true,
                                },
                                {
                                    property: 'price',
                                    render: (item) => getCurruencyFormart(item.price),
                                    header: <Text>Valor Item</Text>,
                                    primary: true,
                                },
                                {
                                    property: 'ammount_charged',
                                    render: (item) => getCurruencyFormart(item.ammount_charged),
                                    header: <Text>Valor cobrado</Text>,
                                    primary: true,
                                },
                                {
                                    property: 'description',
                                    header: <Text>Descrição</Text>,
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
                                    render: (item) => (<Button
                                        a11yTitle="100 Filters Applied"
                                        icon={<FormTrash color='status-error' />}
                                        onClick={() => { bindDeleteProduct(item.id); }}
                                        secondary
                                        color="dark-1"
                                    />
                                    ),
                                    header: 'Excluir',
                                    align: 'center',
                                    primary: true,
                                }
                            ]}
                            data={listProducts}
                        />
                }
            </Box>
        </PageContent>
    </Page>
};
export default ProductListPage;