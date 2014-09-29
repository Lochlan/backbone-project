# files
SRC_JS_PATH = source/js
SRC_JS = $(shell find $(SRC_JS_PATH) -type f -name '*.js')
BUILD_JS_PATH = assets/js

SRC_SCSS_PATH = source/scss
SRC_SCSS = $(shell find $(SRC_SCSS_PATH) -type f -name '*.scss')
BUILD_CSS_PATH = assets/css
BUILD_CSS = $(subst $(SRC_SCSS_PATH),$(BUILD_CSS_PATH),$(SRC_SCSS:.scss=.css))

DEPS_VENDOR = \
	$(BUILD_JS_PATH)/vendor/require.js\
	$(SRC_JS_PATH)/vendor/backbone.js\
	$(SRC_JS_PATH)/vendor/handlebars.js\
	$(SRC_JS_PATH)/vendor/jquery.js\
	$(SRC_JS_PATH)/vendor/text.js\
	$(SRC_JS_PATH)/vendor/underscore.js\

# targets
all: deps lint test build

build: build-css build-js

build-css: $(BUILD_CSS)

build-js: $(BUILD_JS_PATH)/assets/js/main.js

clean:
	rm -rfv assets/css/
	rm -rfv assets/js/
	rm -rfv build-scripts/
	rm -rfv node_modules/
	rm -rfv $(SRC_JS_PATH)/vendor/

deps: deps-node deps-vendor

deps-node: node_modules

deps-vendor: $(DEPS_VENDOR)

lint: lint-js

lint-js: deps-node
	./node_modules/.bin/jshint $(SRC_JS_PATH)

# TODO
test:

# file rules
$(BUILD_CSS_PATH)/%.css: $(SRC_SCSS_PATH)/%.scss
	[ -d $(@D) ] || mkdir -p "$(@D)"
	sass --style compressed -r sass-import_once $< $@

$(BUILD_JS_PATH)/assets/js/main.js:
	[ -d $(@D) ] || mkdir -p "$(@D)"
	./node_modules/.bin/r.js -o build.js

$(BUILD_JS_PATH)/vendor/require.js: build-scripts/get_file_url_github_latest_tag.py
	[ -d $(@D) ] || mkdir -p "$(@D)"
	wget $(shell python3 $< jrburke requirejs require.js) -O $@

$(SRC_JS_PATH)/vendor/backbone.js: build-scripts/get_file_url_github_latest_tag.py
	[ -d $(@D) ] || mkdir -p "$(@D)"
	wget $(shell python3 $< jashkenas backbone backbone.js) -O $@

$(SRC_JS_PATH)/vendor/handlebars.js:
	[ -d $(@D) ] || mkdir -p "$(@D)"
	wget http://builds.handlebarsjs.com.s3.amazonaws.com/handlebars-latest.js -O $@

$(SRC_JS_PATH)/vendor/jquery.js:
	[ -d $(@D) ] || mkdir -p "$(@D)"
	wget http://code.jquery.com/jquery-2.1.1.js -O $@

$(SRC_JS_PATH)/vendor/text.js:
	[ -d $(@D) ] || mkdir -p "$(@D)"
	wget https://raw.githubusercontent.com/requirejs/text/latest/text.js -O $@

$(SRC_JS_PATH)/vendor/underscore.js: build-scripts/get_file_url_github_latest_tag.py
	[ -d $(@D) ] || mkdir -p "$(@D)"
	wget $(shell python3 $< jashkenas underscore underscore.js) -O $@

build-scripts/get_file_url_github_latest_tag.py:
	[ -d $(@D) ] || mkdir -p "$(@D)"
	wget https://raw.githubusercontent.com/Lochlan/github-get-file-url-latest-tag/master/get_file_url_github_latest_tag.py -O $@

node_modules: package.json
	npm install
	touch node_modules
