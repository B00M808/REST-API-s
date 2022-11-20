// Handler function to wrap each route.
exports.asyncHandler = (db) => {
    return async (req, res, next) => {
      try {
        await db(req, res, next);
      } catch (error) {
        // Forward error to the global error handler
        next(error);
      }
    }
  }