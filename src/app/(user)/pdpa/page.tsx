import React from 'react';

const Page = async () => {
  return (
    <div className="min-h-screen pb-10 flex justify-center">
      <iframe
        src="https://drive.google.com/file/d/1FwO68ke7lxAAiKZwrBlhdmcdXsHiRLO5/preview"
        className="max-w-5xl mx-auto w-full h-full absolute"
        allow="autoplay"
      ></iframe>
    </div>
  );
};

export default Page;
