const config={
	jwtSecret: process.env.JWT_SECRET || 'YOUR_secret_key',
	mongoUser: process.env.MONGO_URL_USER,
	mongoPass: process.env.MONGO_URL_PASS
}