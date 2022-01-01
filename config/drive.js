'use strict';

const Helpers = use('Helpers');
const Env = use('Env');

module.exports = {
    default: 'local',

    disks: {
    // Local disk interacts with the a local folder inside your application
        local: {
            root: Helpers.tmpPath(),
            driver: 'local',
        },

        // S3 disk interacts with a bucket on aws s3
        s3: {
            driver: 's3',
            key: Env.get('S3_KEY'),
            secret: Env.get('S3_SECRET'),
            bucket: Env.get('S3_BUCKET'),
            region: Env.get('S3_REGION'),
        },
    },
};