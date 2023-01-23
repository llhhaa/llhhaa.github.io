require 'securerandom'

# Create a new micropost file in ./_posts

POST_BODY = <<BODY
---
layout: post
title:  ''
date:   #{Time.now.to_s}
categories: 
published: true
micro: true
---
Lorem ipsum...
BODY

def create_file
  full_path = File.join(posts_dir, file_name)
  puts "Creating #{full_path}"
  File.write(full_path, POST_BODY)
  puts "Done!"
end

def posts_dir
  target_dir = Dir.pwd.match?(/llhhaa.github.io\/bin\Z/) ? '../_posts' : '_posts'
  Dir.chdir(target_dir)
  Dir.pwd
end

def file_name
  "#{Time.now.strftime('%Y-%m-%d')}-#{random_string}.markdown"
end

def random_string
  SecureRandom.hex(5)
end

create_file
