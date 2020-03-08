function gotFromCache(inhabitants) {
  return({type: 'GOT_FROM_CACHE', payload: inhabitants});
}
function gotFromServer(inhabitants) {
  return({type: 'GOT_FROM_SERVER', payload: inhabitants});
}
function filter(text) {
  return({type: 'FILTER', payload: text});
}
export {
  gotFromCache,
  gotFromServer,
  filter,
}