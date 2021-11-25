const allRoles = {
  user: ['createOrder','manageOrders','user'],
  admin: ['user','getUsers', 'manageUsers', 'getProducts', 'manageProducts', 'getCategory', 'managecategories','manageOrders'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
