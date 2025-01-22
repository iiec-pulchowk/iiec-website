"use client";
import React, { useEffect, useState } from "react";
import FetchNoticeLineData from "@/Helper/FetchNoticeLineData";
import Marquee from "react-fast-marquee";

export default function NoticeLine() {
  const [NoticeLineData, setNoticeLineData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await FetchNoticeLineData();
      if (res.success) {
        setNoticeLineData(res.data);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="w-full p-1 h-6 shadow shadow-gray-600 drop-shadow-3xl  md:relative md:-top-0 md:bg-white backdrop-blur-2xl bg-opacity-50">
      {NoticeLineData && (
        <div className="w-full -mt-1">
          <Marquee
            behavior="scroll"
            direction="left"
            speed={50}
            gradient={false}
            className="flex items-center justify-center"
            pauseOnHover
          >
            {NoticeLineData.map((notice, index) => (
              <a
                key={index}
                href={notice.Link ?? "#"}
                className="whitespace-nowrap font-bold font-serif text-gray-800 hover:text-gray-900 focus:text-gray-900 no-underline px-4 -py-2"
              >
                {notice.Title} |
              </a>
            ))}
          </Marquee>
          {/* {notices.map((notice, index) => (
                        <a key={index + notices.length} href={notice.link} className={styles.noticeLink}>
                        {notice.text}
                        </a>
                    ))} */}
        </div>
      )}
    </div>
  );
}
