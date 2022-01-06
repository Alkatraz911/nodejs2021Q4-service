# RS School REST service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone {repository URL}
```

## Installing NPM modules

```
npm install
```

## Running application

```
npm start
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Running docker container

First you need to install docker at your computer. 
windows - https://docs.docker.com/desktop/windows/install/
Mac - https://docs.docker.com/desktop/mac/install/
Linux - https://docs.docker.com/engine/install/

For VS Code your need to install docker plugin

After installation of docker and plugin(if it necessary) run next command

```
docker compose up /docker compose up -d(deamon mode)
```
Command build images and run containers 
When containers will be started you can check APi's functionality at http://localhost:4000

To check size of images your need to run 
```
docker images
``` 
Containers using custom bridge driver. You can check it in docker-compose.yml. Also your can run 
```
docker ps
``` 
while containers running and check it there. 

Containers restart automatically if an error occur. You can check it in docker-compose.yml. Also you can run containers with empty string in POSTGRES_PASSWORD in .env file and your will see that db container will be restarting automatically untill the error will be fixed. 

Logs and database files stored in volumes at host machine to check it you need to go to 
Windows - \\wsl$\docker-desktop-data\version-pack-data\community\docker\volumes 
Mac,Linux - /var/lib/docker/volumes/
or in CLI tool on Mac or Windows PC. 
If your will change any file in src folder at host machine it will be automatically changed at container.

