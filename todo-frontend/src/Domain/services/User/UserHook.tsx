import { useCallback, useEffect, useState } from "react";
import { UserService } from "./UserServices";
import { Loading } from "../../LoadingState";


export const useloginIn = (username: string, password: string) => {
    const [login, setLogin] = useState<any>();
    const [loading, setLoading] = useState(Loading.start);
    
  
    const prepare = useCallback(async () => {
        try {
            const res = await UserService.PostLoginUser(username, password); 
            setLogin(res.data);
            setLoading(Loading.finish);
        } catch (error) {
            console.log({ message: 'error fetching event service ', error });
            setLoading(Loading.error);
        }
    }, []);

    useEffect(() => {
        prepare();
    }, []);

    return { login, loading };
};

