#!/bin/bash

# USAGE: bash project_INIT.sh

# This script automatically installs Docker the way we had to for our project. Docker installed DOES NOT require graphical interface.
# Some of the commands here look suspicious but they're just to properly set up a source to install Docker from.
# DO NOT TOUCH!!!

#Author: Raymond Marx

sudo -v


echo "Using our class' upgrade script and updating"
yes | sudo DEBIAN_FRONTEND=noninteractive apt-get -yqq upgrade

sudo apt update


echo "Getting proper APT installs and setting up docker installation source(s)"
sudo apt install apt-transport-https ca-certificates curl software-properties-common

sudo apt-get update
sudo apt-get install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

echo "Installing docker"
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt install docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin docker-ce -y
echo "Enabling Docker service on startup"
sudo systemctl enable /usr/lib/systemd/system/docker.service
