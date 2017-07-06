#
class RegisterController < ApplicationController
  def index
    url_params = URLParamsParser.new(request.original_url).params
    EmployeeArea.delete_areas(url_params[:name])
    EmployeeArea.set_areas(url_params)
    render plain: 'WELCOME'
  end
end
