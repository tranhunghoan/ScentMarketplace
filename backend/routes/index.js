import user from './user'
import auth from './auth'
import insert from './insert'
import product from './product'
import blog from './blog'
import purchaseHis from './purchaseHis'
import { notFound } from '../middleware/handle_error'
const initRoutes = (app) => {

  app.use ('/api/v1/user',user)
  app.use ('/api/v1/auth',auth)
  app.use ('/api/v1/insert',insert)
  app.use ('/api/v1/get-pro',product)
  app.use ('/api/v1/get-blog',blog)
  app.use ('/api/v1/checkout',purchaseHis)
  
  app.use(notFound)
};
module.exports = initRoutes;
