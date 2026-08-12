FROM node:18-bullseye-slim
ENV SNIPPACKS_PATH=/app
WORKDIR /app
COPY . ${SNIPPACKS_PATH}
RUN apt-get update && apt-get install -y --no-install-recommends libssl3 libssl-dev libpq5 libpq-dev libicu-dev libicu72 libb2-1 libb2-dev libzip4 libzip-dev libxml2 libxml2-dev libgmp10 libgmp-dev && rm -rf /var/lib/apt/lists/*
RUN npm install
CMD ["npm", "start"]
