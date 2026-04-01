import dotenv from 'dotenv';
dotenv.config();

if (!process.env.PORT) {
  throw new Error('❌ A variável PORT não foi definida no arquivo .env');
}

console.log(`✅ Ambiente carregado - PORT=${process.env.PORT}`);