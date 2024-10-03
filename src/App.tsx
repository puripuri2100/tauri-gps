import { useState } from "react";
import {
  checkPermissions,
  requestPermissions,
  getCurrentPosition,
  Position
} from '@tauri-apps/plugin-geolocation'
import "./App.css";

function App() {

  const [phonePos, setPhonePos] = useState<Position | null>(null);

  async function getPos() {
    let permissions = await checkPermissions()
    if (
      permissions.location === 'prompt' ||
      permissions.location === 'prompt-with-rationale'
    ) {
      permissions = await requestPermissions(['location'])
    }
    
    if (permissions.location === 'granted') {
      const pos = await getCurrentPosition()
      setPhonePos(pos);
    }
  }

  return (
    <div className="container">

      <button onClick={getPos}>位置情報を取得</button>
      <p>{phonePos ? <>({Math.round(phonePos.coords.latitude)}, {Math.round(phonePos.coords.longitude)})</>: null}</p>

    </div>
  );
}

export default App;
