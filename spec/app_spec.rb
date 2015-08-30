require 'spec_helper'
require File.expand_path '../../app/app', __FILE__
require 'nokogiri'

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

      # TODO use fixture response
      before :all do
        get '/api/v1/campaigns.html'
        @response = last_response
      end

      let(:html) { Nokogiri::HTML(@response.body) }

      it 'should be a success' do
        expect(@response).to be_ok
      end

      it 'should contain campaign data' do
        expect(html.css('.campaign .title').count).to be > 0
      end

      it 'should not specify http or https for image urls' do
        expect(html.css('.campaign img')[0]['src']).to start_with '//'
      end
    end
  end
end