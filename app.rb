require 'rubygems'
require 'sinatra'
require 'Haml'
require 'sass'
require 'json'
require 'active_record'
require './configure_db'

get '/app' do
  haml :index
end

get '/css/:name.css' do
  content_type 'text/css', :charset => 'utf-8'
  scss(:"/stylesheets/#{params[:name]}")
end

put '/epic/:id' do
#message = JSON.parse(params[:model])
  print 'put'
  epic = JSON.parse(request.body.read)
  print epic
end

post '/epic' do
  print 'post'
#message = JSON.parse(params[:model])
  epic = JSON.parse(request.body.read)
  print epic
  Epic.create(epic);
end

get '/epic' do
  print 'list epics'
  content_type 'application/json'
  response['Expires'] = (Time.now).httpdate
  epics = Epic.find(:all)
  ActiveRecord::Base.include_root_in_json = false
  puts epics.to_json
  epics.to_json
end