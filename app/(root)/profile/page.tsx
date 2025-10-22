import Collection from '@/components/shared/Collection'
import { Button } from '@/components/ui/button'
import { getEventsByUser } from '@/lib/actions/event.action'
import { auth } from '@clerk/nextjs/server'
import Link from 'next/link'
import React from 'react'

const ProfilePage = async () => {
    const {sessionClaims}= await auth();
    const userId= sessionClaims?.userId as string;

    const organizedEvents=await getEventsByUser({userId,page:1})
  return (
    <>
    {/* my tickets */}
    <section className="bg-dotted-pattern bg-cover
    bg-center py-5 md:py-10 bg-blue-50">
        <div className="wrapper flex items-center 
        justify-center sm:justify-between">
            <h3 className="text-center font-bold text-lg sm:text-left">My Tickets</h3>
            <Button asChild className='butto hidden sm:flex'>
            <Link href= "/#events">
            Explore more events
            </Link>
            </Button>
        </div>
    </section>

    {/* <section className="wrapper my-8">
        <Collection
        data={events?.data}
        emptyTitle="no event purchased"
        emptyStateSubtext="Plenty of events to explore"
        collectionType="My_Tickets"
        limit={3}
        page={1}
        urlParaName="ordersPage"
        totalPages={2}
        />
    </section> */}

    {/* events organized */}
    <section className="bg-dotted-pattern bg-cover
    bg-center py-5 md:py-10 bg-emerald-50-50">
        <div className="wrapper flex items-center 
        justify-center sm:justify-between">
            <h3 className="text-center text-lg font-bold sm:text-left">Events Organized</h3>
            <Button asChild size='lg' className='butto hidden sm:flex'>
            <Link href= "/events/create">
            Create a new Event
            </Link>
            </Button>
        </div>
    </section>

    <section className="wrapper my-8">
        <Collection
        data={organizedEvents?.data}
        emptyTitle="no events created yet"
        emptyStateSubtext="Go create a new event"
        collectionType="Events_Organized"
        limit={6}
        page={1}
        totalPages={2}
        />
    </section>
    </>
  )
}

export default ProfilePage
//4.29.00