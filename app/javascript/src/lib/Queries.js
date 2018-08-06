import gql from "graphql-tag";

export const GET_PORTFOLIO = gql`
  query Portfolio($id: ID!) {
    portfolio(id: $id) {
      id
      name
      editable
      marketing
      persisted @client
      securities {
        id
        symbol
        name
      }
    }
  }
`;

export const GET_PORTFOLIO_OVERVIEW = gql`
  query Portfolio($id: ID!) {
    portfolio(id: $id) {
      id

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
      }
    }
  }
`;

export const GET_PORTFOLIO_PERFORMANCE = gql`
  query Portfolio($id: ID!) {
    portfolio(id: $id) {
      id

      securities {
        id
        symbol
        name

        quote {
          latestPrice
          changePercent
        }
      }
    }
  }
`;

export const GET_PORTFOLIO_FUNDAMENTALS = gql`
  query Portfolio($id: ID!) {
    portfolio(id: $id) {
      id

      securities {
        id
        symbol
        name

        quote {
          latestPrice
          marketCap
          avgTotalVolume
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

export const GET_PORTFOLIO_TRANSACTIONS = gql`
  query Portfolio($id: ID!) {
    portfolio(id: $id) {
      id
    }
  }
`;

export const GET_SECURITIES_WITHOUT_QUOTES = gql`
  query Securities {
    securities {
      id
      symbol
      name
    }
  }
`;

export const GET_SECURITIES_WITH_QUOTES = gql`
  query Securities($id: [ID!]!) {
    securities(id: $id) {
      id
      symbol
      name
      quote {
        latestPrice
        changePercent
        marketCap
        latestVolume
        open
        high
        low
      }
    }
  }
`;

export const GET_SECURITIES_WITH_PERFORMANCE_DATA = gql`
  query Portfolio($id: ID!) {
    portfolio(id: $id) {
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
      }
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
      }
    }
  }
`;
