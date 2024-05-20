import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import Layout from "../src/components/frontend/layout";
import PageTitle from "../src/components/frontend/page-title";
import capitalize from "../src/components/lib/capitalize";

const AboutUs = () => {
  const router = useRouter();
  let path = router.pathname;
  path = path.replace("/", "");
  path = capitalize(path);
  path = path.replace(/-/g, " ");

  return (
    <>
      <Head>
        <meta name="description" content={path} />
      </Head>

      <Layout>
        <main className="bg-white">
          <PageTitle title={path} />
          <div className="container mx-auto px-4 py-16">
            <div className="grid grid-cols-1 lg:grid-cols-10 !px-5">
              <div className="!p-8 relative bg-[#F7F7F7] lg:col-span-4">
              <h1 className="about-us-heading">About Us</h1>
              <img decoding="async" width="500" height="500" src="https://ugohire.com/wp-content/uploads/2021/03/Business-deal-rafiki.svg" className="attachment-full size-full wp-image-35" alt="" />
              </div>
              <div className="bg-white !p-8 relative about-us-text lg:col-span-6">
                <p className="text-themeLight leading-8 !mb-4">
                The idea for Ugohire was created almost 10 years ago. Our staff is comprised of Human resources professionals that have seen it all. Some of us started by recruiting from phone books…I know, that was a LOOOoong time ago.30 years of ATS implementations, 20,000 hires, Enterprise onboarding, 140k employee base management, etc. We know what we are talking about. In summary, UgoHire is the kind of job board&nbsp;<strong>we wanted</strong>&nbsp;to subscribe to.
                </p>
                <p className="text-themeLight leading-8 !mb-4">
                We only work with the best, providing technological skills to the driven, gifted professionals or a new grad who wants to learn and who shares our desire to produce the exceptional. To accommodate any plan, UGoHire offers a variety of cutting edge Artificial intelligence tools, that allow you to gain a thorough knowledge of the whole employment dynamic. This includes; Data collection, analysis, and visualization, as well as how to apply “machine learning algorithms” to various situations.
                </p>
                <p className="text-themeLight leading-8 !mb-4">
                <img draggable="false" role="img" className="emoji" alt="✅" src="https://s.w.org/images/core/emoji/14.0.0/svg/2705.svg" />
                UGoHire offers programs that will meet your demands if you want to hire.
                </p>
                <p className="text-themeLight leading-8 !mb-4">
                <img draggable="false" role="img" className="emoji" alt="✅" src="https://s.w.org/images/core/emoji/14.0.0/svg/2705.svg" />
                UGoHire offers programs that will meet your demands if you want to be hired.
                </p>
                <p className="text-themeLight leading-8 !mb-4">
                <img draggable="false" role="img" className="emoji" alt="✅" src="https://s.w.org/images/core/emoji/14.0.0/svg/2705.svg" />
                UGoHire offers programs that will meet your demands if you want to learn.
                </p>
                
              </div>
            </div>
            <div className="conatiner how-it-works">
            <h2>How it works?
</h2>
<p>Pellentesque quis lectus sagittis, gravida erat id, placerat tellus.</p>
            </div>
          </div>
        </main>
      </Layout>
    </>
  );
};

export default AboutUs;
