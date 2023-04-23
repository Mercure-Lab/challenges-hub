import React, { useState } from 'react';
import NavBar from '@/components/navbar';
import LoginForm from '@/components/form/authentication/login-form';
import RegisterForm from '@/components/form/authentication/register-form';

export default function Login() {
    const [childFormStatusBool, setChildFormStatusBool] = useState<boolean>(true);

    const handleChildFormStatus = (status: boolean) => {
        setChildFormStatusBool(status);
    };

    return (
        <main className="bg-gray-900 text-white min-h-screen">
            <NavBar />
            {childFormStatusBool ? (
                <LoginForm onStatusChange={handleChildFormStatus} formStatus={childFormStatusBool} />
            ) : (
                <RegisterForm onStatusChange={handleChildFormStatus} status={childFormStatusBool} />
            )}
        </main>
    );
}
