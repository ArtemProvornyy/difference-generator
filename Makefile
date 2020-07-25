install: install-deps

run:
	bin/gendiff.js -h

publish:
	npm publish --dry-run

lint:
	npx eslint .

test:
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8

install-deps:
	npm ci

local-install:
	sudo npm link

local-uninstall:
	sudo npm unlink

.PHONY: test