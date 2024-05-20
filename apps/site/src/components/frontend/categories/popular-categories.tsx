import _ from "lodash";
import Link from "next/link";
import React from "react";
import CategoryItem from "./category-item";

const categoryList = [
  {
    name: "Accounting/Finance",
    image: "./assets/img/top-c-1.svg",
    subtitle: "1234 Jobs",
  },
  {
    name: "Automotive Jobs",
    image: "./assets/img/top-c-2.svg",
    subtitle: "1234 Jobs",
  },
  {
    name: "Bank/Non-Bank Fin.",
    image: "./assets/img/top-c-3.svg",
    subtitle: "1234 Jobs",
  },
  {
    name: "Commercial/Supply",
    image: "./assets/img/top-c-4.svg",
    subtitle: "1234 Jobs",
  },
  {
    name: "Construction/Facilities",
    image: "./assets/img/top-c-5.svg",
    subtitle: "1234 Jobs",
  },
  {
    name: "Design/Creative",
    image: "./assets/img/top-c-6.svg",
    subtitle: "1234 Jobs",
  },
  {
    name: "Education/Training",
    image: "./assets/img/top-c-7.svg",
    subtitle: "1234 Jobs",
  },
  {
    name: "Engineer/Architects",
    image: "./assets/img/top-c-8.svg",
    subtitle: "1234 Jobs",
  },
  {
    name: "Hospitality/Travel",
    image: "./assets/img/top-c-9.svg",
    subtitle: "1234 Jobs",
  },
  {
    name: "Electrical/Repair",
    image: "./assets/img/top-c-10.svg",
    subtitle: "1234 Jobs",
  },
  {
    name: "IT/Telecommunication",
    image: "./assets/img/top-c-11.svg",
    subtitle: "1234 Jobs",
  },
  {
    name: "Marketing/Sales",
    image: "./assets/img/top-c-12.svg",
    subtitle: "1234 Jobs",
  },
];

const PopularCategories = ({ data }: { data: any }) => {
  return (
    <section className="py-16 md:py-20 lg:py-25 !bg-light">
      <div className="grid sm:grid-cols-11 font-roboto mx-auto max-w-7xl px-4">
        {/* <div className="text-center mb-14">
          <p className="text-themePrimary font-bold text-xs leading-none mb-2">
            Popular Categories
          </p>
          <h2 className="text-xl font-bold text-black">
            Browse Top Categories
          </h2>
        </div>
        <div className="grid gap-4 xl:gap-5 xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2">
          {_.map(_.slice(data ? data : categoryList, 0, 12), (item, index) => (
            <CategoryItem key={index} data={item} />
          ))}
        </div>
        <div className="text-center mt-14">
          <Link href="/all-categories">
            <a className="text-white text-xs font-normal transition-all bg-arsenic px-6 py-2.5 rounded-lg hover:bg-themePrimary">
              Browse All Category
            </a>
          </Link>
        </div> */}
        <div className="get-hired col-span-6">
          <h2 className="">Get Hired, Trained and Certified</h2>
          <p className="mt-10 mb-8 sm:w-[85%]">
            Reach out today and have one of our skilled recruiters discuss on
            the job training programs.
          </p>
          <p className="text-themeLight leading-8 !mb-4">
            <img
              draggable="false"
              role="img"
              className="emoji"
              alt="✅"
              src="https://s.w.org/images/core/emoji/14.0.0/svg/2705.svg"
            />
             Field Engineers
          </p>
          <p className="text-themeLight leading-8 !mb-4">
            <img
              draggable="false"
              role="img"
              className="emoji"
              alt="✅"
              src="https://s.w.org/images/core/emoji/14.0.0/svg/2705.svg"
            />
             Hardware Technicians
          </p>
          <p className="text-themeLight leading-8 !mb-16">
            <img
              draggable="false"
              role="img"
              className="emoji"
              alt="✅"
              src="https://s.w.org/images/core/emoji/14.0.0/svg/2705.svg"
            />
             HVAC Technicians
          </p>
          <Link href="/contact-us">
            <a className="btn-custom">Contact Us</a>
            </Link>
        </div>
        <div className="col-span-5 min-h-[400px]">
          <img
            src="/assets/img/clipart-1.svg"
            alt="clipart-1"
            className="max-h-[500px] max-w-[500px] h-full w-full"
          />
        </div>
      </div>
    </section>
  );
};

export default PopularCategories;
