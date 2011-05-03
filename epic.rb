class Epic
  include Mongoid::Document
  field :id
  field :phase
  field :storyName
  field :storyDesc
  field :assigned
  field :storyCount
  field :fname
  embeds_many :stories

    def getStoryById(id)
    return stories.find(id)
  end
end

class Story
  include Mongoid::Document

  field :id
  field :storyName
  field :storyDesc

  embedded_in :epic, :inverse_of => :stories

end

class Person
  include Mongoid::Document
  field :name
  embeds_many :addresses
end

class Address
  include Mongoid::Document
  field :city, type: String
  field :country, type: String
  embedded_in :person
end