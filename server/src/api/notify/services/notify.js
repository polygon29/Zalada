'use strict';

/**
 * notify service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::notify.notify');
