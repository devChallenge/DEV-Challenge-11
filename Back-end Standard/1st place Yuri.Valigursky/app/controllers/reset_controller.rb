#
class ResetController < ApplicationController
  def index
    EmployeeArea.delete_all
    render plain: 'Good Bye!'
  end
end
