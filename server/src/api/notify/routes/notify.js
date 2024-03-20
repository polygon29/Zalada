'use strict';

/**
 * notify router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::notify.notify');
