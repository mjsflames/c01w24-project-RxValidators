# Use a minimal Alpine Linux image
FROM alpine:latest

# Install python/pip
RUN apk add --no-cache python3 py3-pip nodejs npm supervisor

# Copy everything from the current directory to the container
COPY . .

# Install react dependencies
RUN npm install

# Install python dependencies
ENV VIRTUAL_ENV=/opt/venv
RUN python3 -m venv $VIRTUAL_ENV
ENV PATH="$VIRTUAL_ENV/bin:$PATH"
RUN pip install -r requirements.txt

# Build frontend
RUN cd frontend && npm run build && cd ..

# Start supervisord
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf
CMD ["/usr/bin/supervisord", "-n", "-c", "/etc/supervisor/conf.d/supervisord.conf"]