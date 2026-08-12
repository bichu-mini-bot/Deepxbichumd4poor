FROM ghcr.io/railwayapp/nixpacks:ubuntu-1748585067
ENV SNIPPACKS_PATH=/app
WORKDIR /app
COPY . ${SNIPPACKS_PATH}
RUN sudo apt-get update && sudo apt-get install -y --no-install-recommends libssl3 libssl-dev libpq5 libpq-dev libicu-dev libicu72 libb2-1 libb2-dev libzip4 libzip-dev libxml2 libxml2-dev libgmp10 libgmp-dev && sudo rm -rf /var/lib/apt/lists/*
RUN npm install
CMD ["npm", "start"]
