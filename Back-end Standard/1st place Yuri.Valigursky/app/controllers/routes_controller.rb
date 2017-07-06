#
class RoutesController < ApplicationController
  def index
    render json: routes
  end

  private

  def routes
    response = { resources: [] }
    routes = `rake routes`.split("\n")
    routes.shift
    routes.each do |s_route|
      a_route = s_route.split(/\s+/)
      a_route.pop
      url = a_route.last.gsub('(.:format)', '')
      a_route.pop
      method = a_route.last
      response[:resources] << [method, url].join(' ')
    end
    response
  end
end
