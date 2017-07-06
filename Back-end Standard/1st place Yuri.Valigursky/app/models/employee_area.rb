#
class EmployeeArea < ApplicationRecord
  default_scope { order(:created_at) }

  def self.delete_areas(empl)
    return if empl.nil?
    where(name: empl).delete_all
  end

  def self.set_areas(params)
    employee = params[:name]
    areas = params[:area].is_a?(Array) ? params[:area] : [params[:area]]
    areas.each do |area|
      create(name: employee, area: area)
    end
  end

  def self.employee_for(area)
    where(area: area).first.try(:name)
  end
end
