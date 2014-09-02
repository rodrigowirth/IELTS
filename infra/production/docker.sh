#!/bin/bash

mongod --fork --dbpath /data/db --logpath /data/db-log

cp -R /src/public /src/assets

forever start -l /tmp/out.log -c "grunt" /src/

/bin/bash
