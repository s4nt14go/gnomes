import React, {useReducer, createContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import axios from 'axios';
import InhabitantsTable from './components/InhabitantsTable';
import { Brastlewark } from './backupData.json';

//----------------------------------------region reducers imports y contexts
import useCombinedReducers from 'use-combined-reducers';
import logger from 'use-reducer-logger';
import { inhabitantsReducer, inhabitantsReducerInitialState } from './reducers/inhabitants';
import { gotFromCache, gotFromServer } from './actions/inhabitants'
export const StateContext = createContext();
export const DispatchContext = createContext();
//----------------------------------------endregion reducers

const useStyles = makeStyles(() => {
  return {
    centered: {
      margin: 'auto'
    }
  }
});

function App() {
  const classes = useStyles();

  const dev = process.env.NODE_ENV === 'development';
  const [state, dispatch] = useCombinedReducers({
    inhabitantsState: useReducer(dev? logger(inhabitantsReducer) : inhabitantsReducer, inhabitantsReducerInitialState),
  });

  React.useEffect( () => {

    const inhabitants = JSON.parse(localStorage.getItem('inhabitants'));
    if (inhabitants) dispatch(gotFromCache(inhabitants ));

    const get  = async () => {

      const url = 'https://raw.githubusercontent.com/rrafols/mobile_test/master/data.json';
      try {
        const result = await axios.get(url);
        dispatch(gotFromServer(result.data.Brastlewark));

      } catch (e) { // I have to put this checking because at some time https://raw.githubusercontent.com/rrafols/mobile_test/master/data.json (and the thumbnail images server too) was returning error 503 Service temporarily unavailable, if I didn't it wouldn't be possible to check table functionality
        console.log(e);
        if (!inhabitants) {
          console.log(`As there was an error from ` + url + ` and there wasn't data already saved in the cache neither, it will be read from resources/gnomes.json`);
          console.log(Brastlewark);
          dispatch(gotFromServer(Brastlewark)); // Dispatch with gotFromServer action to persist data in localStorage
        }
      }
    };

    get();
  // eslint-disable-next-line
  }, []);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>

        <Container>
          <Box my={1}>
            <AppBar position="static">
              <Toolbar>
                <Typography variant="h6" className={classes.centered}>
                  Brastlewark
                </Typography>
              </Toolbar>
            </AppBar>
            <InhabitantsTable />
          </Box>
        </Container>

      </StateContext.Provider>
    </DispatchContext.Provider>
  );
}

export default App;