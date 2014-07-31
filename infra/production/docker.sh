#!/bin/bash

mongod --fork --dbpath /data/db --logpath /data/db-log

forever start -l /tmp/out.log -c "npm start" /src/

/bin/bash
