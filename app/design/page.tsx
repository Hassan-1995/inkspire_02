import DesignGallery from "./DesignGallery";
import DesignItYourWay from "./DesignItYourWay";
import HeroSection from "./HeroSection";
import TipsResources from "./TipsResources";

const DesignPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const params = await searchParams;
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      {/* <DesignGallery searchParams={searchParams} /> */}
      <DesignGallery searchParams={params} />
      <DesignItYourWay />
      <TipsResources />
    </div>
  );
};

export default DesignPage;
