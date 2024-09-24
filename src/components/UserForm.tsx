'use client';
import { gql, useQuery } from '@apollo/client';

const USER_ID = 2;

const QUERY_USER = gql`
    query user ($id: ID!) {
        user (id: $id) {
            id
            email
            firstName
            lastName
        }
    }
`;

type TUserFormProps = {
    jwt: string;
    setJwt: (jwt: string) => void;
};

const UserForm = ({ jwt, setJwt }: TUserFormProps) => {
    const { loading, error, data } = useQuery(QUERY_USER, {
        variables: { id: USER_ID },
        context: {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        },
    });

    if (loading) {
        return <div className="text-xl">Loading...</div>;
    }
    if (error) {
        return <div className="text-xl text-red-700">Error: {error.message}</div>;
    }

    const { firstName, lastName } = data.user;

    return (
        <form className="flex flex-col gap-2 justify-center" data-testId="userForm" >
            <label htmlFor="firstName" className="mt-2">First Name</label>
            <input type="text" id="firstName" readOnly={true}
                value={firstName}
                data-testId="firstNameInput"
                className="bg-zinc-100 p-2 rounded"/>

            <label htmlFor="lastName" className="mt-2">Last Name</label>
            <input type="text" id="lastName" readOnly={true}
                value={lastName}
                data-testId="lastNameInput"
                className="bg-zinc-100 p-2 rounded"/>
            <div className="h-2"></div>

            <button type="button" className="bg-blue-700 text-white p-2 rounded" onClick={() => setJwt('')}>Sign Out</button>
        </form>
    );
};

export default UserForm;
