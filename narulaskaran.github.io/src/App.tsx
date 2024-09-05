import { H1, Muted } from "@/components/typography/typography";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function App() {
  return (
    <>
      <div className="container">
        <div className="flex flex-col">
          <div className="container">
            <Avatar>
              <AvatarImage
                src="narulaskaran.github.io/src/assets/profile-full.jpg"
                alt="karan narula"
              />
              <AvatarFallback>KN</AvatarFallback>
            </Avatar>
          </div>
          <div className="container flex flex-col">
            <H1 children={"Karan Narula"}></H1>
            <Muted children="Based in New York · Email for inquiries"></Muted>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
