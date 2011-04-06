class Epic
  include Mongoid::Document
  field :id
  field :phase
  field :storyName
  field :storyDesc
  field :assigned
  field :storyCount
end