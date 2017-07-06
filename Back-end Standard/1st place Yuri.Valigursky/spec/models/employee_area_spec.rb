require 'rails_helper'

RSpec.describe EmployeeArea, type: :model do
  before(:each) do
    EmployeeArea.delete_all
    areas = ['bills', 'contracts', 'special-offers']
    empls = ['emp1', 'empl2']
    empls.each do |empl|
      areas.each do |area|
        EmployeeArea.create(name: empl, area: area)
      end
    end
  end

  it 'can delete areas by employee name' do
    expect(EmployeeArea.all.size).to eq(6)
    EmployeeArea.delete_areas('emp1')
    expect(EmployeeArea.all.size).to eq(3)
  end

  it 'can set area(s) for employee' do
    params = { name: 'empl3', area: 'google' }
    expect(EmployeeArea.all.size).to eq(6)
    EmployeeArea.set_areas(params)
    expect(EmployeeArea.all.size).to eq(7)
    params = { name: 'empl4', area: ['google', 'facebook']}
    EmployeeArea.set_areas(params)
    expect(EmployeeArea.all.size).to eq(9)
  end

  it 'can give us emploee for area if exist or nil' do
    expect(EmployeeArea.employee_for('bills')).to eq('emp1')
    expect(EmployeeArea.employee_for('style')).to eq(nil)
  end
end
