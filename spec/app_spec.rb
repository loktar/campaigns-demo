require 'spec_helper'
require File.expand_path '../../app/app', __FILE__

describe 'App' do
  def app
    Sinatra::Application
  end

  describe 'the default route' do
    it 'should be a success' do
      get '/'
      expect(last_response).to be_ok
    end
  end
end