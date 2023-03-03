import * as express from 'express';
import { TeamRouter, UserRouter, MatcheRouter, LeaderboardRouter } from './routes';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();
    this.initRoutes();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
  }

  private initRoutes(): void {
    this.app.use('/teams', TeamRouter);
    this.app.use('/login', UserRouter);
    this.app.use('/matches', MatcheRouter);
    this.app.use('/leaderboard/home', LeaderboardRouter);
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
    // this.app.use('/teams', TeamRouter);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// Essa segunda exportação é estratégica, e a execução dos testes de cobertura depende dela
export const { app } = new App();
