require 'sidekiq/web'

Rails.application.routes.draw do
  root 'marketing#show'

  resource :dashboard, only: %i(show), controller: 'dashboard'
  resource :registration, only: %i(new create)
  resource :session, only: %i(new create destroy)

  if Rails.env.development?
    mount GraphiQL::Rails::Engine, at: '/graphiql', graphql_path: '/graphql'
  end

  post '/graphql', to: 'graphql#execute'

  mount Sidekiq::Web => '/sidekiq'
end
