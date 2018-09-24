# Ticker Portfolio

https://ticker-portfolio.herokuapp.com/

Ticker Portfolio is my attempt at replacing the now removed Google Finance Portfolio tool.

## Implementation

This is a fairly straightforward Rails application with a React frontend. 

The React frontend pulls data via a GraphQL endpoint, it even makes use of GraphQL subscriptions, these are powered by ActionCable.

## Dependencies 

* Redis

## Getting Started

```
bin/rails db:create
bin/rails db:migrate
bin/rails db:fixtures:load
```
