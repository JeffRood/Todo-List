import { useCallback, useEffect, useState } from "react";
import { TaskService } from "./TaskServices";


export const useFetchTask = () => {
    const [Task, setTask] = useState<[]| null>([]);
    const [loading, setLoading] = useState();
  
    const prepare = useCallback(async () => {
        try {
            setLoading(undefined);
            const res = await TaskService.fetchTask();
            setTask(res.data);
            setLoading(undefined);
        } catch (error) {
            console.log({ message: 'error fetching event service ', error });
            setLoading(undefined);
        }
    }, []);

    useEffect(() => {
        prepare();
    }, []);

    return { Task, loading };
};


