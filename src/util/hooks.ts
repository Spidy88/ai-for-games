import { useState } from 'react';

export function useRerender() {
    const [, setCount] = useState(0);
    return () => setCount((c) => c + 1);
}
