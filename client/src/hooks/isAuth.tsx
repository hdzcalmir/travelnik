import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import UserAPI from '@/interceptor/User/User';

function IsAuth<P>(Component: React.ComponentType<P>) {
    const IsAuthComponent: React.FC<P> = (props) => {
        const router = useRouter();

        useEffect(() => {
            const checkPermission = async () => {
                try {
                    const response = await UserAPI.protectedRoute();
                    if (response.status === 200)
                        router.push('/panel/dashboard');

                } catch (error) {
                    router.push('/panel/login');
                }
            }

            checkPermission();
        }, [router]);

        if (!props) {
            return null;
        }

        return <Component {...props} />;
    };

    IsAuthComponent.displayName = `IsAuth(${Component.displayName || Component.name})`;

    return IsAuthComponent;
}

export default IsAuth;
