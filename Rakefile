VERSION=0.2
NAME="jquery.imageTabs"

task :default do
  `cp #{NAME}.js releases/#{NAME}-#{VERSION}.js`
  `java -jar vendor/yuicompressor-2.4.6.jar -o releases/#{NAME}-#{VERSION}.min.js #{NAME}.js`
end

