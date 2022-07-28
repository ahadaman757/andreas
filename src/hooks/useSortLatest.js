import React, { useState } from 'react'

export default function useSort(Descending = true) {
    const [Ascending, setAscending] = useState(Descending)
    const toggleAscending = () => {
        setAscending(!Ascending)
    }
    return {
        Ascending,
        toggleAscending
    }
}





