configure do
  ActiveRecord::Base.establish_connection(
      :adapter => 'sqlite3',
      :database => './db/agilepm.db',
      :timeout => 5000
  )

=begin
  class CreateEpics < ActiveRecord::Migration
    def self.up
      create_table :epics, :force => true do |t|
        t.integer :id
        t.string :phase
        t.string :storyName
        t.string :storyDesc
        t.string :assigned
        t.string :storyCount
      end
    end
  end
  CreateEpics.up
=end

  class Epic < ActiveRecord::Base
    validates_uniqueness_of :id
  end

  puts 'db recs created'
  #Epic.create(:phase => 'Definition', :storyName => 'LincPad', :storyDesc => 'LFG Ipad App',:assigned => 'Homer', :storyCount => '2');
  #Epic.create(:phase => 'Development', :storyName => 'Epic Dashboard', :storyDesc => 'Epic Dashboard should be live updating',:assigned => 'Marge', :storyCount => '10');
  #Epic.create(:phase => 'QA', :storyName => 'Story Dashboard', :storyDesc => 'Story dashboard should handle multiple useres',:assigned => 'Bart', :storyCount => '8');

end