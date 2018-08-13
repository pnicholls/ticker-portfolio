class GraphqlChannel < ApplicationCable::Channel
  def subscribed
    @subscription_ids = []
  end

  def execute(data)
    query = data['query']
    variables = ensure_hash(data['variables'])
    operation_name = data['operationName']
    context = {
      channel: self,
    }

    result = TickerSchema.execute(
      query: query,
      context: context,
      variables: variables,
      operation_name: operation_name
    )

    payload = {
      result: result.subscription? ? { data: nil } : result.to_h,
      more: result.subscription?,
    }

    if result.context[:subscription_id]
      @subscription_ids << context[:subscription_id]
    end

    @subscription_ids.each do |sid|
      subscription = TickerSchema.subscriptions.read_subscription(sid)
      enqueue_job(subscription)
    end

    transmit(payload)
  end

  def unsubscribed
    @subscription_ids.each do |sid|
      TickerSchema.subscriptions.delete_subscription(sid)
    end
  end

  private

  def ensure_hash(query_variables)
    if query_variables.blank?
      {}
    elsif query_variables.is_a?(String)
      JSON.parse(query_variables)
    else
      query_variables
    end
  end

  def enqueue_job(subscription)
    case subscription[:operation_name]
    when 'securityUpdated'
      security = Security.where(subscription[:variables]).first
      FetchSecurityDataJob.perform_later(security)
    end
  end
end
