#
class URLParamsParser
  attr_accessor :params
  def initialize(url_string)
    parse url_string
    normalize_params
  end

  private

  def parse(url_string)
    @params = {}
    s_params = url_string.split('?')[1]
    return if s_params.nil? || s_params.empty?
    arr_params = s_params.split('&')
    arr_params.each do |key_value|
      key, value = key_value.split('=')
      @params[key.to_sym] = [] if @params[key.to_sym].nil?
      @params[key.to_sym] << value
    end
  end

  def normalize_params
    @params.each_pair do |key, value|
      @params[key] = value[0] if value.size == 1
    end
  end
end
