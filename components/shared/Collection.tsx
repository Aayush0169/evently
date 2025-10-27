import { IEvent } from '@/lib/database/models/event.model'
import React from 'react'
import Card from './Card'
import Pagination from './Pagination'

type CollectionProps={
  data:IEvent[],
  emptyTitle:string,
  emptyStateSubtext:string,
  page:number|string,
  totalPages?:number,
  limit?:number,
  urlParamName?:string
  collectionType?:'Events_Organized'|'My_Tickets'|'All_Events',
}
const Collection = ({
    data,
  emptyTitle,
  emptyStateSubtext,
  page,
  totalPages=0,
  collectionType,
  limit,
  urlParamName,}:CollectionProps
) => {
  return (
    <>
    {data.length>0?(
      <div className='flex flex-col items-center gap-10'>
        <ul className="grid w-full max-w-7xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10 mx-auto">
        {data.map((event)=>{
          const hasOrderLink=collectionType==='Events_Organized';
          const hidePrice=collectionType==='My_Tickets';

          return(
          <li key={event._id} className='flex justify-center'>
            <Card event={event} hasOrderLink={hasOrderLink}
            hidePrice={hidePrice}/>
          </li>
          )
        })}
        </ul>
        {totalPages>1&&(
          <Pagination urlParamName={urlParamName} 
          page={page} totalPages={totalPages}/>
        )}
      </div>
    ):(
      <div className='ml-4 flex flex-center wrapper min-h-[200px]
      w-full flex-col gap-3 rounded[14px] bg-gray-100 py-28 text-center '>
        <h3 className='font-bold text-lg md:text-xl md:font-bold'>{emptyTitle}</h3>
        <p>{emptyStateSubtext}</p>
      </div>
    )}
    </>
  )
}

export default Collection

