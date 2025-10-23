import CheckoutButton from "@/components/shared/CheckoutButton"
import Collection from "@/components/shared/Collection"
import { getEventById, getRelatedEventsByCategory } from "@/lib/actions/event.action"
import { formatDateTime } from "@/lib/utils"
import { SearchParamProps } from "@/types"
import Image from "next/image"


const EventDetails = async ({ params, searchParams }: SearchParamProps) => {
  const { id } = params; 

  const event = await getEventById(id);

  const relatedEvents = await getRelatedEventsByCategory({
    categoryId: event.category._id,
    eventId: event._id,
    page: searchParams.page as string,
  });

  return (
    <>
        <section className="flex justify-center bg-primary-50 bg-dotted-pattern bg-contain">
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl">
        <Image src={event.imageUrl}
         alt="event-img" width={1000} height={1000}
         className="h-full min-h-[300px]
         object-cover object-center"></Image>

         <div className="flex w-full flex-col gap-8 p-5 md:p-10">
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold">{event.title}</h2>
            <div className="flex flex-col gap-3 sm:flex-row
            sm:items-center">
              <div className="flex gap-3">
                <p className="font-bold text-l rounded-full bg-green-500/10
                px-5 py-2 text-green-700">
                  {event.isFree? 'Free':`₹${event.price}`}
                </p>
                <p className="font-medium text-base rounded-full bg-gray-500/10
                px-4 py-2.5 text-gray-500">
                  {event.category.name}
                </p>
              </div>
              <p className="font-medium text-lg ml-2 mt-2 sm:mt-0">
                by {''}
                <span className="text-blue-500">{event.organizer.firstName} {event.organizer.lastName}</span>
              </p>
            </div>
          </div>
          {/* CHECKOUT BUTTON */}
          <CheckoutButton event={event}/>

          <div className="flex flex-col gap-5">
            <div className="flex gap-2 md:gap-3">
              <Image src="/assets/icons/calendar.svg" alt="calendar"
              height={32} width={32}/>
              <div className="p-medium-16 lg:p-regular-20
               flex flex-col flex-wrap  items-center">
              <p>
                {formatDateTime(event.startDateTime).dateOnly}-{' '}
                {formatDateTime(event.startDateTime).timeOnly} 
              </p>
              <p className="ml-1">
                {formatDateTime(event.endDateTime).dateOnly}-{' '}
                {formatDateTime(event.endDateTime).timeOnly}
              </p>
              </div>
            </div>
            <div className="flex items-center gap-3 font-medium text-lg">
              <Image src="/assets/icons/location.svg"
               alt="location" height={32} width={32}/>
               <p className="font-medium text-lg lg:font-medium">{event.location}</p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-bold text-lg text-gray-600">Desctiption:</p>
            <p className="font-normal lg:font-normal">{event.description}</p>
            <p className="font-normal lg:font-normal text-lg
             truncate underline text-blue-400">{event.url}</p>
          </div>
         </div>
      </div>
    </section>

    {/*Events from the same category*/ }
    <section className="wrapper my-8 flex flex-col
    gap-8 md:gap-12">
      <h2 className="text-2xl font-bold">
        Related Events
      </h2>

      <Collection
      data={relatedEvents?.data}
      emptyTitle="no events found"
      emptyStateSubtext="Come back later"
      collectionType="All_Events"
      limit={6}
      page={1}
      totalPages={2}
      />
    </section>
    </>
  )
}

export default EventDetails
