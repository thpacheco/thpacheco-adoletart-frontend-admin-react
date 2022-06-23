import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { Box, Button, DataTable, Page, PageContent, Spinner, Text } from "grommet";
import { Add, Checkmark, Currency, Erase, FormTrash } from "grommet-icons";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { number } from "yup";
import { StatusNotification } from "../../../Common/Enum/StatusNotificarion";
import NotificationComponent from "../../../Components/notification";
import Custumer from "../../../Models/CustumerModel";
import NotificationModel from "../../../Models/Notification.model";
import CustumerService from '../../../Services/custumer.service'

export const custumes: Custumer = {
    id: 0,
    name: '',
    email: '',
    telephone: ''
};

export const NotificatioModel: NotificationModel = {
    title: '',
    message: '',
    status: '',
}

const CustumerListPage = () => {
    let navigate = useNavigate();
    const [listCustumers, setCustumers] = useState([custumes]);
    const [notification, setNotification] = useState(NotificatioModel);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [msgvisible, setMsgVisible] = useState(false);
    const [idCustumer, setIdCustumer] = useState(0);

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
    const handleClose = () => {
        setOpen(false);
    };

    const CloseNotification = () => {
        setMsgVisible(false);
    }

    const spinner = <Spinner
        border={[
            { side: 'all', color: 'background-contrast', size: 'medium' },
            { side: 'right', color: '#6FFFB0', size: 'medium' },
            { side: 'top', color: '#6FFFB0', size: 'medium' },
            { side: 'left', color: '#6FFFB0', size: 'medium' },
        ]}
    />;

    const deleteCustumer = () => {
        setLoading(true);
        if (idCustumer > 0) {
            CustumerService.deleteCustumer(idCustumer).then(
                () => {
                    setLoading(false)
                    setMsgVisible(true)
                    setNotification({ title: "Sucesso", message: "Cliente excluído com sucesso", status: `${StatusNotification.SUCCESS}`, })
                    handleClose()
                    getListAllCustumers()
                },
                () => {
                    setLoading(false)
                    setMsgVisible(true)
                    setNotification({ title: "Erro", message: "Ocorreu um erro ao excluir o Cliente", status: `${StatusNotification.CRITICAL}`, })
                }
            );
        } else {
            setMsgVisible(true)
            setNotification({ title: "Erro", message: "Ocorreu um erro", status: `${StatusNotification.CRITICAL}`, })
        }
    }

    const bindDeleteCustumer = (id: number) => {
        setIdCustumer(id)
        setOpen(true)
    }

    return (
        <Page fill>
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
                        {"Alerta! Deseja mesmo excluir esse cliente?"}
                    </DialogTitle>
                    <DialogActions>
                        {loading ? spinner : <Button onClick={() => { deleteCustumer() }} primary label="Confirmar" margin={{ end: 'xsmall' }} />}
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
                    <Text weight='bold' size="1.4em" color='white' >Todos seus clientes</Text>
                    <Button onClick={() => { navigate('new', { replace: true }); }} primary icon={<Add size='medium' />} label="Novo" margin={{ end: 'xsmall' }} />
                </Box>
                <Box margin='small'>
                    {
                        listCustumers.length  === 0 ?
                            <Box align="center" justify='center'>
                                <Text weight="bold">Voçê ainda não possui nenhum cliente cadastrado.</Text>
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
                                        render: (dataItem) => (<Button
                                            a11yTitle="100 Filters Applied"
                                            icon={<FormTrash color='status-error' />}
                                            onClick={() => { bindDeleteCustumer(dataItem.id); }}
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
                    }
                </Box>
            </PageContent>
        </Page >);
};

export default CustumerListPage;