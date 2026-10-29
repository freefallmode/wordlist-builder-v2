// Shared UI state. Dialogs call A.changed() after editing the project; the shell registers A.render.
export const A = {
  P: null,
  sel: null,              // selected theme id
  search: '',
  open: new Set(),        // expanded tree nodes
  sort: 'text',
  filter: '',
  showOff: false,
  dirty: false,           // changed since the project file was last saved
  render: () => {},
  changed: () => {},
};
