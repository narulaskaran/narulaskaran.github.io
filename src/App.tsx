import React from "react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const App: React.FC = () => {
  const profileData = {
    firstName: "Karan",
    lastName: "Narula",
    title: "Software Engineer · Based in New York",
    email: "ksnarula@cs.washington.edu",
    githubUsername: "narulaskaran",
    linkedInUsername: "narulaskaran",
    profilePhotoUrl: "assets/profile.jpg",
  };

  const projects = [
    {
      name: "Twitter News Digest",
      description: "Description of Project 3",
      url: "https://github.com/narulaskaran/news-digest",
      imageUrl: "assets/project-img/twitter-outline.png",
    },
    {
      name: "Seam Carving",
      description: "Description of Project 1",
      url: "https://github.com/narulaskaran/seam-carving",
      imageUrl: "assets/project-img/wall.gif",
    },
    {
      name: "AQI Monitor",
      description: "Description of Project 2",
      url: "https://github.com/narulaskaran/aqi-monitor",
      imageUrl: "assets/project-img/aqi.png",
    },
    {
      name: "Secyoure",
      description: "Description of Project 3",
      url: "https://github.com/smox98/secyoure",
      imageUrl: "assets/project-img/lock.png",
    },
    {
      name: "Podcast Recommendations",
      description: "Description of Project 3",
      url: "https://github.com/narulaskaran/podcast-recommendations",
      imageUrl: "assets/project-img/podcast.jpg",
    },
    {
      name: "Politrack",
      description: "Description of Project 3",
      url: "https://github.com/narulaskaran/politrack",
      imageUrl: "assets/project-img/white-house.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <header className="text-center mb-12">
          <Avatar className="w-32 h-32 mx-auto rounded-lg transition-all duration-400 transform hover:-translate-y-1 hover:rounded-3xl">
            <AvatarImage
              src={profileData.profilePhotoUrl}
              alt={`${profileData.firstName} ${profileData.lastName}`}
            />
            <AvatarFallback>{profileData.firstName[0]}</AvatarFallback>
          </Avatar>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {profileData.firstName}{" "}
            <span className="text-[rgba(128,0,0,0.9)]">
              {profileData.lastName}
            </span>
          </h1>
          <p className="text-lg text-gray-600 mb-4">{profileData.title}</p>
          <div className="flex justify-center space-x-6">
            <a
              href="https://www.linkedin.com/in/narulaskaran/"
              className="text-black hover:text-[rgba(128,0,0,0.9)] transition-colors duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                className="w-8 h-8 fill-current"
              >
                <path d="M100.3 480H7.4V180.9h92.9V480zM53.8 140.1C24.1 140.1 0 115.5 0 85.8 0 56.1 24.1 32 53.8 32c29.7 0 53.8 24.1 53.8 53.8 0 29.7-24.1 54.3-53.8 54.3zM448 480h-92.7V334.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V480h-92.8V180.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V480z" />
              </svg>
            </a>
            <a
              href="https://github.com/narulaskaran/"
              className="text-black hover:text-[rgba(128,0,0,0.9)] transition-colors duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 496 512"
                className="w-8 h-8 fill-current"
              >
                <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
              </svg>
            </a>
          </div>
        </header>

        <section>
          <div className="grid gap-4 grid-cols-3 duration-500 md:grid-cols-4 lg:grid-cols-5 ">
            {projects.map((project, index) => (
              <Card
                key={index}
                className="overflow-hidden cursor-pointer opacity-85 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-[rgba(128,0,0,0.1)] hover:-translate-y-1 hover:rounded-3xl"
                onClick={() => window.open(project.url, "_blank")}
              >
                <div className="relative aspect-square">
                  <img
                    src={project.imageUrl}
                    alt={project.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-white opacity-0 hover:opacity-75 transition-opacity duration-300 flex flex-col justify-center items-center text-[rgba(128,0,0)] p-4">
                    <h3 className="text-lg font-semibold mb-2 text-center">
                      {project.name}
                    </h3>
                    {/* <p className="text-xs text-center">{project.description}</p> */}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default App;
