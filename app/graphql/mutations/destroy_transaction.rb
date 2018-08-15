class Mutations::DestroyTransaction < Mutations::BaseMutation
  argument :id, ID, required: true

  field :errors, [String], null: false

  def resolve(id:)
    transaction = Transaction.find(id)

    transaction.destroy
    {
      errors: transaction.errors&.full_messages
    }
  end
end
