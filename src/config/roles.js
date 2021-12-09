const allRoles = {
  user: ['createOrder','createOrder','user'],
  admin: ['user','getUsers', 'manageUsers', 'getProducts', 'manageProducts', 'getCategory', 'managecategories','manageOrders','createOrder'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
