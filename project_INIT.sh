#!/bin/bash

# USAGE: bash project_INIT.sh

# This script is meant to automatically facilitate pulling and setting up the project, and installing Docker on a NON-GUI Ubuntu system. Project needs to already be pulled.
# MUST BE RAN WITHIN root dir of project.

#Author: Raymond Marx

sudo -v
echo "Running install script."
bash get_docker.sh
echo "FINISHED INSTALLING DOCKER!"

echo "Starting docker if it hasn't started."
sudo systemctl start docker

echo "Pulling latest changes from git repo"
git pull

echo "STARTING OpenCourt's Docker Containers!"
docker compose up

echo "Showing status of the containers for the Project"
docker compose ps