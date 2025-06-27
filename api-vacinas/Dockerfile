FROM node:18

WORKDIR /app

# Copia arquivos de dependências
COPY package*.json ./

# Instala dependências do Node.js com base no lockfile
RUN npm install --omit=dev

# Instala dependência do sistema operacional (sqlite3)
RUN apt-get update && apt-get install -y sqlite3

# Copia todo o restante da aplicação
COPY . .

EXPOSE 3000
CMD ["node", "index.js"]
