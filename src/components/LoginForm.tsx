'use client';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { gql, useMutation } from '@apollo/client';
import FcApolloProvider from '@/providers/FcApolloProvider';

const MUTATION_LOGIN = gql`
    mutation login(
        $identifier: String!
        $password: String!
    ) {
        login(
            input: {
                identifier: $identifier
                password: $password
            }
        ) {
            jwt
        }
    }
`;

type TLoginFormFields = {
    email: string;
    password: string;
};

type TLoginFormProps = {
    jwt: string;
    setJwt: (jwt: string) => void;
};

const LoginForm = ({ jwt, setJwt }: TLoginFormProps) => {
    const router = useRouter();
    const [ login, { error } ] = useMutation(MUTATION_LOGIN);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<TLoginFormFields>();

    const onSubmit: SubmitHandler<TLoginFormFields> = async (formData) => {
        const { email, password } = formData;
        const { data } = await login({ variables: { identifier: email, password } });
        setJwt(data?.login?.jwt || '');
    };

    const fieldOptions = {
        email: {
            required: 'Email is required',
            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Email must be a valid email address' },
        },
        password: {
            required: 'Password is required',
            minLength: { value: 8, message: 'Password must be at least 8 characters' },
            maxLength: { value: 50, message: 'Password must be at most 50 characters' },
        },
    };

    return (
        <FcApolloProvider>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 justify-center" data-testId="loginForm">
                <label htmlFor="email" className="mt-2">Email</label>
                <input {...register("email", fieldOptions.email)}
                    data-testId="emailInput"
                    type="text" id="email"
                    className="bg-zinc-100 p-2 rounded"/>
                {errors.email &&
                    <div className="text-red-500 text-sm font-semibold h-4">{errors.email.message}</div>}

                <label htmlFor="password" className="mt-2">Password</label>
                <input {...register("password", fieldOptions.password)}
                    data-testId="passwordInput"
                    type="password" id="password"
                    className="bg-zinc-100 p-2 rounded"/>
                {errors.password &&
                    <div className="text-red-500 text-sm font-semibold h-4">{errors.password.message}</div>}

                <div className="h-2"></div>
                <button type="submit"
                        className={`${isSubmitting ? 'bg-gray-500' : 'bg-blue-700'} text-white p-2 rounded`}
                        disabled={isSubmitting}>{isSubmitting ? 'Signing in...' : 'Sign In'}</button>
                <div className="text-red-500 text-sm font-semibold h-4">{error?.message}</div>
            </form>
        </FcApolloProvider>
    );
};

export default LoginForm;
