#### frontend ###################################
FROM node:20-alpine3.18 as frontend-deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY /frontend/package*.json ./
RUN yarn install --frozen-lockfile

FROM node:20-alpine3.18 as frontend-builder
WORKDIR /app
COPY --from=frontend-deps /app/node_modules ./node_modules
COPY /frontend .
RUN yarn build
#################################################

#### backend ####################################
FROM node:20-alpine3.18 as backend-deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY /backend/package*.json ./
RUN yarn install --frozen-lockfile

FROM node:20-alpine3.18 as backend-builder
WORKDIR /app
COPY --from=backend-deps /app/node_modules ./node_modules
COPY /backend .
RUN yarn build
#################################################

#### preparing prod image #######################
FROM node:20-alpine3.18 as runner
WORKDIR /usr/src/app
COPY /backend/package*.json ./
RUN yarn install --prod
COPY --from=backend-builder /app/dist ./dist
COPY --from=frontend-builder /app/dist ./dist/public
#### running app #######################
CMD ["npm", "run", "start:prod"]
#################################################