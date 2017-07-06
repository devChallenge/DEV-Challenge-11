require 'rails_helper'

RSpec.describe URLParamsParser, type: :class do
  it 'can create new Object' do
    expect(URLParamsParser.new('')).to be_a URLParamsParser
  end
  it 'can parse url params string to hash' do
    url_params = URLParamsParser.new('http://server.name/call?area=bills').params
    expect(url_params).to be_a Hash
  end
  it 'can parse multi name params to array' do
    url = 'http://server.name/call?area=bills&area=leases&area=bills'
    url_params = URLParamsParser.new(url).params
    expect(url_params[:area]).to be_a Array
    expect(url_params[:area].size).to eq(3)
  end
  it 'has correct order in array (as in url)' do
    url = 'http://server.name/call?area=bills&area=leases&area=bills'
    url_params = URLParamsParser.new(url).params
    areas = url_params[:area]
    expect(areas[0]).to eq('bills')
    expect(areas[1]).to eq('leases')
    expect(areas[2]).to eq('bills')
  end
end
