import { useSession } from "next-auth/react"
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const useAuth = () => {
    const router = useRouter();
    const { data: session, status } = useSession();
    console.log("session => ", session)

    useEffect(() => {
        if (status === "loading") return;

        if (!session) {
            router.push('/login');
        }
    },[status, session])

    return { session, status }
}

export default useAuth;