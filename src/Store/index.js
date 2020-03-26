import {createStore, applyMiddleware, compose} from "redux";
import reduxThunk from 'redux-thunk';
import {persistStore} from "redux-persist";
import {AsyncStorage} from "react-native";
import reducers from './Reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducers,
    composeEnhancers(
        applyMiddleware(reduxThunk))
);

//persistStore(store, {storage:AsyncStorage, });

export default store;