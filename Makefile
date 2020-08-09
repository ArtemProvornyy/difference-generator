install: install-deps

run:
	bin/gendiff.js file1.json file2.json

publish:
	npm publish --dry-run

lint:
	npx eslint .

test:
	npx -n --experimental-vm-modules jest --watch

test-coverage:
	npm test -- --coverage --coverageProvider=v8

install-deps:
	npm ci

local-install:
	sudo npm link

local-uninstall:
	sudo npm unlink

.PHONY: test