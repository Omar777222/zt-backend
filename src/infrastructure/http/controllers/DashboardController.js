export class DashboardController {
  constructor({ getDashboard }) {
    this.getDashboard = getDashboard;
  }

  get = async (req, res, next) => {
    try {
      const data = await this.getDashboard.execute({
        userId: req.auth.userId,
        tokenExpiresAt: req.auth.expiresAt,
      });
      res.json(data);
    } catch (err) {
      next(err);
    }
  };
}
