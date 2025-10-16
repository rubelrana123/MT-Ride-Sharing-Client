import OurMissionAndVission from "@/components/modules/About/OurMissionAndVission";
import OurStory from "@/components/modules/About/OurStory";
import TeamMembers from "@/components/modules/About/TeamMembers";
import PageHeading from "@/components/modules/public/Home/PageHeading";

export default function AboutPage() {
  return (
    <main className="container mx-auto px-4 py-24">
      <div>
        <PageHeading
          title="About MyTrip"
          desc="We're on a mission to make transportation accessible, reliable, and safe for everyone, everywhere."
        />

        {/* about page container  */}
        <div>
          <OurStory />
          <OurMissionAndVission />
          <TeamMembers />
        </div>
      </div>
    </main>
  );
}
