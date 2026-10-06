import { buildContainer } from './container.js';
import { createServer } from './infrastructure/http/server.js';

const container = buildContainer();
const app = createServer(container);
const { host, port } = container.config;

app.listen(port, host, () => {
  console.log(`Backend escuchando en http://${host}:${port}`);
});
