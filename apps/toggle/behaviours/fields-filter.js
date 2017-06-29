'use strict';

module.exports = superclass => class Behaviour extends superclass {
  locals(req, res) {
    const locals = super.locals(req, res);
    console.log('original locals fields', locals.fields);
    console.log('req form options fields', req.form.options.fields);
    locals.fields = locals.fields.filter(field => !req.form.options.fields[field.key].dependent);
    console.log('new locals fields', locals.fields);
    return locals;
  }
};
