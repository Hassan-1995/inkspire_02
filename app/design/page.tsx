import DesignGallery from "./DesignGallery";
import DesignItYourWay from "./DesignItYourWay";
import HeroSection from "./HeroSection";
import TipsResources from "./TipsResources";

interface DesignPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

const DesignPage = ({ searchParams }: DesignPageProps) => {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <DesignGallery searchParams={searchParams} />
      <DesignItYourWay />
      <TipsResources />
    </div>
  );
};

export default DesignPage;
