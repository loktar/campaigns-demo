require 'haml'
require 'json'
require 'open-uri'
require 'sinatra'

get '/' do
  haml :index
end

get '/api/v1/campaigns.json' do
  content_type :json

  # For a simple app, blocking on the indiegogo api call is fine, but eventually we should handle
  # when the indiegogo api is slow/unresponsive. Leaving it like this risks our server's workers
  # being blocked in that scenario and could negatively affect the rest of our app.
  uri = 'https://api.indiegogo.com/1/campaigns.json?api_token=e377270bf1e9121da34cb6dff0e8af52a03296766a8e955c19f62f593651b346'
  URI.parse(uri).read
end