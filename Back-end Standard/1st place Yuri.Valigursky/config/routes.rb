Rails.application.routes.draw do
  root to: 'routes#index'
  get 'register', to: 'register#index'
  get 'call', to: 'call#index'
  get 'reset', to: 'reset#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
