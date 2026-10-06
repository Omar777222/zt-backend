import os from 'node:os';
import { SystemInfo } from '../../domain/ports/SystemInfo.js';

// Muestra la IP privada del backend: sirve como evidencia de que la respuesta
// viene de la VPC Backend a traves del VPC Peering.
export class OsSystemInfo extends SystemInfo {
  describe() {
    const privateIps = Object.values(os.networkInterfaces())
      .flat()
      .filter((i) => i && i.family === 'IPv4' && !i.internal)
      .map((i) => i.address);
    return { hostname: os.hostname(), privateIps, serverTime: new Date().toISOString() };
  }
}
