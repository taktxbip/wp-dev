First run:
1. git clone
2. cd ./environment
3. npm i

Development
1. cd ./environment
2. npm start

Plain HTML url example:
http://localhost:8080/homepage.html

HTML: ./src/public
Images: ./src/images (don't forget to import image in index.js, so webpack know about it)
Fonts: ./src/fonts
JS: ./src/js (index.js is main js file)
scss: ./src/scss (main.scss is main styles file)

All variables for styles are here: ./src/scss/config/variables.scss

Build
1. cd ./environment
2. npm run-script build

All files will be generated in ./dist folder. 
I use WebpackShellPlugin to copy files to theme after build.
On Windows main.css and main.js will be copied to theme directory automatically. 
On MacOS you will have to copy it manually or edit webpack.config.js.