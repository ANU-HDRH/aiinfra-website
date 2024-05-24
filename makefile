# Used to run 'make local' or 'make prod'. Configure the basePath in /home/jimdakinworld/Dropbox/Technical/web-development/aiinfra/hugo.prod.toml if necessary.

.PHONY: local prod

local:
	hugo server --config local.toml
    
prod:
	hugo --config hugo.toml
	git add .
	git commit -m "Build and deploy to production"
	git push