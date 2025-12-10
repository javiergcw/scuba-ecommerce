"use client";
import React from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

export const HeaderCourse = () => {
    const searchParams = useSearchParams();
    const selectedCategory = searchParams.get('category');
    return (
        <>
            <section className="page-header">
                <div className="page-header__bg" style={{ backgroundImage: "url(/assets/images/background/footer-bg-1-1.jpg)" }}></div>
                <div className="container">
                    <ul className="list-unstyled thm-breadcrumb">
                        <li><Link href="/">Home</Link></li>
                        <li><Link href="/cursos">Cursos</Link></li>
                        {selectedCategory && (
                            <li className="active"><a href="#">{selectedCategory}</a></li>
                        )}
                    </ul>
                    <h2 className="page-header__title">{selectedCategory || 'Cursos'}</h2>
                </div>
            </section>
        </>
    )
}
