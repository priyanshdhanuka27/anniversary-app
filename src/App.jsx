import { useState } from "react";
import Landing from "./components/Landing";
import MainContent from "./components/MainContent";

export default function App() {
  const [opened, setOpened] = useState(false);
  return (
    <>
      {!opened && <Landing onOpen={() => setOpened(true)} />}
      <MainContent visible={opened} />
    </>
  );
}
