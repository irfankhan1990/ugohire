import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import Layout from "../src/components/frontend/layout";
import PageTitle from "../src/components/frontend/page-title";
import capitalize from "../src/components/lib/capitalize";
import Image from "../src/components/optimize/image"

const Pricing = () => {
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
        <main>
          <div className="container mx-auto px-4 py-16">
            <div className="flex flex-wrap -mx-4">
              <div className="w-full shadow rounded bg-white !p-8 relative text-center">
                <h2 className="text-4xl font-semibold text-[#373737] mb-3">
                    Simple Transparent Pricing
                </h2>
                <h4 className=" mb-12">Find the job that's perfect for you about 800+ new jobs everyday</h4>
                <div className="flex flex-row space-x-5">
                    <div className="basis-1/2 md:basis-1/4 bg-white shadow text-left p-4">
                        <p className="text-2xl font-normal mb-9">Basic</p>
                        <p className="text-xl font-semibold">Grand Opening DEALS! FREE!</p>
                        <div className="flex flex-row items-center  mt-10">
                            <img src="/assets/img/demo-green.png"  alt="check" width={10} height={10} className=" mr-3"></img>10 job posting
                        </div>
                        <div className="flex flex-row items-center"><img src="/assets/img/demo-green.png"  alt="check" width={10} height={10} className=" mr-3"></img>job displayed for 15 days</div>
                        <div className="flex flex-row items-center"><img src="/assets/img/demo-green.png"  alt="check" width={10} height={10} className=" mr-3"></img>Premium Support 24/7</div>
                        <button className="mt-20 p-2 border border-green-500">Sign Up Now</button>
                    </div>
                    <div className="basis-1/2 md:basis-1/4 bg-white shadow text-left p-4">
                        <p className="text-2xl font-normal mb-9">Extended</p>
                        <p className="text-xl font-semibold">Grand Opening DEALS! FREE!</p>
                        <div className="flex flex-row items-center  mt-10">
                            <img src="/assets/img/demo-green.png"  alt="check" width={10} height={10} className=" mr-3"></img>10 job posting
                        </div>
                        <div className="flex flex-row items-center"><img src="/assets/img/demo-green.png"  alt="check" width={10} height={10} className=" mr-3"></img>job displayed for 15 days</div>
                        <div className="flex flex-row items-center"><img src="/assets/img/demo-green.png"  alt="check" width={10} height={10} className=" mr-3"></img>Premium Support 24/7</div>
                        <button className="mt-20 p-2 border border-green-500">Sign Up Now</button>
                    </div>
                    <div className="basis-1/2 md:basis-1/4 bg-white shadow text-left p-4">
                        <p className="text-2xl font-normal mb-9">Premium</p>
                        <p className="text-xl font-semibold">Grand Opening DEALS! FREE!</p>
                        <div className="flex flex-row items-center  mt-10">
                            <img src="/assets/img/demo-green.png"  alt="check" width={10} height={10} className=" mr-3"></img>10 job posting
                        </div>
                        <div className="flex flex-row items-center"><img src="/assets/img/demo-green.png"  alt="check" width={10} height={10} className=" mr-3"></img>job displayed for 15 days</div>
                        <div className="flex flex-row items-center"><img src="/assets/img/demo-green.png"  alt="check" width={10} height={10} className=" mr-3"></img>Premium Support 24/7</div>
                        <button className="mt-20 p-2 border border-green-500">Sign Up Now</button>
                    </div>
                    <div className="basis-1/2 md:basis-1/4 bg-white shadow text-left p-4">
                        <p className="text-2xl font-normal mb-9">Basic</p>
                        <p className="text-xl font-semibold">$399</p>
                        <div className="flex flex-row items-center  mt-10">
                            <img src="/assets/img/demo-green.png"  alt="check" width={10} height={10} className=" mr-3"></img>10 job posting
                        </div>
                        <div className="flex flex-row items-center"><img src="/assets/img/demo-green.png"  alt="check" width={10} height={10} className=" mr-3"></img>Unlimited Resume Reviews</div>
                        <div className="flex flex-row items-center"><img src="/assets/img/demo-green.png"  alt="check" width={10} height={10} className=" mr-3"></img>job displayed for 30 days</div>
                        <div className="flex flex-row items-center"><img src="/assets/img/demo-green.png"  alt="check" width={10} height={10} className=" mr-3"></img>Premium Support 24/7</div>
                        <button className="mt-20 p-2 bg-green-500">Sign Up Now</button>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </Layout>
    </>
  );
};

export default Pricing;
