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

  describe 'the API' do
    describe 'the campaigns endpoint' do
      before do
        # TODO: Use cached response to speed up specs
        get '/api/v1/campaigns.json'
      end

      it 'should be a success' do
        expect(last_response).to be_ok
      end

      it 'should be valid json' do
        JSON.parse(last_response.body)
      end

      it 'should contain campaign data' do
        json = JSON.parse(last_response.body)
        expect(json['response'][0]['funding_type']).to be_a String
      end
    end
  end
end