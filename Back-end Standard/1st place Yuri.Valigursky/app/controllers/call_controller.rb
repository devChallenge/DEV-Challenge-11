#
class CallController < ApplicationController
  def index
    url_params = URLParamsParser.new(request.original_url).params
    areas = if url_params[:area].is_a?(Array)
              url_params[:area]
            else
              [url_params[:area]]
            end
    render json: assignments(areas)
  end

  private

  def assignments(areas)
    response = { totalAssignments: 0,
                 assignments: [] }
    areas.each do |area|
      emp = EmployeeArea.employee_for(area)
      response[:totalAssignments] += 1 unless emp.nil?
      response[:assignments] << { area: area, employee: emp.nil? ? '' : emp }
      EmployeeArea.delete_areas(emp)
    end
    response
  end

end
