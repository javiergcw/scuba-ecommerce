#!/bin/bash

if [ -f docker-compose.yml ]; then
    echo "Usando docker-compose para el despliegue..."
    docker-compose down
    docker-compose up -d --build
else
    echo "Construyendo la imagen Docker..."
    docker build -t select-tms:latest .
    echo "Deteniendo contenedores anteriores..."
    docker stop select-tms || true
    docker rm scuba-ecommerce || true
    echo "Ejecutando el contenedor..."
    docker run -d --name select-tms -p 9020:9020 --restart unless-stopped select-tms:latest
fi
