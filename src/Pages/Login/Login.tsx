import React from 'react';
import { Box, Button, FormField, Text, grommet, Grommet, TextInput, Form, Spinner, Layer } from "grommet";
import AuthService from '../../Services/auth.service';
import { useNavigate } from "react-router-dom";

const Login = () => {
    let navigate = useNavigate();
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
            },
            () => {
                setLoading(false);
                setErrorMessage(true);
            }
        );
    }


    return (
        <Grommet theme={grommet} full >
            <Layer full>
                <Box flex={true} align='center' background="#0d0a14" alignContent='center' pad="large">
                    <Box width={{ min: '500px' }} height={{ min: '500px' }} border={{ color: '#6FFFB0', size: 'small' }} elevation='large' round="medium" pad="medium" background="light3">
                        <Text size='xxlarge' color='brand' alignSelf='center' weight='bold' margin={{ bottom: "1em" }} >Adoletarts Admin</Text>
                        <Form style={{ margin: '0 0 0 3em', width: '18em' }}
                            onSubmit={() => handleLogin()}
                        >
                            {ErrorMessage && <Text alignSelf='center' color='status-critical'>Usuário ou senha inválido</Text>}
                            <Box gap="small" pad="xsmall">
                                <Text color="#6FFFB0" textAlign="start" weight="bold" size="medium">E-mail</Text>
                                <TextInput
                                    value={login}
                                    onChange={event => setLogin(event.target.value)}
                                />
                            </Box>
                            <Box gap="small" pad="xsmall">
                                <Text color="#6FFFB0" textAlign="start" weight="bold" size="medium">Senha</Text>
                                <TextInput type='password'
                                    value={senha}
                                    onChange={event => setSenha(event.target.value)}
                                />
                            </Box>
                            {loading &&
                                <Box align="center" gap="xsmall" pad='small'>
                                    <Spinner
                                        border={[
                                            { side: 'all', color: 'background-contrast', size: 'medium' },
                                            { side: 'right', color: '#6FFFB0', size: 'medium' },
                                            { side: 'top', color: '#6FFFB0', size: 'medium' },
                                            { side: 'left', color: '#6FFFB0', size: 'medium' },
                                        ]}
                                    />
                                </Box>
                            }
                            <Box gap="medium" pad="medium">
                                <Button type="submit" primary label="Login" />
                            </Box>
                        </Form>
                    </Box>
                </Box>
            </Layer>
        </Grommet>
    );
}

export default Login; 