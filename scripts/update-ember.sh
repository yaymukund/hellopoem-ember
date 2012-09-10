#!/usr/bin/env sh
home='/Users/mukund'
vendor_dir="$home/src/hellopoem-ember/server/public/vendor"

# ember
cd ~/src/ember.js

echo 'Pulling Ember'
git pull

echo 'Compiling Ember'
rake

echo 'Copying files'
cp dist/ember.js "$vendor_dir"

# ember-data
cd ~/src/data

echo 'Pulling ember-data'
git pull

echo 'Compiling Ember Data'
rake

echo 'Copying files'
cp dist/ember-data.js "$vendor_dir"

echo 'Done!'
