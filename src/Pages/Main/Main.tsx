import { Box, Grid, grommet, Grommet, Layer } from "grommet";
import { Outlet } from "react-router-dom";
import FooterComponent from "../../Components/Footer";
import HeaderComponent from "../../Components/Header";
import SidebarComponet from "../../Components/NavBar";

const Main = () => {
    return (
        <Grommet theme={grommet} full >
            <Layer full>
                <Grid fill rows={["auto", "flex", "auto"]}>
                    <HeaderComponent />
                    <Box direction='row' flex overflow={{ horizontal: 'hidden' }}>
                        <SidebarComponet />
                        <Box overflow="auto" flex background="#15131a">
                            <Outlet />
                        </Box>
                    </Box>
                    <FooterComponent />
                </Grid>
            </Layer>
        </Grommet>
    );
}
export default Main;