# Usa un'immagine base di Node.js
FROM node:18

# Imposta la directory di lavoro
WORKDIR /app

# Copia i file package.json e package-lock.json
COPY package*.json ./

RUN ls -al

# Installa le dipendenze
RUN npm install

# Copia il resto del codice dell'applicazione
COPY . .

# Espone la porta su cui il server ascolterà
EXPOSE 5001

# Comando per avviare il server
CMD ["npm", "start"]
