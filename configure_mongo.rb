configure do
=begin
  Mongoid.configure do |config|
    name = "demo"
    host = "localhost"
    config.master = Mongo::Connection.new.db(name)
    config.slaves = [
        Mongo::Connection.new(host, 27017, :slave_ok => true).db(name)
    ]
    config.persist_in_safe_mode = false
  end
=end
  connection = Mongo::Connection.new
  Mongoid.database = connection.db("demo")
end