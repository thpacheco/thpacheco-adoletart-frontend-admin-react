import { Anchor, Box, Clock } from "grommet";

const FooterComponent = () => {
    return (
        <Box tag="footer" pad="small" background="dark-1">
            <Box
                gridArea="header"
                direction="row"
                align="center"
                justify="between"
                pad={{ horizontal: 'small', vertical: '0.2em' }}
            >
                <Box direction="row" pad='none' align="center" gap="small">
                    <Anchor color="white" size="medium" href="">
                        @Adoletarts Todos os direitos
                    </Anchor>
                </Box>
                <Clock type="digital" size='large' />
            </Box>
        </Box>);
}

export default FooterComponent;