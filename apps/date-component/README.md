# Date component example

This tutorial explains the steps to create a date using the [hof-component-date](https://github.com/UKHomeOfficeForms/hof-component-date). There is also a further explanation of useful date validations.

## Getting started

Add a step that displays a date of birth.

```
  steps: {
    '/date-of-birth': {
      fields: ['date-of-birth'],
      next: '/confirm'
    }
  }
```

## Adding the Date component field

Install the [hof-component-date](https://www.npmjs.com/package/hof-component-date) module

In your field configuration file, create an instance of a date component. You can do this by calling the date component function with a field name and the options for the field. In this case, our field name is date-of-birth and in our options we set a required validator.

Then assign this instance to the appropriate key on your fields config.

```
const dateComponent = require('hof-component-date');

module.exports = {
  'date-of-birth': dateComponent('date-of-birth', {
    validate: ['required']
  })
};
```

Now start your app it should look something like this:

![Date component field](../../images/date-component-date-of-birth-field.png?raw=true)

## Validation with Date component

The date component has two useful validators `before` and `after`.

`before` means a date cannot be in the future depending on any argument(s) supplied or not supplied
`after` means a date cannot be in the past depending on any argument(s) supplied or not supplied

### No arguments

If no arguments are supplied then the validator uses the value of the input of the user to compare with today's date.

```
validate: ['required', 'before']
```

The above example would mean a user must enter a value before today's date otherwise a validation error will be thrown.

### Date argument

A single date argument can be used.  The validator would use the value entered by the user to compare with the date supplied, in the argument.

```
validate: [{type: 'after', arguments: '1892-01-01'}]
```

This would be mean a user must enter a value after `1892-01-01`. Otherwise a validation will be triggered.

### Different unit based arguments

You can also supply a number and a measurement unit to compare a date with.

```
{type: 'before', arguments: [18, 'years']}
```
This will compare the value entered by the user with todays date minus 18 years. The above example is typically used for the date of birth in order to check a person is over 18 years old.

### Multiple arguments

Multiple arguments can be added to compare against.

```
{type: 'before', arguments: [18, 'years', 11, 'months']}
```

This will compare the value entered by the user with todays date minus 18 years and 11 months. If the user enters a date later than this then a validation is triggered.
