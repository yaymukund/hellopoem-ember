help :
	@echo 'You can use the following commands:'
	@echo '  `make app`'
	@echo '  `make db`'
	@echo '  `make tests`'
	@echo '  `make watch`'

app :
	node server/start.js

db :
	redis-server server/config/redis-local.conf

build :
	node_modules/grunt/bin/grunt

watch :
	node_modules/grunt/bin/grunt watch

# Testing

#	mocha = node_modules/mocha/bin/mocha
#	tests = $$(find spec -name "*-spec.js")
#	
#	tests :
#		$(mocha) -CR spec $(tests)
