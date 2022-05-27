import { Anchor, Avatar, Box } from "grommet";

const HeaderComponent = () => {
    return (
        <Box
            tag='header'
            direction='row'
            align='center'
            justify='between'
            background='brand'
            pad={{ left: 'medium', right: 'small', vertical: 'small' }}
            elevation='medium'
            style={{ zIndex: '1' }}
        />);
}; export default HeaderComponent;