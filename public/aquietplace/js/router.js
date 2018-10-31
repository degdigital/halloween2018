import store from './store.js';
import idle from './screens/idle.js';
import loader from './screens/loader.js';
import intro from './screens/intro/intro.js';
import game from './screens/game.js';

const routes = {
    idle: { screen: idle},
    loader: { screen: loader},
    intro: { screen: intro },
    game: { screen: game }
};

function route(routeId, data) {
    const state = store.getState();
    
    if(state.currentRoute) {
        state.currentRoute.screen.destroy();
    }

    const route = routes[routeId];
    route.screen.render(data);
    store.setState({currentRoute: route});
}

function router() {
    return {
        route
    }
}

export default router();