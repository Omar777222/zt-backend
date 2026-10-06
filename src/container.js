// Raiz de composicion: el UNICO lugar donde se conectan puertos con adaptadores.
import { config } from './config/env.js';
import { InMemoryUserRepository } from './infrastructure/persistence/InMemoryUserRepository.js';
import { BcryptPasswordHasher } from './infrastructure/security/BcryptPasswordHasher.js';
import { JwtTokenService } from './infrastructure/security/JwtTokenService.js';
import { OsSystemInfo } from './infrastructure/system/OsSystemInfo.js';
import { LoginUser } from './application/use-cases/LoginUser.js';
import { GetDashboard } from './application/use-cases/GetDashboard.js';
import { AuthController } from './infrastructure/http/controllers/AuthController.js';
import { DashboardController } from './infrastructure/http/controllers/DashboardController.js';

export function buildContainer() {
  const userRepository = new InMemoryUserRepository([
    { id: '1', ...config.seedUser },
  ]);
  const passwordHasher = new BcryptPasswordHasher();
  const tokenService = new JwtTokenService(config.jwt);
  const systemInfo = new OsSystemInfo();

  const loginUser = new LoginUser({ userRepository, passwordHasher, tokenService });
  const getDashboard = new GetDashboard({ userRepository, systemInfo });

  return {
    config,
    tokenService,
    authController: new AuthController({ loginUser }),
    dashboardController: new DashboardController({ getDashboard }),
  };
}
