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

  /* Middleware Async Handler with 500 Error Status 
const asyncHandler = (function) => {
  return async(req, res, next ) => {
    try {
      await function(req, res, next) =>
    } catch(error){
      res.status(500).send(error)
    }
  }
}
  */