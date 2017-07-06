class CreateEmployeeAreas < ActiveRecord::Migration[5.1]
  def change
    create_table :employee_areas do |t|
      t.string :name
      t.string :area

      t.timestamps
    end
  end
end
