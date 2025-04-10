import SliderOne from "@/components/banners/slider_one";
import CoursesFirst from "@/components/containers/courses_first";
import { CtaFour } from "@/components/containers/cta_four";
import CtaThree from "@/components/containers/cta_three";
import FirstTestimonials from "@/components/containers/first_testimonials";
import ServiceOne from "@/components/containers/service_one";
import FunFact from "@/components/others/fun_fact";
import HowToDive from "@/components/others/how_to_dive";
import { BrandOne } from "@/components/others/brand_one";

export default function Home() {
  return (
    <main className="min-h-screen">
      <SliderOne />
      <div className="w-full max-w-[100vw] overflow-x-hidden">
        <ServiceOne />
        <FunFact />
        <CoursesFirst />
        <HowToDive />
        <FirstTestimonials />
        <CtaThree />
        <CtaFour />
        <BrandOne />
      </div>
    </main>
  );
}
