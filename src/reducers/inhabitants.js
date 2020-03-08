const inhabitantsReducerInitialState = {
  all: [],
  hiddenIds: []
};
const inhabitantsReducer = (state, { type, payload }) => {
  switch (type) {
    case 'GOT_FROM_SERVER':
      payload = payload.map(e => {
        if (['Pink', 'Red'].includes(e.hair_color)) {
          e.gender = 'female';
        } else {
          e.gender = 'male';
        }
        return e;
      });
      localStorage.setItem('inhabitants', JSON.stringify(payload));
    // eslint-disable-next-line
    case 'GOT_FROM_CACHE':
      return {...state, all: payload};
    case 'FILTER':
      let hiddenIds = state.all.reduce((acc, e) => {
        const searchableFields = [e.name, e.professions, e.friends].flat();
        if (!JSON.stringify(searchableFields).toLowerCase().includes(payload.toLowerCase())) {
          acc.push(e.id);
        }
        return acc;
      }, []);
      return { ...state, hiddenIds };
    default:
      return state;
  }
};
export {
  inhabitantsReducerInitialState,
  inhabitantsReducer,
}