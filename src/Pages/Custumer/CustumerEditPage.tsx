import { Avatar, Box, Button, Card, CheckBox, Form, FormField, Grid, Heading, MaskedInput, Page, PageContent, Spinner, Text, TextInput } from "grommet";
import { Basket, Compliance, User } from "grommet-icons";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { StatusNotification } from "../../Common/Enum/StatusNotificarion";
import NotificationComponent from "../../Components/notification";
import Custumer from "../../Models/CustumerModel";
import NotificationModel from "../../Models/Notification.model";
import CustumerService from '../../Services/custumer.service'

export const editCustumer: Custumer = {
    id: 0,
    name: '',
    email: '',
    telephone: '',
    active: true,
}

export const NotificatioModel: NotificationModel = {
    title: '',
    message: '',
    status: '',
}

const CustumerEditPage = () => {
    const [value, setValue] = useState({});
    const [custumer, setCustumer] = useState(editCustumer);
    const [notification, setNotification] = useState(NotificatioModel);
    const [msgvisible, setMsgVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [checked] = useState(true);
    const [stateActive, setStateActive] = useState(false);
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
        CustumerService.getCustumerByID(id).then(
            (response) => {
                setCustumer(response.data)
            });
    }
    const updateCustumer = () => {
        setLoading(true);
        const id = Number(params.id)
        CustumerService.updateCustumer(id, custumer).then(
            (response) => {
                setMsgVisible(true)
                setCustumer(response.data)
                setLoading(false)
                setNotification({ title: "Sucesso", message: "Cliente atualizado com sucesso", status: `${StatusNotification.SUCCESS}`, })
                getCustumerByID(Number(params.id));
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

    const StateActiveInative = (active: boolean) => {
        setStateActive(active);
        setCustumer({ ...custumer, "active": active });
    }

    const handleChange = (prop: keyof any) => async (event: React.ChangeEvent<{ value: unknown }>) =>
        setCustumer({ ...custumer, [prop]: event.target.value });

    return (
        <Page fill>
            <PageContent fill pad='xsmall' >
                {msgvisible && (
                    <NotificationComponent title={notification.title} message={notification.message} status={notification.status} onCloseNotification={CloseNotification}></NotificationComponent>
                )}
                <Grid fill
                    rows={['xxsmall', 'auto']}
                    columns={['medium', 'auto']}
                    gap="small"
                    areas={[
                        { name: 'header', start: [0, 0], end: [1, 0] },
                        { name: 'nav', start: [0, 1], end: [0, 1] },
                        { name: 'main', start: [1, 1], end: [1, 1] },
                    ]}
                >
                    <Box gridArea="header" pad='xsmall'> <Text weight='bold' size="1.5em" color='white'>Cliente</Text></Box>
                    <Box direction="column" pad='medium' gridArea="nav" background="#2c2828">
                        <Box direction="column" align="center">
                            <Box >
                                <Avatar size="7em" background="brand">
                                    <User color='white' size='large' />
                                </Avatar>
                            </Box>
                            <Box>
                                <Text weight='bold' color='white'>{custumer.name}</Text>
                            </Box>
                        </Box>
                        <Box direction="column" align="start">
                            <Box direction="column" pad='small'>
                                <Text weight='bold' color='white'>Celular:</Text>
                                <Text color='white'>{custumer.telephone}</Text>
                            </Box>
                            <Box direction="column" pad='small'>
                                <Text weight='bold' color='white'>Email:</Text>
                                <Box>{custumer.email}</Box>
                            </Box>
                            <Box direction="column" pad='small'>
                                <Text weight='bold' color='white'>Status:</Text>
                                <Text color='white'>{custumer.active ?
                                    <Text color="#6FFFB0">Ativo</Text> :
                                    <Text color="red">Inativo</Text>}
                                </Text>
                            </Box>
                        </Box>
                    </Box>
                    <Box gridArea="main" pad='xsmall' background="#2c2828">
                        <Form
                            value={value}
                            onChange={nextValue => setValue(nextValue)}
                            onReset={() => setValue({})}
                            onSubmit={({ value }) => { }}
                        >
                            <FormField name="name" htmlFor="text-input-id" label="Nome">
                                <TextInput id="text-input-id" name="name"
                                    value={custumer.name}
                                    onChange={handleChange('name')}
                                />
                            </FormField>
                            <FormField name="name" htmlFor="text-input-id" label="Email">
                                <TextInput id="text-input-id" name="email"
                                    value={custumer.email}
                                    onChange={handleChange('email')} />
                            </FormField>
                            <FormField name="name" htmlFor="text-input-id" label="Celular">
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
                                            regexp: /^[0-9]{1,4}$/,
                                            placeholder: 'xxxx',
                                        },
                                    ]}
                                    value={custumer.telephone}
                                    onChange={handleChange('telephone')}
                                />
                            </FormField>
                            <FormField name="name" htmlFor="text-input-id" label="Status">
                                <CheckBox
                                    checked={custumer.active}
                                    label='Ativo'
                                    onChange={event => StateActiveInative(event.target.checked)}
                                />
                            </FormField>
                            <Box direction="row-reverse" gap="medium" alignSelf="end" pad="xxsmall">
                                {loading ? spinner : <Button type="submit" primary label="Atualizar" onClick={() => { updateCustumer() }} />}
                                <Button type="reset" label="Limpar" />
                                <Button type="reset" alignSelf="start" label="Limpar" />
                            </Box>
                        </Form>
                    </Box>
                </Grid>
            </PageContent>
        </Page>
    )
}; export default CustumerEditPage;