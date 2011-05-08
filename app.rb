require 'rubygems'
require 'sinatra'
require 'Haml'
require 'sass'
require 'json'
#require 'active_record'
require 'mongo'
require 'mongoid'
require 'bson'
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
  print epic["_id"]
  updateEpic = Epic.where(:_id => epic["_id"]).first

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
  #print epic
  #Person.new(:first_name => "Ludwig", :last_name => "Beethoven")
=begin
  newEpic = Epic.new(epic);
  newEpic.phase = "QA";
  newEpic.storyCount = "0";
  newEpic.save;
  newEpic.id = newEpic._id;
=end
  newEpic = Epic.create(epic);
  #print 'new id :'+newEpic._id;
  #newEpic.id = newEpic._id;
  #newEpic.fname = "my fname";
  #newEpic.fname = newEpic._id;
  newEpic.to_json
end

delete '/epic/:id' do |id|
print 'delete'
  #epic = JSON.parse(request.body.read)
  #print epic.to_json
  print id
  deleteEpic = Epic.where(:_id => id).first

  deleteEpic.destroy;
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

get '/test' do
  newEpic = Epic.new();
  newEpic.phase = "DEV";
  newEpic.storyCount = "0";
  newEpic.stories.create("storyName" => "my child story 1");
  newEpic.stories.create("storyName" => "my child story 2");
  newEpic.stories.create("storyName" => "my child story 3");
  newEpic.stories.create("storyName" => "my child story 4");

  newEpic.save;
end

get '/testget' do
#epic = Epic.where("stories._id" => "4da0fab6fd860606db000004")
#Person.first(conditions: { first_name: "Syd" })

 # works
#epic = Epic.first(conditions: {"stories._id" => "4da0fab6fd860606db000004"})

#cant find id
  epic = Epic.new()
 epics = epic.stories.find("4da1df29fd86062308000003");
 #print epics.stories[0].storyName

# find by model
=begin
  epic = Epic.new()
  epic = epic.getStoryById("4da0fab6fd860606db000002");
=end

#epic = Epic.all()[10]
#epicsT = epics[10];
#epicsT = epics.stories[0].storyName;
#epicsT.to_json
#story = epic.story;
#print story.storyName;

#works
  #epic.stories[0].update_attributes(:storyDesc => "my child story1 description1.2");
  #epic.save;


epics.to_json
end


get '/createpersonwithaddr' do
  person = Person.create(name: "Joe")
  person.addresses.create(city: "Berlin");
  person.save
end

get '/getpersonswithaddr' do
  persons = Person.all()
    content_type 'application/json'
  persons.to_json
end

get '/getaddr' do
  id = "4da1e44dfd86062397000002"
  person = Person.new
  address = person.addresses.find(id)
  content_type 'application/json'
  address.to_json
end

get '/getaddrfix' do
  id = "4da1e44dfd86062397000002"
  person = Person.where("addresses._id" => "4da1e44dfd86062397000002").first
  address = person.addresses.find("4da1e44dfd86062397000002")
  address.city = address.city + " 1 "
  address.save

  content_type 'application/json'
  address.to_json
end

get '/getperson' do
  id = "4da1e44dfd86062397000001"
  person = Person.find(id)

  #address = person.addresses.select{ |x| x.city == "Bonn"}
  #print person.addresses.index({:city => "Bonn"})

  person.addresses.each_with_index{ |addr, idx|
    if(addr.city == 'Bonn')
        childIndex = idx;
        child = addr;
    end

  }

  person.addresses[0].update_attributes(:city => "Bonn");
  person.save

  content_type 'application/json'
  #address.to_json
end

get '/posupdate'do
  #db = Mongo::Connection.new.db("demo")
  #db = Mongoid.database.connection
  db = Mongoid.database
  coll = db.collection("people")
  print "ready to update"
  #coll.update({"name" => "Imran"},{"$set" => {"name" => "Jim"}})
  #coll.update({"addresses.city" => "Bonn"},{"$set" => {"addresses.$.city" => "Durham"}})
  coll.update({"addresses._id" => BSON.ObjectId("4da1e44dfd86062397000002")},{"$set" => {"addresses.$.city" => "Raleigh"}})
end