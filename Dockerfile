# Use the official Python 3 image as the base image
FROM python:3


# Install system dependencies for Node.js
RUN apt-get update && \
  apt-get install -y --no-install-recommends \
  curl \
  gnupg \
  dirmngr \
  lsb-release && \
  curl -sL https://deb.nodesource.com/setup_19.x | bash - && \
  apt-get install -y nodejs && \
  apt-get clean && \
  rm -rf /var/lib/apt/lists/*

# Set the working directory to /app
WORKDIR /app


# Install Node.js dependencies
COPY package*.json /app/
RUN npm install

# Copy the rest of the application code
COPY . /app/

# Build the Next.js app
RUN npm run build

# Expose the default Next.js port
EXPOSE 3000

# Start the Next.js app
CMD ["npm", "start"]
