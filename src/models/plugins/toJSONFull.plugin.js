const toJSONFull = (schema) => {
    let transform;
    if (schema.options.toJSON && schema.options.toJSON.transform) {
      transform = schema.options.toJSON.transform;
    }
  
    schema.options.toJSON = Object.assign(schema.options.toJSON || {}, {
      transform(doc, ret, options) {
        Object.keys(schema.paths).forEach((path) => {
          if (schema.paths[path].options && schema.paths[path].options.private) {
            deleteAtPath(ret, path.split('.'), 0);
          }
        });
  
        ret.id = ret._id.toString();
        ret.createdAt = dateToYMD(ret.createdAt);
        ret.updatedAt = dateToYMD(ret.updatedAt);
        delete ret._id;
        delete ret.__v;
        if (transform) {
          return transform(doc, ret, options);
        }
      },
    });
  };

function dateToYMD(date) {
    var d = date.getDate();
    var m = date.getMonth() + 1; //Month from 0 to 11
    var y = date.getFullYear();
    return '' + (d <= 9 ? '0' + d : d) + '-' + (m<=9 ? '0' + m : m) + '-' + y;
}

module.exports = toJSONFull;