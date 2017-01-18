# start with node image this time
FROM node:4.7-alpine

# the VM’s firewall should allow access to port 8080
EXPOSE 8080

# create directory /usr/src on VM
RUN mkdir /usr/src

# copy JS file
COPY . /usr/src

RUN cd /usr/src

# directory to be in when VM starts
WORKDIR /usr/src

# run node when VM starts, with argument index.js
CMD node index.js
