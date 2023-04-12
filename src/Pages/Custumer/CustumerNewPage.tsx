import { Page, PageContent, Button, Box, Form, FormField, TextInput, Text, Notification, Spinner, MaskedInput } from "grommet";
import { useState } from "react";
import { StatusNotification } from "../../Common/Enum/StatusNotificarion";
import NotificationComponent from "../../Components/notification";
import Custumer from "../../Models/CustumerModel";
import NotificationModel from "../../Models/Notification.model";
import CustumerService from '../../Services/custumer.service'
import { FormPrevious, MailOption } from "grommet-icons";
import { useNavigate } from "react-router-dom";


export const CustumerCreate: Custumer = {
    id: 0,
    name: '',
    email: '',
    telephone: '',
    active: true,
};

export const NotificatioModel: NotificationModel = {
    title: '',
    message: '',
    status: '',
}

const CustumerNewPage = () => {
    let navigate = useNavigate();
    const [custumerCreate, setCustumerCreate] = useState(CustumerCreate);
    const [notification, setNotification] = useState(NotificatioModel);
    const [msgvisible, setMsgVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (prop: keyof any) => async (event: React.ChangeEvent<{ value: unknown }>) =>
        setCustumerCreate({ ...custumerCreate, [prop]: event.target.value });

    const spinner = <Spinner
        border={[
            { side: 'all', color: 'background-contrast', size: 'medium' },
            { side: 'right', color: '#6FFFB0', size: 'medium' },
            { side: 'top', color: '#6FFFB0', size: 'medium' },
            { side: 'left', color: '#6FFFB0', size: 'medium' },
        ]}
    />;

    const SalveNewCustumer = () => {
        const objCreate = custumerCreate;
        setLoading(true);
        CustumerService.createNewCustumer(objCreate).then(
            () => {
                setMsgVisible(true);
                setNotification({ title: "Sucesso", message: "Cliente cadastrado com sucesso.", status: `${StatusNotification.SUCCESS}`, })
                setLoading(false);
                setCustumerCreate(CustumerCreate)
                navigate('/custumers');
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
                    <Text weight='bold' size="1.4em" color='white' >Cadastro de clientes</Text>
                </Box>
                <Box gridArea="main" flex pad='medium'>
                    <Box pad='medium' width="large">
                        <Form
                            onReset={() => setCustumerCreate(CustumerCreate)}
                            onSubmit={() => { SalveNewCustumer() }}
                        >
                            <Box gap="small" pad="xsmall">
                                <Text color="#6FFFB0" textAlign="start" weight="bold" size="medium">Nome</Text>
                                <TextInput name="name"
                                    value={custumerCreate.name}
                                    onChange={handleChange('name')}
                                />
                            </Box>
                            <Box gap="small" pad="xsmall">
                                <Text color="#6FFFB0" textAlign="start" weight="bold" size="medium">E-mail</Text>
                                <TextInput id="text-input-id" name="name" icon={<MailOption color="#6FFFB0" />}
                                    value={custumerCreate.email}
                                    onChange={handleChange('email')} />
                            </Box>
                            <Box gap="small" pad="xsmall">
                                <Text color="#6FFFB0" textAlign="start" weight="bold" size="medium">Telefone</Text>
                                <MaskedInput
                                    mask={[
                                        { fixed: '(' },
                                        {
                                            length: 2,
                                            regexp: /^[0-9]{1,3}$/,
                                            placeholder: 'xx',
                                        },
                                        { fixed: ')' },
                                        { fixed: ' ' },
                                        {
                                            length: 5,
                                            regexp: /^[0-9]{1,5}$/,
                                            placeholder: 'xxxxx',
                                        },
                                        { fixed: '-' },
                                        {
                                            length: 4,
                                            regexp: /^[0-9]{1,5}$/,
                                            placeholder: 'xxxxx',
                                        },
                                    ]}
                                    value={custumerCreate.telephone}
                                    onChange={handleChange('telephone')}
                                />
                            </Box>
                            <Box direction="row" justify="between" gap="medium" pad="xsmall">
                                <Box direction="column" alignSelf="start" gap="medium" pad="xsmall">
                                    <Button alignSelf="start" onClick={() => { navigate('new', { replace: true }); }} icon={<FormPrevious size='medium' />} label="Voltar" margin={{ end: 'small' }} />
                                </Box>
                                <Box alignSelf="end" direction="row-reverse" gap="medium" pad="xsmall">
                                    {loading ? spinner : <Button type="submit" primary label="Salvar" />}
                                    <Button type="reset" label="Limpar" />
                                </Box>
                            </Box>
                        </Form>
                    </Box>

                </Box>
            </PageContent>
        </Page >
    );
};
export default CustumerNewPage;