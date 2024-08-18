
import { Helmet } from 'react-helmet-async';
import CardOverView from '../../components/CardOverView/CardOverView';
import Banner from './../../components/Banner/Banner';


const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Home</title>
            </Helmet>
            <Banner></Banner>
            <CardOverView></CardOverView>
        </div>
    );
};

export default Home;