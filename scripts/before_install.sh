DIR="/home/ec2-user/talkng"
if [ -d "$DIR"]; then
    echo "${DIR} exists"
else
    echo "Creating ${DIR} directory"
    mkdir ${DIR}