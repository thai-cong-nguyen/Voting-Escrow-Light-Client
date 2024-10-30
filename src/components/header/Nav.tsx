import React from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"

const Nav = () => {
    return (
        <div className={` flex justify-between items-center gap-10 font-bold`
        }>
            <div className="flex flex-row flex-wrap gap-10 justify-between items-center invisible md:visible ">
                <Button size="lg" className="flex flex-row items-center gap-1 transition delay-100 duration-200 ease-in-out hover:scale-90">
                    <span>Menu</span>
                </Button>
                <Button size="lg" className="flex flex-row items-center gap-1 transition delay-100 duration-200 ease-in-out hover:scale-90">
                    <span>Menu</span>
                </Button>
            </div>
        </div >
    )
}

export default Nav