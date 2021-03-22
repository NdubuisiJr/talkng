
sudo chmod -R 777 /home/ec2-user/talkng

cd /home/ec2-user/talkng

docker run -d --name talk \
-p 3000:3000 -p 9000:9000 \
--mount type=bind,source="$(pwd)/server.key",target="/src/certs/server.key" \
--mount type=bind,source="$(pwd)/server.cert",target="/src/certs/server.cert" \
 ndubuisijr/talkng