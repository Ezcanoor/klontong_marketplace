FROM node:16.17.0
copy . .
run npm install
cmd ["npm", "run", "start"]