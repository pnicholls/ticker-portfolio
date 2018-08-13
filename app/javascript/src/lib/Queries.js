import gql from "graphql-tag";

export const GET_PORTFOLIO = gql`
  query Portfolio($id: ID!) {
    portfolio(id: $id) {
      id
      name
      editable
      persisted @client
      marketing

      securities {
        id
        symbol
        name

        quote {
          latestPrice
          changePercent
          marketCap
          latestVolume
          avgTotalVolume
          open
          high
          low
          peRatio
        }

        stats {
          week52High
          week52Low
          ttmEPS
          beta
        }

        charts {
          sixMonth {
            data {
              date
              close
            }
            changePercent
          }
        }
      }

      transactions {
        id
        security {
          name
          symbol
        }
        type
        date
        shares
        price
      }
    }
  }
`;

export const PORTFOLIO_SUBSCRIPTION = gql`
  subscription portfolioUpdated($id: ID!) {
    portfolioUpdated(id: $id) {
      id
      name
      editable
      persisted @client
      marketing

      securities {
        id
        symbol
        name

        quote {
          latestPrice
          changePercent
          marketCap
          latestVolume
          avgTotalVolume
          open
          high
          low
          peRatio
        }

        stats {
          week52High
          week52Low
          ttmEPS
          beta
        }

        charts {
          sixMonth {
            data {
              date
              close
            }
            changePercent
          }
        }
      }
    }
  }
`;

export const SECURITY_SUBSCRIPTION = gql`
  subscription securityUpdated($id: ID!) {
    securityUpdated(id: $id) {
      id
      symbol
      name

      quote {
        latestPrice
        changePercent
        marketCap
        latestVolume
        avgTotalVolume
        open
        high
        low
        peRatio
      }

      stats {
        week52High
        week52Low
        ttmEPS
        beta
      }

      charts {
        sixMonth {
          data {
            date
            close
          }
          changePercent
        }
      }
    }
  }
`;

export const GET_SECURITIES = gql`
  query Securities {
    securities {
      id
      symbol
      name
    }
  }
`;

export const CREATE_PORTFOLIO_SECURITY_LOCALLY = gql`
  mutation createPortfolioSecurity(
    $portfolio: PortfolioType!
    $security: SecurityType!
  ) {
    createPortfolioSecurity(portfolio: $portfolio, security: $security) @client
  }
`;

export const CREATE_PORTFOLIO_SECURITY_REMOTELY = gql`
  mutation createPortfolioSecurity($portfolioID: ID!, $securityID: ID!) {
    createPortfolioSecurity(
      portfolioID: $portfolioID
      securityID: $securityID
    ) {
      portfolio {
        id
        name
        editable
        persisted @client
        marketing
        securities {
          id
          symbol
          name
        }
      }
      security {
        id
        symbol
        name

        quote {
          latestPrice
          changePercent
          marketCap
          latestVolume
          avgTotalVolume
          open
          high
          low
          peRatio
        }

        stats {
          week52High
          week52Low
          ttmEPS
          beta
        }

        charts {
          sixMonth {
            data {
              date
              close
            }
            changePercent
          }
        }
      }
    }
  }
`;

export const DESTROY_PORTFOLIO_SECURITY_LOCALLY = gql`
  mutation destroyPortfolioSecurity(
    $portfolio: PortfolioType!
    $security: SecurityType!
  ) {
    destroyPortfolioSecurity(portfolio: $portfolio, security: $security) @client
  }
`;

export const DESTROY_PORTFOLIO_SECURITY_REMOTELY = gql`
  mutation destroyPortfolioSecurity($portfolioID: ID!, $securityID: ID!) {
    destroyPortfolioSecurity(
      portfolioID: $portfolioID
      securityID: $securityID
    ) {
      portfolio {
        id
        name
        editable
        persisted @client
        marketing
        securities {
          id
          symbol
          name
        }
      }

      security {
        id
        symbol
        name

        quote {
          latestPrice
          changePercent
          marketCap
          latestVolume
          avgTotalVolume
          open
          high
          low
          peRatio
        }

        stats {
          week52High
          week52Low
          ttmEPS
          beta
        }

        charts {
          sixMonth {
            data {
              date
              close
            }
            changePercent
          }
        }
      }
    }
  }
`;
