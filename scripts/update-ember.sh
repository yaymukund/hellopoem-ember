#!/usr/bin/env sh
home='/Users/mukund'
vendor_dir="$home/src/hellopoem-ember/server/public/vendor"
handlebars_dir="$home/src/grunt-ember-handlebars/tasks/lib"

echo 'Pulling Ember'
cd ~/src/ember.js
git pull

echo 'Compiling Ember'
rake

echo 'Copying files'
cp dist/ember.js "$vendor_dir"
cp lib/headless-ember.js "$handlebars_dir"
cp lib/ember.js "$handlebars_dir"

cd ~/src/data

echo 'Pulling ember-data'
git pull

echo 'Compiling Ember Data'
rake

echo 'Copying files'
cp dist/ember-data.js "$vendor_dir"

echo 'Done!'
