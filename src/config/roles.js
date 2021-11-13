const allRoles = {
  user: ['createOrder','manageOrders'],
  admin: ['getUsers', 'manageUsers', 'getProducts', 'manageProducts', 'getCategory', 'managecategories','manageOrders'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
