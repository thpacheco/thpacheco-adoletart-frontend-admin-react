import React from 'react';
import { Box, Button, FormField, Text, grommet, Grommet, TextInput, Form, Spinner } from "grommet";
import { Page } from "grommet/components/Page";
import { PageContent } from "grommet/components/PageContent";
import { Paragraph } from "grommet/components/Paragraph";
import AuthService from '../../Services/auth.service';
import { useNavigate } from "react-router-dom";

const Login = () => {
    let navigate = useNavigate();
    const [value, setValue] = React.useState({});
    const [login, setLogin] = React.useState('');
    const [senha, setSenha] = React.useState('');
    const [ErrorMessage, setErrorMessage] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const handleLogin = () => {
        const username: string = login;
        const password: string = senha;
        setLoading(true);
        AuthService.login(username, password).then(
            () => {
                setLoading(false);
                navigate('/');
                window.location.reload();
            },
            () => {
                setLoading(false);
                setErrorMessage(true);
            }
        );
    }


    return (
        <Grommet theme={grommet} full>
            <Box fill>
                <Box flex={true} align='center' background="light-3" alignContent='center' pad="large">
                    <Box width={{ min: '500px' }} height={{ min: '500px' }} border={{ color: 'brand', size: 'small' }} elevation='large' round="medium" pad="medium" background="light3">
                        <Text size='xlarge' color='brand' alignSelf='center' weight='bold' margin={{ bottom: "1em" }} >AdoletArt Admin</Text>
                        <Form style={{ margin: '0 0 0 3em', width: '18em' }}
                            onChange={nextValue => setValue(nextValue)}
                            onReset={() => setValue({})}
                            onSubmit={() => handleLogin()}
                        >
                            {ErrorMessage && <Text alignSelf='center' color='status-critical'>Usuário ou senha inválido</Text>}
                            <FormField name="name" htmlFor="text-input-id" label="Login">
                                <TextInput
                                    value={login}
                                    onChange={event => setLogin(event.target.value)}
                                />
                            </FormField>
                            <FormField name="name" htmlFor="text-input-id" label="Senha">
                                <TextInput type='password'
                                    value={senha}
                                    onChange={event => setSenha(event.target.value)}
                                />
                            </FormField>
                            {loading &&
                                <Box align="center" gap="xsmall" pad='small'>
                                    <Spinner
                                        border={[
                                            { side: 'all', color: 'background-contrast', size: 'medium' },
                                            { side: 'right', color: 'brand', size: 'medium' },
                                            { side: 'top', color: 'brand', size: 'medium' },
                                            { side: 'left', color: 'brand', size: 'medium' },
                                        ]}
                                    />
                                </Box>
                            }
                            <Box gap="medium">
                                <Button type="submit" primary label="Entrar" />
                            </Box>
                        </Form>
                    </Box>
                </Box>
                <Box flex={false} background="brand" pad="small">
                    <Text color='#fff'> @Adoletarts Todos os direitos</Text>
                </Box>
            </Box>
        </Grommet>
    );
}

export default Login; 