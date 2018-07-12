class FetchSecuritiesJob < ApplicationJob
  queue_as :default

  def perform
    fetch
  end

  private

  def fetch
    data.each do |datum|
      security = Security.where(identifier: datum['iexId']).first_or_initialize
      security.name = datum['name']
      security.symbol = datum['symbol']
      security.save!
    end
  end

  def data
    @data ||= begin
      uri = URI('https://api.iextrading.com/1.0/ref-data/symbols')
      response = Net::HTTP.get(uri)
      JSON.parse(response)
    end
  end
end
