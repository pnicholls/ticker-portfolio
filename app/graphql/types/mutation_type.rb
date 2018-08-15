class Types::MutationType < Types::BaseObject
  field :createPortfolioSecurity, mutation: Mutations::CreatePortfolioSecurity
  field :destroyPortfolioSecurity, mutation: Mutations::DestroyPortfolioSecurity
  field :createTransaction, mutation: Mutations::CreateTransaction
  field :destroyTransaction, mutation: Mutations::DestroyTransaction
end
