module.exports = { 
    //MONGO CONFIG 
    URI_MONGO: process.env.URI_MONGO || 'mongodb+srv://test:test@cluster0.j23qp.mongodb.net/test?retryWrites=true&w=majority', 
    
    //PORT APP CONFIG 
    PORT_LISTEN: process.env.PORT_LISTEN || 8000, 
    
    //JWT CONFIG 
    TOKEN_SECRET_JWT: process.env.TOKEN_SECRET_JWT || 'jWt9982_s!tokenSecreTqQrtw' 
  }