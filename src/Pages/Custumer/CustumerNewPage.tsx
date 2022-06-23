import { Page, PageContent, Button, Box, Form, FormField, TextInput, Text, Notification, Spinner, MaskedInput } from "grommet";
import { useState } from "react";
import { StatusNotification } from "../../Common/Enum/StatusNotificarion";
import NotificationComponent from "../../Components/notification";
import Custumer from "../../Models/CustumerModel";
import NotificationModel from "../../Models/Notification.model";
import CustumerService from '../../Services/custumer.service'
import AuthService from '../../Services/auth.service'


export const CustumerCreate: Custumer = {
    id: 0,
<<<<<<< HEAD
    name: '',
    email: '',
    telephone: '',
=======
    name: 'Teste 02',
    email: 'teste@teste.com',
    telephone: '11 979993131',
>>>>>>> c7cea5d (Dasboard feito)
};

export const NotificatioModel: NotificationModel = {
    title: '',
    message: '',
    status: '',
}

const CustumerNewPage = () => {
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
                            <FormField name="name" htmlFor="text-input-id" label="Nome">
                                <TextInput id="text-input-id" name="name"
                                    value={custumerCreate.name}
                                    onChange={handleChange('name')}
                                />
                            </FormField>
                            <FormField name="name" htmlFor="text-input-id" label="Email">
                                <TextInput id="text-input-id" name="name"
                                    value={custumerCreate.email}
                                    onChange={handleChange('email')} />
                            </FormField>
                            <FormField name="name" htmlFor="text-input-id" label="Celular">
                                <MaskedInput
                                    mask={[
                                        { fixed: '(' },
                                        {
                                            length: 3,
                                            regexp: /^[0-9]{1,3}$/,
                                            placeholder: 'xxx',
                                        },
                                        { fixed: ')' },
                                        { fixed: ' ' },
                                        {
                                            length: 3,
                                            regexp: /^[0-9]{1,4}$/,
                                            placeholder: 'xxxx',
                                        },
                                        { fixed: '-' },
                                        {
                                            length: 4,
                                            regexp: /^[0-9]{1,4}$/,
                                            placeholder: 'xxxx',
                                        },
                                    ]}
                                    value={custumerCreate.telephone}
                                    onChange={handleChange('telephone')}
                                />
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
export default CustumerNewPage;