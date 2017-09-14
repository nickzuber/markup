
rebuild:
	npm run build:prod
	pm2 restart server

.PHONY: rebuild
