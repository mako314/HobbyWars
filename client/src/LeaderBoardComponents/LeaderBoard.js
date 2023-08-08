import React from "react";
import { useEffect, useState } from 'react'

function LeaderBoard({leaderBoardID}){

    const [leaderBoardData, setLeaderBoardData] = useState([]);

    useEffect(() => {
        // Fetch leaderboard data on component mount
        fetch(`/leaderboard/${leaderBoardID}`)
            .then(response => response.json())
            .then(data => setLeaderBoardData(data));
    }, [leaderBoardID]);


    return(
        <div>
            yeah we out here yah ya h yah we paid
        </div>
    )
}

export default LeaderBoard;