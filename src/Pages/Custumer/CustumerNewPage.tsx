import { Page, PageContent, Button, Box, Form, FormField, TextInput, Text } from "grommet";
import { useState } from "react";

const CustumerNewPage = () => {
    const [value, setValue] = useState({});
    return (
        <Page fill>
            <PageContent fill pad='xsmall' >
                <Box
                    gridArea="header"
                    direction="row"
                    align="center"
                    justify="between"
                    pad={{ horizontal: 'medium', vertical: 'small' }}
                >
                    <Text weight='bold' size="1.4em" color='white' >Cadastro de clientes</Text>
                </Box>
                <Box gridArea="main" flex background="#2c2828" pad='medium'>
                    <Box pad='medium' width="large">
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
                                <Button type="submit" primary label="Salvar" />
                                <Button type="reset" label="Limpar" />
                            </Box>
                        </Form>
                    </Box>

                </Box>
            </PageContent>
        </Page>
    );
};
export default CustumerNewPage;