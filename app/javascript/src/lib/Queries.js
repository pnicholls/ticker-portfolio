import gql from "graphql-tag";

export const GET_PORTFOLIO = gql`
  query Portfolio($id: ID!) {
    portfolio(id: $id) {
      id
      name
      default
      editable
      securities {
        id
        symbol
        name
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

export const DESTROY_PORTFOLIO_SECURITY_LOCALLY = gql`
  mutation destroyPortfolioSecurity(
    $portfolio: PortfolioType!
    $security: SecurityType!
  ) {
    destroyPortfolioSecurity(portfolio: $portfolio, security: $security) @client
  }
`;
