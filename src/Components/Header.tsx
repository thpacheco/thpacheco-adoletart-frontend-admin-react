import { Anchor, Avatar, Box } from "grommet";

const HeaderComponent = () => {
    return (
        <Box tag="header" background="#0d0a14" pad="small">
            <Box direction="row" pad='none' align="center" gap="small">
                <Avatar background="dark-1">IRIS</Avatar>
                <Anchor color="white" size="xlarge" href="">
                    Adoleta arts
                </Anchor>
            </Box>
        </Box>
    );
}; export default HeaderComponent;