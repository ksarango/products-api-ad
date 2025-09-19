build-app:
	docker-compose build --no-cache
up-app:
	docker-compose up -d app
sync-products:
	docker-compose exec app npm run products:first-sync
