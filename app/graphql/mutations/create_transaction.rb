class Mutations::CreateTransaction < Mutations::BaseMutation
  argument :portfolioID, ID, required: true
  argument :securityID, ID, required: true
  argument :type, String, required: true
  argument :date, String, required: true
  argument :shares, Int, required: true
  argument :price, Float, required: true

  field :transaction, Types::TransactionType, null: true
  field :errors, [String], null: true

  def resolve(*args)
    attributes = {
      portfolio_id: args.first.fetch(:portfolio_id),
      security_id: args.first.fetch(:security_id),
      transaction_type: args.first.fetch(:type),
      date: args.first.fetch(:date),
      shares: args.first.fetch(:shares),
      price: args.first.fetch(:price),
    }

    transaction = Transaction.new(attributes)
    if transaction.save
      { transaction: transaction }
    else
      { errors: transaction.errors.full_messages }
    end
  end
end
