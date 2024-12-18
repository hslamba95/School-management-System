module.exports = ({ meta, config, managers }) => {
    return ({ req, res, next }) => {
      const token = req.headers.token || req.headers.authorization?.split(' ')[1];
  
      if (!token) {
        console.log('Token required but not found');
        return managers.responseDispatcher.dispatch(res, { ok: false, code: 401, errors: 'Unauthorized' });
      }
  
      let decoded = null;
  
      try {
        if (req.headers.token) {
          // Short Token Verification
          decoded = managers.token.verifyShortToken({ token });
          if (!decoded) {
            console.log('Failed to decode short token');
            return managers.responseDispatcher.dispatch(res, { ok: false, code: 401, errors: 'Unauthorized' });
          }
        } else {
          // JWT Verification
          decoded = managers.token.verifyJwt({ token }); // Assuming a `verifyJwt` function exists
          if (!decoded) {
            console.log('Failed to decode JWT');
            return managers.responseDispatcher.dispatch(res, { ok: false, code: 401, errors: 'Unauthorized' });
          }
        }
      } catch (err) {
        console.log('Token verification failed', err.message);
        return managers.responseDispatcher.dispatch(res, { ok: false, code: 401, errors: 'Unauthorized' });
      }
  
      req.user = decoded; // Attach decoded token data to request
      next();
    };
  };
  