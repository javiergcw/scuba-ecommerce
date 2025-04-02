import SliderOne from "@/components/banners/slider_one";
import CoursesFirst from "@/components/containers/courses_first";
import ServiceOne from "@/components/containers/service_one";
import FunFact from "@/components/others/fun_fact";
import HowToDive from "@/components/others/how_to_dive";


export default function Home() {
  return (
    <>
      <SliderOne />
      <ServiceOne />
      <FunFact />
      <CoursesFirst />
      <HowToDive />
    </>
  );
}
