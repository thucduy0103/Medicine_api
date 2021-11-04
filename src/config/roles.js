const allRoles = {
  user: [],
  admin: ['getUsers', 'manageUsers', 'getProducts', 'manageProducts', 'getCategory', 'managecategories'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
