require 'rubygems'
require 'sinatra'
require 'Haml'
require 'sass'
require 'json'
#require 'active_record'
require 'mongoid'
require './configure_mongo'
require './epic'

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
  print epic.to_json
  print epic["id"]
  updateEpic = Epic.where(:_id => epic["id"]).first

  updateEpic.phase = epic["phase"];
  updateEpic.storyName = epic["storyName"];
  updateEpic.storyDesc = epic["storyDesc"];
  updateEpic.assigned = epic["assigned"];

  updateEpic.save;
end

post '/epic' do
  print 'post'
#message = JSON.parse(params[:model])
  epic = JSON.parse(request.body.read)
  print epic
  #Person.new(:first_name => "Ludwig", :last_name => "Beethoven")
  newEpic = Epic.new(epic);
  newEpic.phase = "QA";
  newEpic.storyCount = "0";
  newEpic.save;
end

get '/epic' do
  print 'list epics'
  content_type 'application/json'
  response['Expires'] = (Time.now).httpdate
  epics = Epic.all()
  #updatedEpics = epics.map!{ |epic| epic.id = epic._id }
  #epics.each{|ep| puts ep.id}

  #epics.each{|epic| epic.id = epic._id}

  epics.to_json
end