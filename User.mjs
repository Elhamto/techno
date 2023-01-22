const users = [
  {
    id: '1',
    username: 'Mau',
    firstName: 'Maurice',
    lastName: 'Moss',
    email: 'maurice@moss.com',
    password: 'abcdefg'
  },
  {
    id: '2',
    username: 'Roy',
    firstName: 'Roy',
    lastName: 'Trenneman',
    email: 'roy@trenneman.com',
    password: 'imroy'
  }
];
export default {
  getUsers: () => users,
  addUser: (user) => users.push(user),
};

