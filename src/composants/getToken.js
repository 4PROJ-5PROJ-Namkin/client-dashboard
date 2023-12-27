import { useQuery, gql } from "@apollo/client";

const LOGIN = gql`
query Login($email : String!, $password :  String!) {
    login(loginInput: {email: $email, password: $password}) {
        access_token
    }
}

`;

export const useToken = (mail, pass) => {
    const { data, loading, error } = useQuery(LOGIN, {
        variables: { email: mail, password : pass },
      });
    
    return { data, loading, error };
};
