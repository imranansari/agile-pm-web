require 'rubygems'
require 'sinatra'
require 'Haml'
require 'sass'
require 'json'

get '/app' do
  haml :index
end

get '/css/:name.css' do
  content_type 'text/css', :charset => 'utf-8'
  scss(:"/stylesheets/#{params[:name]}")
end

put '/epic/:id' do
#message = JSON.parse(params[:model])
  epic = JSON.parse(request.body.read)
  print epic
end

post '/epic' do
#message = JSON.parse(params[:model])
  epic = JSON.parse(request.body.read)
  print epic
end