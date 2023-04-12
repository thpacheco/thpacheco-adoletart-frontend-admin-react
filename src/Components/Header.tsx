import { Anchor, Avatar, Box, Menu } from "grommet";
import { Menu as MenuIcons } from "grommet-icons";
import { useNavigate } from "react-router-dom";
import AuthHelper from "../Common/AuthHelper";
import { colors } from "@mui/material";



const HeaderComponent = () => {
    let navigate = useNavigate();

    const isAuth = () => {
        AuthHelper.ClearSession();
        navigate('/login')
    };

    return (
        <Box tag="header" background="dark-3" justify="between" pad="xxsmall">
            <Box
                gridArea="header"
                direction="row"
                align="center"
                justify="between"
                pad={{ horizontal: 'small', vertical: 'xxsmall' }}
            >
                <Box direction="row" pad='none' align="center" gap="small">
                    <Avatar background="dark-1">IRIS</Avatar>
                    <Anchor color="white" size="xlarge" onClick={() => { navigate('/'); }}>
                        Adoletarts
                    </Anchor>
                </Box>
                <Box justify="end">
                    <Menu
                        a11yTitle="Navigation Menu"
                        dropProps={{ align: { top: 'bottom', right: 'right' } }}
                        icon={<MenuIcons color='white' size='medium' />}
                        items={[
                            {
                                label: <Box pad="small">Sair</Box>,
                                onClick: () => { isAuth(); }
                            },
                        ]}
                    />
                </Box>
            </Box>
        </Box>
    );
}; export default HeaderComponent;