import { BodyCourse } from '@/components/others/course/body_course'
import { HeaderCourse } from '@/components/others/course/header_course'
import React from 'react'

const coursesData = [
    {
        id: 1,
        level: "advanced",
        image: "assets/images/courses/course-1-1.jpg",
        title: "Scuba diving",
        description: "There are many variatin of passages of lorem ipsum available, but the majority have."
    },
    {
        id: 2,
        level: "beginner",
        image: "assets/images/courses/course-1-2.jpg",
        title: "Extended range",
        description: "There are many variatin of passages of lorem ipsum available, but the majority have."
    },
    {
        id: 3,
        level: "Professional",
        image: "assets/images/courses/course-1-3.jpg",
        title: "Free diving",
        description: "There are many variatin of passages of lorem ipsum available, but the majority have."
    },
    {
        id: 4,
        level: "advanced",
        image: "assets/images/courses/course-1-4.jpg",
        title: "Rebreather",
        description: "There are many variatin of passages of lorem ipsum available, but the majority have."
    },
    {
        id: 5,
        level: "advanced",
        image: "assets/images/courses/course-1-5.jpg",
        title: "Swimming",
        description: "There are many variatin of passages of lorem ipsum available, but the majority have."
    },
    {
        id: 6,
        level: "Professional",
        image: "assets/images/courses/course-1-6.jpg",
        title: "Snorkeling",
        description: "There are many variatin of passages of lorem ipsum available, but the majority have."
    }
];

const CoursesPage = () => {
    return (
        <>
            <HeaderCourse />
            <BodyCourse courses={coursesData} />
        </>
    )
}

export default CoursesPage 