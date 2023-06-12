import { gql } from 'apollo-angular';
// TEST GRAPHQL INTEGRATION

const GET_USER = gql`
  query ($id: String) {
    user(id: $id) {
      name
      surname
      location
      email
      phone
      id
    }
  }
`;

export { GET_USER };
