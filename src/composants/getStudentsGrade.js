import { useQuery, gql } from "@apollo/client";

const GET_STUDENT_GRADES = gql`
query AllgradesStudent($id: String!) {
    allgradesStudent(id: $id) {
        classe_id
        id
        note
        student_id
    }
}
`;

export const useGradesList = (studentId) => {
    const { data, loading, error } = useQuery(GET_STUDENT_GRADES, {
        variables: { id: studentId },
      });
    
    return { data, loading, error };
};
