const objectId = (value, helpers) => {
  if (!value.match(/^[0-9a-fA-F]{24}$/)) {
    return helpers.message('"{{#label}}" must be a valid mongo id');
  }
  return value;
};

const password = (value, helpers) => {
  if (value.length < 6) {
    return helpers.message('Mật khẩu phải lớn hơn 6 kí tự');
  }
  if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
    return helpers.message('Mật khẩu phải có ít nhất 1 chữ số hoặc 1 kí tự');
  }
  return value;
};

module.exports = {
  objectId,
  password,
};
