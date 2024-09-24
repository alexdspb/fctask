'use client';
import { useState } from 'react';
import FcApolloProvider from '@/providers/FcApolloProvider';
import LoginForm from '@/components/LoginForm';
import UserForm from '@/components/UserForm';

const App = () => {
    const [jwt, setJwt] = useState<string>('');

    return (
        <FcApolloProvider>
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-600 md:text-2xl dark:text-white">
                {jwt ? 'User Profile' : 'Sign In'}
            </h1>
            {jwt ? <UserForm jwt={jwt} setJwt={setJwt}/> : <LoginForm jwt={jwt} setJwt={setJwt}/>}
        </FcApolloProvider>
    );
};

export default App;
