#!/bin/bash

echo "Deploying server"
#launch mongod
#cd ~/dopamine/NodeAPI; sudo mongod --fork --logpath /home/ramsay/dopamine/NodeAPI/log/mongo.log;

#prep/launch apache
#sudo rm -fv /etc/apache2/sites-enabled/000-default;
#cd ~/dopamine/devops/dopamine-testing/config;
sudo cp 000-default /etc/apache2/sites-enabled/
sudo /etc/init.d/apache2 restart;

#launch node server
#cd ~/dopamine/NodeAPI/; sudo npm start;
echo "Deployed";
