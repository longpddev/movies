import React, { useMemo } from 'react'
import ListTable from './ListTable';
import { useGetPersonDetailQuery } from '../../services/movieApi';
import Fetching from '../../components/Fetching';

const PersonActivity = ({idPerson}) => {
    const { data, isFetching } = useGetPersonDetailQuery({
        id: idPerson,
        type: "combined_credits",
    },{
        skip: !idPerson
    })

    const groupCastByYear = useMemo(() => {
        if(!(data?.cast?.length > 0)) return {};

        let resultYear = {};
        data.cast.map(item => {
            let year = item?.release_date;
            if(!year) {
                year = "__";
            } else {
                year = (new Date(year)).getFullYear();
            }
            if(typeof resultYear[year] === "undefined") resultYear[year] = [];
            resultYear[year].push(item)
        })

        return resultYear;
    }, [data]);
  return (
    <div>
        <div className="flex justify-between">
            <span className="text-xl font-semibold">
                Acting
            </span>
        </div>
        <div className="mt-3">
            <Fetching
                isFetching={isFetching}
                data={data}
                render={() => (
                    <ListTable
                        group={groupCastByYear}
                    />
                )}
            />
        </div>
    </div>
  )
}

export default PersonActivity