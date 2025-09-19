build-app:
	docker-compose build
up-app:
	docker-compose up -d app
make sync-products:
	docker-compose exec app npm run products:first-sync
