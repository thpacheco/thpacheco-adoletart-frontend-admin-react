import { Spinner } from 'grommet';
import './Loading.css';
const LoadingComponent = () => {
    return (<div className="spinner-container">
        <div className="spinner">
            <Spinner size='xlarge'
                border={[
                    { side: 'all', color: 'background-contrast', size: 'medium' },
                    { side: 'right', color: '#6FFFB0', size: 'medium' },
                    { side: 'top', color: '#6FFFB0', size: 'medium' },
                    { side: 'left', color: '#6FFFB0', size: 'medium' },
                ]}
            />
        </div>
    </div>);
}

export default LoadingComponent;