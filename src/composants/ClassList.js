import { useQuery, gql } from "@apollo/client";

const getAllClass = gql`
query GetAllClass {
    GetAllClass {
        capaciter
        id
        name
        professeur_Id
    }
}
`;

export const useClassList = () => {
    const { data, loading, error } = useQuery(getAllClass);

    return { data, loading, error };
};
