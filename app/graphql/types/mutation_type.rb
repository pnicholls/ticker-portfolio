class Types::MutationType < Types::BaseObject
  field :createPortfolioSecurity, mutation: Mutations::CreatePortfolioSecurity
  field :destroyPortfolioSecurity, mutation: Mutations::DestroyPortfolioSecurity
end
