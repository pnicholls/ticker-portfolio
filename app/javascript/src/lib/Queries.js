import gql from "graphql-tag";

export const GET_PORTFOLIO = gql`
  query Portfolio($id: ID!) {
    portfolio(id: $id) {
      id
      name
      editable
      persisted @client
      securities {
        id
        symbol
        name
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
