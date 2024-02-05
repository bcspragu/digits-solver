# This Dockerfile is based on both the Distroless NodeJS example [1] (adapted
# for yarn) as well as this random Dockerfile for SvelteKit example [2].
# [1] https://github.com/GoogleContainerTools/distroless/blob/main/examples/nodejs/Dockerfile
# [2] https://gist.github.com/aradalvand/04b2cad14b00e5ffe8ec96a3afbb34fb

FROM node:20 AS builder
WORKDIR /build
COPY package.json .
COPY yarn.lock .
# See https://stackoverflow.com/questions/58482655/what-is-the-closest-to-npm-ci-in-yarn
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn run build
# See https://github.com/yarnpkg/yarn/issues/696#issuecomment-258418656
RUN yarn install --production --ignore-scripts --prefer-offline

FROM gcr.io/distroless/nodejs20-debian12
WORKDIR /app

COPY --from=builder /build/build build/
COPY --from=builder /build/node_modules node_modules/

COPY package.json .

EXPOSE 3000
ENV NODE_ENV=production
CMD ["build"]

