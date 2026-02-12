import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { env } from './config/env';
import { errorHandler } from './middleware/errorHandler';
import authRoutes from './routes/auth.routes';
import scanRoutes from './routes/scan.routes';
import logger from './utils/logger';

const app = express();

app.use(helmet());
app.use(cors({ origin: '*' }));
app.use(express.json({ limit: '5mb' }));

app.get('/api/v1/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: Date.now() });
});

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/scan', scanRoutes);

app.use(errorHandler);

app.listen(env.PORT, () => {
  logger.info(`VinTraxx backend running on port ${env.PORT} [${env.NODE_ENV}]`);
});

export default app;
