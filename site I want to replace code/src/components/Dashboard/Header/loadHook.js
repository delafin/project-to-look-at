import {useRef, useEffect} from 'react';

const useUnLoad = (fn) => {
    const vb = useRef(fn);

    useEffect(() => {
        vb.current = fn;
    }, [fn]);

    useEffect(() => {
        const onUnload = (...args) => vb.current?.(...args);

        window.addEventListener("beforeunload", onUnload);
        return () => window.removeEventListener("beforeunload", onUnload)
    }, [])
};

export default useUnLoad;

// client-id = 335546595730-odlkrpi9e3n6hc8tid1cg0sb9iikcre7.apps.googleusercontent.com
// client-secret = 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