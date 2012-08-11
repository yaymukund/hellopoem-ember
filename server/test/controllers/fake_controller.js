var resource = require('../../controllers/resource_controller');

var fake_resource = {
  name: 'resource',

  properties: {
    text: 'string',
    created_at: 'date'
  }
};

module.exports = resource.create(fake_resource);
