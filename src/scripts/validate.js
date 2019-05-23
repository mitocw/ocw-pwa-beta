/* eslint-disable no-unneeded-ternary */
/*
  TODO: we may want to use something more elaborate to check the results of our GraphQL queries
  entirely. Something like the Joi validator, which is a large library that adds to our bundle size:
  https://github.com/hapijs/joi
*/
const validate = (key, value) => {
  switch (key) {
    case 'directoryTitle':
      // eslint-disable-next-line no-unneeded-ternary
      return value ? value : 'Professor';
    case 'imageDescription':
      return value ? value.imageDescription : 'None';
    default:
      return '';
  }
};

export default validate;
