'use strict';
exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost/readerslog-db';
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || 'mongodb://localhost/test-readerslog-db';
exports.PORT = process.env.PORT || 5050;
