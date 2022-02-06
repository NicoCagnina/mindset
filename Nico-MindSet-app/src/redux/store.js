import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import profilesReducer from 'redux/profiles/reducer';
import psychologistsReducer from 'redux/psychologists/reducer';
import postulantsReducer from './postulants/reducer';
import clientsReducer from './clients/reducer';
import interviewsReducer from './interviews/reducer';
import positionsReducer from './positions/reducer';
import applicationsReducer from './applications/reducer';
import sessionsReducer from './sessions/reducer';
import adminsReducer from './admins/reducer';
import authReducer from './auth/reducer';

const rootReducer = combineReducers({
  //here the reducers
  profiles: profilesReducer,
  admins: adminsReducer,
  clients: clientsReducer,
  postulants: postulantsReducer,
  psychologists: psychologistsReducer,
  positions: positionsReducer,
  applications: applicationsReducer,
  interviews: interviewsReducer,
  sessions: sessionsReducer,
  auth: authReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore() {
  const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
  return store;
}
