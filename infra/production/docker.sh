#!/bin/bash

mongod --fork --dbpath /data/db --logpath /data/db-log

forever start -l /tmp/out.log -c "grunt" /src/

/bin/bash
