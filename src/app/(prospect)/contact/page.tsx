import { ContactOne } from '@/components/others/contact/contact_one'
import { CtoOneContact } from '@/components/others/contact/cto_one_contact'
import GoogleMapsContact from '@/components/others/contact/google_maps_contact'
import TopbarContact from '@/components/others/contact/topbar_contact'
import React from 'react'

const ContactPage = () => {
    return (
        <div className="w-full max-w-[100vw] overflow-x-hidden">
            <div className="w-full">

                <TopbarContact />
                <ContactOne />
                <CtoOneContact />
                <GoogleMapsContact />   
            </div>
        </div>
    )
}

export default ContactPage