// server/src/index.js
import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import taskRoutes from './routes/task.routes.js';
import './config/env.js';

const app = express();
const PORT = process.env.PORT || 3000;

// ==================== CONFIGURAÇÃO DO SWAGGER ====================
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'PulseTasks API',
      version: '1.0.0',
      description: 'API RESTful do gerenciador de tarefas PulseTasks',
    },
    servers: [
      { url: `http://localhost:${PORT}` }
    ],
  },
  apis: ['./src/routes/*.js'], // onde o Swagger vai ler os comentários
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

// ==================== MIDDLEWARES ====================
app.use(cors());
app.use(express.json());

// ==================== DOCUMENTAÇÃO SWAGGER ====================
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// ==================== ROTAS ====================
app.use('/api/v1/tasks', taskRoutes);

// ==================== MIDDLEWARE DE ERRO ====================
app.use((err, req, res, next) => {
  console.error('❌ Erro:', err.message);
  if (err.message === 'NOT_FOUND') {
    return res.status(404).json({ error: 'Tarefa não encontrada' });
  }
  res.status(500).json({ error: 'Erro interno do servidor' });
});

// ==================== INICIAR SERVIDOR ====================
app.listen(PORT, () => {
  console.log(`🚀 Servidor PulseTasks rodando em http://localhost:${PORT}`);
  console.log(`📡 API disponível em http://localhost:${PORT}/api/v1/tasks`);
  console.log(`📘 Documentação Swagger: http://localhost:${PORT}/api-docs`);
});