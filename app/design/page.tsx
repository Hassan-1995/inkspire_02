import DesignGallery from "./DesignGallery";
import DesignItYourWay from "./DesignItYourWay";
import HeroSection from "./HeroSection";
import TipsResources from "./TipsResources";

interface DesignPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const DesignPage = async ({ searchParams }: DesignPageProps) => {
  const resolvedParams = await searchParams;

  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      {/* <DesignGallery searchParams={searchParams} /> */}
      <DesignGallery searchParams={resolvedParams} />
      <DesignItYourWay />
      <TipsResources />
    </div>
  );
};

export default DesignPage;
