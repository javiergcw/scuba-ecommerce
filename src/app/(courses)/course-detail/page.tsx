import BodyDetailCourse from '@/components/others/course/body_detail_course';
import { HeaderDetailCourse } from '@/components/others/course/header_detail_course';
import React from 'react'

const courseDetailMockData = {
    image: "assets/images/courses/course-d-1.jpg",
    price: 89,
    numberOfDives: 2,
    courseDuration: 4,
    title: "Extended Range",
    description: "Need something changed or is there something not quite working the way you envisaged? Is your van a little old and tired and need refreshing? Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet.",
    tips: "Neque porro est qui dolorem ipsum quia quaed inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Aelltes port lacus quis enim var sed efficitur turpis gilla sed sit amet finibus eros. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the ndustry stan when an unknown printer took a galley.",
    additionalInfo: "When an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing."
};

const CourseDetailPage = () => {
    return (
        <>
            <HeaderDetailCourse />
            <BodyDetailCourse {...courseDetailMockData} />
        </>
    )
}

export default CourseDetailPage;