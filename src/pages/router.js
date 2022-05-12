import Home from "./Home";
import ConnectWallet from './ConnectWallet'
import AutoFeed from './AutoFeed'
import MorphingStation from './MorphingStation'
import HatchingStation from './HatchingStation'
import FeedingStation from './FeedingStation'

const routes = [
    { path: '/', component: <Home />},
    { path: '/connect-wallet', component: <ConnectWallet />},
    { path: '/autofeed', component: <AutoFeed />},
    { path: '/morphingstation', component: <MorphingStation />},
    { path: '/hatchingstation', component: <HatchingStation />},
    { path: '/feedingstation', component: <FeedingStation />}


]

export default routes;