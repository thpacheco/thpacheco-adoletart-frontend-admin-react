import { Anchor, Avatar, Box } from "grommet";
import { useNavigate } from "react-router-dom";

const HeaderComponent = () => {
    let navigate = useNavigate();
    return (
        <Box tag="header" background="brand" justify="between" pad="small">
            <Box
                gridArea="header"
                direction="row"
                align="center"
                justify="between"
                pad={{ horizontal: 'medium', vertical: 'xxsmall' }}
            >
                <Box direction="row" pad='none' align="center" gap="small">
                    <Avatar background="dark-1">IRIS</Avatar>
                    <Anchor color="white" size="xlarge" onClick={() => {navigate('/'); }}>
                        Adoletarts
                    </Anchor>
                </Box>
            </Box>
        </Box>
    );
}; export default HeaderComponent;