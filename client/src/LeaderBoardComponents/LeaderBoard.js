import React from "react";
import { useEffect, useState } from 'react'

function LeaderBoard({leaderBoardID}){

    const [leaderBoardData, setLeaderBoardData] = useState([]);

    const [leaderBoardMapped, setLeaderBoardMapped] = useState([])

    useEffect(() => {
        // Fetch leaderboard data on component mount
        fetch(`/leaderboard/${leaderBoardID}`)
            .then(response => response.json())
            .then(data => setLeaderBoardData(data));
    }, [leaderBoardID]);

    // console.log(leaderBoardData)

    useEffect(() => {
        if (leaderBoardData){
            setLeaderBoardMapped(
                leaderBoardData.map((leaderBoard) =>{
                  // console.log(leaderBoard)
                    return(
                            <>
                              <tbody>
                                <tr>
                                  <td
                                    className="text-dark border-b border-l border-[#E8E8E8] bg-[#F3F6FF] py-5 px-2 text-center text-base font-medium"
                                  >
                                    {leaderBoard.placement}
                                  </td>
                                  <td
                                    className="text-dark border-b border-[#E8E8E8] bg-white py-5 px-2 text-center text-base font-medium bg-center bg-cover p-4"
                                    style={{ backgroundImage: `url(${leaderBoard.submission})` }}
                                  >
                                  </td>
                                  <td
                                    className="text-dark border-b border-[#E8E8E8] bg-[#F3F6FF] py-5 px-2 text-center text-base font-medium"
                                  >
                                    {leaderBoard.description}
                                  </td>
                                </tr>
                              </tbody>
                            </>
                  )

                })
                

            )
    }
      }, [leaderBoardData])



    return(
        <>
    <section className="bg-white py-20 lg:py-[120px]">
        <div className="container mx-auto">
            <div className="-mx-4 flex flex-wrap">
                <div className="w-full px-4">
                    <div className="max-w-full overflow-x-auto">
                        <table className="w-full table-auto">
                            <thead>
                                <tr className="bg-primary text-center">
                                <th
                                className="w-1/6 min-w-[160px] border-l border-transparent py-4 px-3 text-lg font-semibold text-black lg:py-7 lg:px-4"
                                >
                                Placement
                                </th>
                                <th
                                className="w-1/6 min-w-[160px] py-4 px-3 text-lg font-semibold text-black lg:py-7 lg:px-4"
                                >
                                Submission
                                </th>
                                <th
                                className="w-1/6 min-w-[160px] py-4 px-3 text-lg font-semibold text-black lg:py-7 lg:px-4"
                                >
                                Description
                                </th>
                                </tr>
                            </thead>
        {leaderBoardMapped}
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </section>
        </>
        
    )
}

export default LeaderBoard;