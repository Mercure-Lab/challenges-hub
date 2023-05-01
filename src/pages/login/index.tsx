import React, { useState } from 'react';
import NavBar from '@/components/navbar';
import LoginForm from '@/components/form/authentication/login-form';
import RegisterForm from '@/components/form/authentication/register-form';
import { CustomSession } from '@/interfaces/interfaces';
import { getSession } from 'next-auth/react';

interface ProfileProps {
    customSession: CustomSession;
}

export default function Login({ customSession }: ProfileProps) {
    const [childFormStatusBool, setChildFormStatusBool] = useState<boolean>(true);

    const handleChildFormStatus = (status: boolean) => {
        setChildFormStatusBool(status);
    };

    return (
        <main className="bg-gray-900 text-white min-h-screen">
            <NavBar customSession={customSession} />
            {childFormStatusBool ? (
                <LoginForm onStatusChange={handleChildFormStatus} formStatus={childFormStatusBool} />
            ) : (
                <RegisterForm onStatusChange={handleChildFormStatus} status={childFormStatusBool} />
            )}
        </main>
    );
}

export async function getServerSideProps(context: any) {
    const session = await getSession(context);

    const customSession: CustomSession = session as CustomSession;

    return {
        props: {
            customSession
        }
    };
}
