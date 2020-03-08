export const headCells = [
  { id: 'thumbnail', align: 'center', padding: 'default' },
  { id: 'name', align: 'left', padding: 'default', label: 'Name' },
  { id: 'age', align: 'right', padding: 'none', label: 'Age' },
  { id: 'weight', align: 'right', padding: 'none', label: 'Weight' },
  { id: 'height', align: 'right', padding: 'none', label: 'Height' },
  { id: 'hair_color', align: 'center', padding: 'default', label: 'Hair color' },
  { id: 'professions', align: 'left', padding: 'default', label: 'Professions' },
  { id: 'friends', align: 'left', padding: 'default', label: 'Friends' },
  { id: 'gender', align: 'center', padding: 'none', label: 'Gender' },
];

export const getAlign = id => {
  return headCells.filter(e=>(e.id===id))[0].align
};
export const getPadding = id => {
  return headCells.filter(e=>(e.id===id))[0].padding
};