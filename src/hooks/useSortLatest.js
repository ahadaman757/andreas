import React, { useState } from 'react'

export default function useSort() {
    const [Ascending, setAscending] = useState(true)
    const toggleAscending = () => {
        setAscending(!Ascending)
    }
    return {
        Ascending,
        toggleAscending
    }
}





