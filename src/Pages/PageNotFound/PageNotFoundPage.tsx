import { Box, Form, FormField, grommet, Grommet, Layer, Text, TextInput } from "grommet";
import { Alert } from "grommet-icons";

const PageNotFoundPage = () => {
    return (
        <Grommet theme={grommet} full >
            <Layer full>
                <Box flex={true} align='center' background="#0d0a14" alignContent='center' pad="large">
                    <Alert color='brand' size="xlarge" />
                    <Text weight='bold' size="2.5em" color='white'>Ops, Pagína não encontrada</Text>
                </Box>
            </Layer>
        </Grommet>
    );
};
export default PageNotFoundPage;