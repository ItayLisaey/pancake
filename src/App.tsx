import { BaseButton, IconButton, Surface, TextButton } from '../lib';
import { Heli } from './Heli';

function App() {
  return (
    <div className="aa">
      <BaseButton style={{ color: 'white' }}>BUTTON</BaseButton>
      <TextButton style={{ color: 'white' }}>BUTTON</TextButton>
      <TextButton preText={<Heli />} style={{ color: 'white' }}>BUTTON</TextButton>
      <TextButton style={{ color: 'white' }} postText={<Heli />}>BUTTON</TextButton>
      <TextButton preText={<Heli />} style={{ color: 'white' }} postText={<Heli />}>BUTTON</TextButton>
      <TextButton preText={<Heli />} style={{ color: 'white', fontSize: '30px' }} postText={<Heli />}>BUTTON</TextButton>
      <IconButton style={{ color: 'white' }}><Heli /></IconButton>
      <Surface component='div' style={{ width: 200, height: 200 }}>
        bbb
        <Heli />
      </Surface>
    </div>
  );
}

export default App;
