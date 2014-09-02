#!/bin/bash

mongod --fork --dbpath /data/db --logpath /data/db-log

cp -R /src/public /src/assets

forever start -l /tmp/out.log -c "npm start" /src/

/bin/bash
