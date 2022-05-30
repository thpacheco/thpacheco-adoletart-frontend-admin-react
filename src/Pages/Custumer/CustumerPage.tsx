import { Avatar, Box, Button, Card, Form, FormField, Grid, Heading, Page, PageContent, Text, TextInput } from "grommet";
import { Basket, Compliance, User } from "grommet-icons";
import { useState } from "react";

const CustumerPage = () => {
    const [value, setValue] = useState({});
    return (
        <Page fill >
            <PageContent fill pad='xsmall' >
                {/* <Heading size='small'>Clientes</Heading> */}
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
                    <Box gridArea="header" background="brand"> <Text margin='0.1em' weight='bold' size="2em" color='white'>Clientes</Text></Box>
                    <Box direction="column" pad='medium' gridArea="nav" background="#2c2828">
                        <Box direction="column" align="center">
                            <Box >
                                <Avatar size="7em" background="brand">
                                    <User color='white' size='large' />
                                </Avatar>
                            </Box>
                            <Box>
                                <Text weight='bold' color='white'>Thiago Xavier Pacheco</Text>
                            </Box>
                        </Box>
                        <Box direction="column" align="start">
                            <Box direction="column" pad='small'>
                                <Text weight='bold' color='white'>Celular:</Text>
                                <Box>thiagopacheco30@gmail.com</Box>
                            </Box>
                            <Box direction="column" pad='small'>
                                <Text weight='bold' color='white'>Celular:</Text>
                                <Box>thiagopacheco30@gmail.com</Box>
                            </Box>
                            <Box direction="column" pad='small'>
                                <Text weight='bold' color='white'>Endereço</Text>
                                <Text color='white'>Rua Barbacena 63</Text>
                            </Box>
                        </Box>
                    </Box>
                    <Box gridArea="main" background="#2c2828" pad='medium'>
                        <Form
                            value={value}
                            onChange={nextValue => setValue(nextValue)}
                            onReset={() => setValue({})}
                            onSubmit={({ value }) => { }}
                        >
                            <FormField name="name" htmlFor="text-input-id" label="Nome">
                                <TextInput id="text-input-id" name="name" />
                            </FormField>
                            <FormField name="name" htmlFor="text-input-id" label="Email">
                                <TextInput id="text-input-id" name="name" />
                            </FormField>
                            <FormField name="name" htmlFor="text-input-id" label="Celular">
                                <TextInput id="text-input-id" name="name" />
                            </FormField>
                            <Box direction="row" gap="medium">
                                <Button type="submit" primary label="Submit" />
                                <Button type="reset" label="Reset" />
                            </Box>
                        </Form>
                    </Box>
                </Grid>
            </PageContent>
        </Page>
    )
}; export default CustumerPage;