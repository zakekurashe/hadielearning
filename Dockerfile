FROM node:18.18.2

#WORKDIR /root/test-actions/GITHUB_ACTIONS_FRONTEND
WORKDIR /root/code/hadielearn-prod-13

COPY package*.json ./

RUN npm i -f

COPY . .

RUN npm run build

CMD ["npm", "run", "start"]
#CMD ["npm", "run", "dev"]
