PACKAGES = {
  :imageTabs => {
    :name => 'jquery.imageTabs',
    :version => 0.2
  },
  :placeholder => {
    :name => 'jquery.placeholder',
    :version => 1.0
  },
  :carousel => {
    :name => 'jquery.carousel',
    :version => 0.1
  }
}

task :default do
  PACKAGES.each do |package, info|
    puts "Generating package #{package}"
    `cp src/#{info[:name]}.js releases/#{info[:name]}-#{info[:version]}.js`
    `java -jar vendor/yuicompressor-2.4.6.jar -o releases/#{info[:name]}-#{info[:version]}.min.js src/#{info[:name]}.js`
  end
end

