// ----------------------------------------------------------------------
const userInfo = JSON.parse(localStorage.getItem('userInfo'));
console.log('userInfo',userInfo.name);

const account = {
  displayName: userInfo.name,
  email: userInfo.email,
  photoURL: '/static/mock-images/avatars/avatar_default.jpg',
};

export default account;
